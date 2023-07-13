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

        this.quizBackground = Sprite.from("QuizBackground");
        this.quizBackground.anchor.set(0.5),
            this.quizBackground.position.set(Manager.width / 2, Manager.height / 2)
        this.addChild(this.quizBackground);

        this.button1 = new SongButton("Volver al selector", 500);
        this.addChild(this.button1);
        this.button1.position.set(Manager.width / 2, 130)
        this.button1.on("pointerup", () => {
            sound.stopAll();
            Manager.changeScene(new SongGame_LevelSelector)
        });


        // FUNCION GENERAR PREGUNTA
        const NUMERO_OPCIONES = options; // Número total de opciones por pregunta
        this.counter = 4 -1 // CANTIDAD DE PREGUNTAS !!
        this.counterCorrect = 0
        this.counterWrong = 0
        const opcionesCorrectasYaElegidas: number[] = []

        const generarPregunta = () => {
            const opciones = [];
            const opcionesIndices = [];

            // Obtiene una canción aleatoria como la opción correcta
            let indiceCorrecto = getRandomInteger(0, /*songs.length*/ level - 1);

            // Verifica que no se repita y actualiza los arreglos
            while(opcionesCorrectasYaElegidas.includes(indiceCorrecto)){
                indiceCorrecto = getRandomInteger(0, /*songs.length*/ level - 1);
            }
            opcionesCorrectasYaElegidas.push(indiceCorrecto)
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

            // GIF DE ONDAS
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


            const answerPositions = [650, 800, 950, 1100]; // Posiciones verticales de los botones

            opciones.sort(() => Math.random() - 0.5); // Reordena aleatoriamente las opciones

            const buttonsContainer = new Container();
            this.addChild(buttonsContainer);

            opciones.forEach((opcion, i) => {
                const button: SongButton = new SongButton(opcion.band, 500);
                button.position.set(Manager.width / 2, answerPositions[i]);

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

                    // función con retardo de 1 segundo
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

                            // define cual es el puzzle del nivel siguiente
                            button1.on("pointerup", () => {
                                if (levels[Manager.currentLevel + 1].isPuzzle) {
                                        sound.stopAll();
                                        Manager.changeScene(
                                            new SongGame_Puzzle(
                                                levels[Manager.currentLevel + 1].song.img,
                                                levels[Manager.currentLevel + 1].difficulty));
                                        sound.play(
                                            levels[Manager.currentLevel + 1].song.audio);
                                        Manager.currentLevel += 1;
                                }
                                if (!levels[Manager.currentLevel + 1].isPuzzle) {
                                        sound.stopAll();
                                        Manager.changeScene(
                                            new SongGame_Quiz(
                                                levels[Manager.currentLevel + 1].options,
                                                levels[Manager.currentLevel + 1].difficulty));
                                        Manager.currentLevel += 1;
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
                            this.texty.position.set(Manager.width / 2, 700)
                            this.addChild(this.texty);
                            sound.play("Cheer");

                        }

                    }, 1000);

                }
                buttonsContainer.addChild(button);
                button.name = `button${i}`;
            });
            //END opciones.forEach
        }
        // END funcion generarPregunta

        function getRandomInteger(min: number, max: number): number {
            return Math.round(Math.random() * (max - min) + min);
        }

        generarPregunta();
    }


    // UPDATE ANIMACION NIVEL COMPLEADO
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