import { Container, Rectangle, Sprite, Texture, Text } from "pixi.js";
import { IScene } from "../utils/IScene";
import { Manager } from "../utils/Manager";
import { SongButton } from "../UI/SongButton";
import { SongGame_LevelSelector } from "./SongGame_LevelSelector";
import { sound } from "@pixi/sound";
import { levels } from "./levels";
import { SongGame_Quiz } from "./SongGame_Quiz";

export class SongGame_Puzzle extends Container implements IScene {

    private isImageComplete: boolean;
    private isAnimating: boolean = false
    private specialPieceIndex: number;
    private imgSong: Sprite[];
    button1: SongButton;

    constructor(img: string, difficulty: number) {
        super();

        // background + text
        const background = Sprite.from("BlackWall");
        this.addChild(background);
        this.button1 = new SongButton("Volver al selector", 500);
        this.addChild(this.button1);
        this.button1.position.set(Manager.width / 2, 130)
        this.button1.on("pointerup", () => {
            sound.stopAll();
            Manager.changeScene(new SongGame_LevelSelector)
        });
        const texty = new Text("ESCUCHÁ Y RECORDÁ\nEL NOMBRE DEL INTÉRPRETE", {
            fontFamily: "Montserrat ExtraBold",
            fill: 0xFFFFFF,
            align: "center",
            fontSize: 20,
            lineHeight: 40,
            letterSpacing: 7
        });
        texty.anchor.set(0.5);
        texty.position.set(Manager.width / 2, 290)
        this.addChild(texty);









        // Dividir la imagen en piezas
        const texture = Texture.from(img);
        const numPiecesX = difficulty; // Número de piezas en el eje X
        const numPiecesY = difficulty; // Número de piezas en el eje Y
        const pieceWidth = texture.width / numPiecesX; // Ancho de cada pieza
        const pieceHeight = texture.height / numPiecesY; // Alto de cada pieza
        const pieces: Texture[] = [];

        for (let y = 0; y < numPiecesY; y++) {
            for (let x = 0; x < numPiecesX; x++) {
                const pieceTexture = new Texture(
                    texture.baseTexture,
                    new Rectangle(
                        x * pieceWidth,
                        y * pieceHeight,
                        pieceWidth,
                        pieceHeight));
                pieces.push(pieceTexture);
            }
        }




        this.imgSong = pieces.map((pieceTexture, index) => {
            const sprite = new Sprite(pieceTexture);
            sprite.anchor.set(0.5);

            // Calcular las posiciones X e Y para centrar las piezas
            const offsetX = (Manager.width - pieceWidth * numPiecesX) / 2;
            const offsetY = (Manager.height - pieceHeight * numPiecesY) / 2 + 20;

            sprite.position.set(
                offsetX + (index % numPiecesX) * pieceWidth + pieceWidth / 2,
                offsetY + Math.floor(index / numPiecesX) * pieceHeight + pieceHeight / 2
            );

            sprite.eventMode = "static";
            sprite.cursor = 'pointer';

            const randomRotation = Math.floor(Math.random() * 4) * 90;
            sprite.angle = randomRotation;


            // función al clickear una pieza del puzzle
            sprite.on("pointerdown", () => {
                sound.play("Pip");

                if (this.isAnimating) {
                    return; // previene activación del botón durante animación
                }
                this.isAnimating = true; // Marcar que se está realizando una animación

                // activa animación de rotación
                const targetRotation = sprite.angle + 90;
                const duration = 0.1; // Duración de la animación en segundos
                const frames = 60; // Número de fotogramas para la animación
                const increment = (targetRotation - sprite.angle) / frames;                
                if (index === this.specialPieceIndex) {
                    const linkedPiece = this.getLinkedPiece(sprite);
                    this.animateRotation(sprite, targetRotation, duration, frames, increment);
                    this.animateRotation(linkedPiece, targetRotation, duration, frames, increment);
                } else {
                    this.animateRotation(sprite, targetRotation, duration, frames, increment);
                }
            });

            sprite.on("mouseover", () => { sprite.tint = 0xffdfc2 })
                .on("mouseout", () => { sprite.tint = 0xFFFFFF })

            return sprite;
        });
        // END this.imgSong = pieces.map((pieceTexture, index)

        this.addChild(...this.imgSong);
        this.isImageComplete = false;
        this.specialPieceIndex = Math.floor(Math.random() * this.imgSong.length);
    }











    update(_deltaTime: number, _deltaFrame: number): void {
        // update
    }












    private checkComplete(): void {
        const tolerance = 5; // Rango de tolerancia en grados
        const isComplete = this.imgSong.every(sprite => Math.abs(sprite.angle % 360) <= tolerance);
        this.isImageComplete = isComplete;

        if (this.isImageComplete) {
            this.puzzleCompleted();
        }
    }

    private puzzleCompleted(): void {
        sound.play("Correct");
        this.disableButtons();
        const texty: Text = new Text(
            levels[Manager.currentLevel].song.band,
            {
                fontFamily: "Montserrat ExtraBold",
                fill: 0xFFFFFF,
                align: "center",
                fontSize: 40,
                lineHeight: 39
            });
        texty.anchor.set(0.5);
        texty.position.set(Manager.width / 2, 1005)
        this.addChild(texty);

        // Crea botón que lleva al siguiente nivel y actualiza variable currentLevel
        const button1 = new SongButton("Siguiente nivel", 500);
        button1.position.set(Manager.width / 2, 1170)
        button1.on("pointerup", () => {
            if (levels[Manager.currentLevel + 1].isPuzzle) {
                sound.stopAll();
                Manager.changeScene(new SongGame_Puzzle(levels[Manager.currentLevel + 1].song.img, levels[Manager.currentLevel + 1].difficulty));
                sound.play(levels[Manager.currentLevel + 1].song.audio);
                Manager.currentLevel += 1;
            } else {
                sound.stopAll();
                Manager.changeScene(new SongGame_Quiz(levels[Manager.currentLevel + 1].options, levels[Manager.currentLevel + 1].difficulty));
                Manager.currentLevel += 1;
            }
        })
        this.addChild(button1);
    }

    private disableButtons(): void {
        this.imgSong.forEach(sprite => {
            sprite.tint = 0xFFFFFF;
            sprite.eventMode = "none";
        });
    }


    private getLinkedPiece(piece: Sprite): Sprite {
        const index = this.imgSong.indexOf(piece);
        const linkedIndex = (index + 1) % this.imgSong.length; // Calcula el índice de la pieza vinculada
        return this.imgSong[linkedIndex];
    }

    private animateRotation(sprite: Sprite, targetRotation: number, duration: number, frames: number, increment: number): void {
        let currentFrame = 0;
        const animation = setInterval(() => {
            sprite.angle += increment;
            currentFrame++;

            if (currentFrame >= frames) {
                clearInterval(animation);
                this.isAnimating = false; // Marcar que la animación ha finalizado
                this.checkComplete();
            } else if (sprite.angle === targetRotation) {
                clearInterval(animation);
                this.isAnimating = false; // Marcar que la animación ha finalizado
                this.checkComplete();
            }
        }, duration * 1000 / frames);
    }

}