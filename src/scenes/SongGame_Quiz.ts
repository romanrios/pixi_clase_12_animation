import { Assets, Container, Sprite } from "pixi.js";
import { IScene } from "../utils/IScene";
import { Manager } from "../utils/Manager";
import { SongButton } from "../UI/SongButton";
import { songs } from "./songs";
import { sound } from '@pixi/sound';
import '@pixi/gif';

export class SongGame_Quiz extends Container implements IScene{
    private quizBackground: Sprite;

    constructor() {
        super();

        this.quizBackground = Sprite.from("QuizBackground");
        this.quizBackground.anchor.set(0.5),
        this.quizBackground.position.set(Manager.width/2,Manager.height/2)
        this.addChild(this.quizBackground);


        const NUMERO_OPCIONES = 4; // Número total de opciones por pregunta

        const generarPregunta = (): void => {
            const opciones = [];
            const opcionesIndices = [];

            // Obtiene una canción aleatoria como la opción correcta
            const indiceCorrecto = getRandomInteger(0, songs.length - 1);
            const cancionCorrecta = songs[indiceCorrecto];
            opciones.push(cancionCorrecta);
            opcionesIndices.push(indiceCorrecto);

            // Genera opciones incorrectas hasta alcanzar el número total de opciones
            while (opciones.length < NUMERO_OPCIONES) {
                const indiceIncorrecto = getRandomInteger(0, songs.length - 1);
                // Verifica que el índice no esté repetido y no sea el índice de la opción correcta
                if (!opcionesIndices.includes(indiceIncorrecto) && indiceIncorrecto !== indiceCorrecto) {
                    opciones.push(songs[indiceIncorrecto]);
                    opcionesIndices.push(indiceIncorrecto);
                }
            }
            
            const soundWave = Assets.get('SoundWave');
            sound.play(cancionCorrecta.audio);
            soundWave.alpha = 0.5;
            soundWave.height = 500;
            soundWave.anchor.set(0.5);
            soundWave.position.set(Manager.width / 2, 350)
            soundWave.eventMode = 'static';
            soundWave.cursor = 'pointer';
            let isPlaying = true;
            soundWave.onpointerup = () => {
                if (isPlaying) {
                    soundWave.height = 100
                    sound.stopAll();
                    isPlaying = false;
                } else {
                    soundWave.height = 500
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
                const button: SongButton = new SongButton(opcion.band,500);
                button.position.set(Manager.width / 2, buttonPositions[i]);

                button.onpointerup = () => {
                    if (opcion === cancionCorrecta) {
                        console.log("CORRECTO!")
                        button.setButtonColor(0x00C18C);
                        sound.play("Correct");
                    } else {
                        console.log("Incorrecto!")
                        button.setButtonColor(0xF33302);
                        sound.play("Wrong");
                    }
                    setTimeout(() => {
                        this.removeChild(buttonsContainer);
                        sound.stopAll();
                        generarPregunta();
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

        const scaleMin = 1; // Escala mínima del objeto
        const scaleMax = 1.04; // Escala máxima del objeto
        const beatDuration = 1400; // Duración de un latido en milisegundos

        this.currentTime += deltaTime;

        const t = (this.currentTime % beatDuration) / beatDuration;
        const scale = scaleMin + Math.abs(Math.sin(t * Math.PI)) * (scaleMax - scaleMin);

        this.quizBackground.scale.set(scale);
    }

}