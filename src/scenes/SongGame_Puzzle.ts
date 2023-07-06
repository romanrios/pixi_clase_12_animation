import { Container, Rectangle, Sprite, Texture, TextureSource } from "pixi.js";
import { IScene } from "../utils/IScene";
import { Manager } from "../utils/Manager";
import { SongButton } from "../UI/SongButton";
import { SongGame_LevelSelector } from "./SongGame_LevelSelector";

export class SongGame_Puzzle extends Container implements IScene {

    private imgSong: Sprite[];
    private isImageComplete: boolean;
    button1: SongButton;


    constructor(img: TextureSource, difficulty: number) {
        super();

        const background = Sprite.from("BlackWallFrame");
        this.addChild(background);

        const texture = Texture.from(img);

        const numPiecesX = difficulty; // Número de piezas en el eje X
        const numPiecesY = difficulty; // Número de piezas en el eje Y
        const pieceWidth = texture.width / numPiecesX; // Ancho de cada pieza
        const pieceHeight = texture.height / numPiecesY; // Alto de cada pieza
        const pieces: Texture[] = [];

        // Dividir la imagen en piezas
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
            const offsetY = (Manager.height - pieceHeight * numPiecesY) / 2;

            sprite.position.set(
                offsetX + (index % numPiecesX) * pieceWidth + pieceWidth / 2,
                offsetY + Math.floor(index / numPiecesX) * pieceHeight + pieceHeight / 2
            );

            sprite.eventMode = "static";
            sprite.cursor = 'pointer';

            const randomRotation = Math.floor(Math.random() * 4) * 90;
            sprite.angle = randomRotation;

            sprite.on("pointerdown", () => {
                sprite.angle += 90;
                this.checkComplete();
            });

            sprite.on("pointerover", () => {
                sprite.scale.set(1.1)
            });

            sprite.on("pointerout", () => {
                sprite.scale.set(1)
            });

            sprite.on("pointerupoutside", () => {
                this.scale.set(1);
            });

            return sprite;
        });

        this.addChild(...this.imgSong);

        this.isImageComplete = false;

        this.button1 = new SongButton("Volver al selector", 500);
        this.addChild(this.button1);
        this.button1.position.set(Manager.width / 2, 130)
        this.button1.on("pointertap", () =>
            Manager.changeScene(new SongGame_LevelSelector)
        );

    }


    update(_deltaTime: number, _deltaFrame: number): void {
        // update
    }

    private checkComplete(): void {
        const rotations = this.imgSong.map(sprite => sprite.angle);
        const isComplete = rotations.every(rotation => rotation % 360 === 0);
        this.isImageComplete = isComplete;

        if (this.isImageComplete) {
            this.puzzleCompleted();
        }
    }

    private puzzleCompleted(): void {
        this.disableButtons();
        const button1 = new SongButton("¡Completado!", 500);
        button1.position.set(Manager.width / 2, 970)
        this.addChild(button1);
    }

    private disableButtons(): void {
        this.imgSong.forEach(sprite => {
            sprite.scale.set(1);
            sprite.eventMode = "none";
        });
    }
}
