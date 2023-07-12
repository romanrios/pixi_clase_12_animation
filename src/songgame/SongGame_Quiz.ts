import { Assets, Container, Sprite, Text } from "pixi.js";
import { IScene } from "../utils/IScene";
import { Manager } from "../utils/Manager";
import { SongButton } from "../UI/SongButton";
import { sound } from '@pixi/sound';
import '@pixi/gif';
import { songs } from "./songs";
import { SongGame_LevelSelector } from "./SongGame_LevelSelector";
import { levels } from "./levels";
import { SongGame_Puzzle } from "./SongGame_Puzzle";

export class SongGame_Quiz extends Container implements IScene {
    private quizBackground: Sprite;
    private button1: SongButton;
    private counter: number;
    private counterCorrect: number;
    private counterWrong: number;
    private texty: Text = new Text;

    constructor(options: any, level: number) {
        super();

        this.counter = 5
        this.counterCorrect = 0
        this.counterWrong = 0

        this.quizBackground = Sprite.from("QuizBackground");
        this.quizBackground.anchor.set(0.5),
            this.quizBackground.position.set(Manager.width / 2, Manager.height / 2)
        this.addChild(this.quizBackground);

        this.button1 = new SongButton("Volver al selector", 500);
        this.addChild(this.button1);
        this.button1.position.set(Manager.width / 2, 130)
        this.button1.on("pointertap", () => {
            sound.stopAll();
            Manager.changeScene(new SongGame_LevelSelector)
        });

        const NUMERO_OPCIONES = options; // Número total de opciones por pregunta

        const generarPregunta = (): void => {
            const opciones = [];
            const opcionesIndices = [];

            // Obtiene una canción aleatoria como la opción correcta
            const indiceCorrecto = getRandomInteger(0, /*songs.length*/level - 1);
            const cancionCorrecta = songs[indiceCorrecto];
            opciones.push(cancionCorrecta);
            opcionesIndices.push(indiceCorrecto);

            // Genera opciones incorrectas hasta alcanzar el número total de opciones
            while (opciones.length < NUMERO_OPCIONES) {
                const indiceIncorrecto = getRandomInteger(0, /*songs.length*/level - 1);
                // Verifica que el índice no esté repetido y no sea el índice de la opción correcta
                if (!opcionesIndices.includes(indiceIncorrecto) && indiceIncorrecto !== indiceCorrecto) {
                    opciones.push(songs[indiceIncorrecto]);
                    opcionesIndices.push(indiceIncorrecto);
                }
            }

            const soundWave = Assets.get('SoundWave');
            sound.play(cancionCorrecta.audio);
            soundWave.alpha = 0.5;
            soundWave.height = 201;
            soundWave.anchor.set(0.5);
            soundWave.position.set(Manager.width / 2, 350)
            soundWave.eventMode = 'static';
            soundWave.cursor = 'pointer';
            let isPlaying = true;
            soundWave.onpointerup = () => {
                if (isPlaying) {
                    soundWave.height = 20
                    sound.stopAll();
                    isPlaying = false;
                } else {
                    soundWave.height = 201
                    sound.play(cancionCorrecta.audio)
                    isPlaying = true;
                }
            }
            this.addChild(soundWave);

            const buttonPositions = [650, 800, 950, 1100]; // Posiciones verticales de los botones

            opciones.sort(() => Math.random() - 0.5); // Reordena aleatoriamente las opciones

            const buttonsContainer = new Container();
            this.addChild(buttonsContainer);

            opciones.forEach((opcion, i) => {
                const button: SongButton = new SongButton(opcion.band, 500);
                button.position.set(Manager.width / 2, buttonPositions[i]);

                button.onpointerup = () => {



                    if (opcion === cancionCorrecta) {
                        this.counterCorrect += 1;
                        button.setButtonColor(0x00C18C);
                        this.eventMode = "none";
                        sound.play("Correct");
                    }

                    if (opcion !== cancionCorrecta) {
                        this.counterWrong += 1;
                        button.setButtonColor(0xF33302);
                        this.eventMode = "none";
                        sound.play("Wrong");
                    }


                    setTimeout(() => {
                        this.removeChild(buttonsContainer);
                        sound.stopAll();
                        if (this.counter > 0) {
                            generarPregunta();
                        }
                        this.counter -= 1
                        this.eventMode = "static"

                        if (this.counter < 0) {
                            const button1 = new SongButton("Siguiente nivel", 500);
                            button1.position.set(Manager.width / 2, 1005)
                            button1.on("pointerup", () => {
                                if (levels[Manager.currentLevel + 1].isPuzzle) {
                                    button1.on("pointertap", () => {
                                        sound.stopAll();
                                        Manager.changeScene(
                                            new SongGame_Puzzle(
                                                levels[Manager.currentLevel + 1].song.img,
                                                levels[Manager.currentLevel + 1].difficulty));
                                        sound.play(
                                            levels[Manager.currentLevel + 1].song.audio);
                                        Manager.currentLevel += 1;
                                        console.log(Manager.currentLevel);
                                    });
                                }
                                if (!levels[Manager.currentLevel + 1].isPuzzle) {
                                    button1.on("pointertap", () => {
                                        sound.stopAll();
                                        Manager.changeScene(
                                            new SongGame_Quiz(
                                                levels[Manager.currentLevel + 1].options,
                                                levels[Manager.currentLevel + 1].difficulty));
                                        Manager.currentLevel += 1;
                                        console.log(Manager.currentLevel);
                                    });
                                }
                            })
                            this.addChild(button1);
                            this.removeChild(soundWave);

                            this.texty = new Text(
                                `¡NIVEL COMPLETADO!\n\nRespuestas correctas: ${this.counterCorrect}\n\nRespuestas Incorrectas: ${this.counterWrong}`,
                                {
                                fontFamily: "Montserrat ExtraBold",
                                fill: 0xFFFFFF,
                                align: "center",
                                fontSize: 40,
                                lineHeight: 39
                            });
                            this.texty.anchor.set(0.5);
                            this.texty.position.set(Manager.width/2,700)
                            this.addChild(this.texty);
                            sound.play("Cheer");

                        }

                    }, 1000);

                }
                buttonsContainer.addChild(button);
                button.name = `button${i}`;
            });

            console.log(cancionCorrecta);

        }

        // Función para generar números enteros aleatorios
        function getRandomInteger(min: number, max: number): number {
            return Math.round(Math.random() * (max - min) + min);
        }

        // Genera una pregunta
        generarPregunta();


    }




    currentTime = 0; // Tiempo actual para el cálculo de la escala

    update(deltaTime: number, _deltaFrame: number): void {

        const scaleMin = 0.97; // Escala mínima del objeto
        const scaleMax = 1.03; // Escala máxima del objeto
        const beatDuration = 800; // Duración de un latido en milisegundos

        this.currentTime += deltaTime;

        const t = (this.currentTime % beatDuration) / beatDuration;
        const scale = scaleMin + Math.abs(Math.sin(t * Math.PI)) * (scaleMax - scaleMin);

        this.texty.scale.set(scale);
    }

}