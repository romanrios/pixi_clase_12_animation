import { TextStyle, Text, Container, Graphics } from "pixi.js";
import { SongButton } from "../UI/SongButton";
import { sound } from "@pixi/sound";
import { Clase_5_TickerScene } from "./Clase_5_TickerScene";
import { Manager } from "../utils/Manager";
import { Clases_1_2 } from "./Clases_1_2";
import { Clases_3_4 } from "./Clases_3_4";
import { IScene } from "../utils/IScene";
import { Clase_6 } from "./Clase_6";
import { SongGame_Quiz } from "./SongGame_Quiz";
import { SongGame_LevelSelector } from "./SongGame_LevelSelector";

export class GameScene extends Container implements IScene {
    private button0: SongButton;
    private dragData: any | null;
    private dragStartY: number;
    private isDragging: boolean = false;

    constructor() {
        super();

        const alphaRect = new Graphics();
        alphaRect.beginFill(0x000000, 0.00000000001)
        alphaRect.drawRect(0, 0, 720, 2000)
        this.addChild(alphaRect)

        const styly = new TextStyle({
            fontFamily: "Montserrat ExtraBold",
            fill: 0xFFFFFF,
            align: "center",
            fontSize: 50,
        });
        const texty = new Text("Curso PixiJS 2023\nRomán Ríos", styly);
        texty.anchor.set(0.5);
        texty.position.set(Manager.width / 2, 150);
        this.addChild(texty);

        this.button0 = new SongButton("Regresar al inicio", 500);
        this.button0.position.set(Manager.width / 2, 130);
        this.button0.onpointerup = () => {
            sound.stopAll();
            Manager.changeScene(new GameScene());
        };

        const createButton = (text: string, y: number, scene: any) => {
            const button = new SongButton(text, 500);
            button.position.set(Manager.width / 2, y);
            button.onpointertap = () => {
                if (this.isDragging) {
                    const newScene = new scene();
                    Manager.changeScene(newScene);
                    newScene.addChild(this.button0);
                }
            };
            return button;
        };

        const button1 = createButton("Clases 1 y 2", 350, Clases_1_2);
        this.addChild(button1);

        const button2 = createButton("Clases 3 y 4", button1.y + 150, Clases_3_4);
        this.addChild(button2);

        const button3 = createButton("Song Game Quiz", button2.y + 150, SongGame_Quiz);
        this.addChild(button3);

        const button4 = createButton("Clase 5", button3.y + 150, Clase_5_TickerScene);
        this.addChild(button4);

        const button5 = createButton("Clase 6", button4.y + 150, Clase_6);
        this.addChild(button5);


        const button6 = new SongButton("Song Game Puzzle", 500);
        button6.position.set(Manager.width / 2, button5.y + 150);
        button6.onpointertap = () => {
            if (this.isDragging) {
                const newScene = new SongGame_LevelSelector();
                Manager.changeScene(newScene);
            }
        };
        this.addChild(button6);


        const button7 = createButton("Clase 7", button6.y + 150, "");
        button7.eventMode = "none";
        button7.alpha = 0.4;
        this.addChild(button7);

        const button8 = createButton("Clase 8", button7.y + 150, "");
        button8.eventMode = "none";
        button8.alpha = 0.4;
        this.addChild(button8);

        this.eventMode = "static";
        this.dragData = null;
        this.dragStartY = 0;

        this.on("pointerdown", this.onDragStart)
            .on("pointerup", this.onDragEnd)
            .on("pointerupoutside", this.onDragEnd)
            .on("pointermove", this.onDragMove)
            .on("wheel", this.onMouseWheel);
    }

    update(_framesPassed: number): void {
        // update
    }

    private onDragStart(event: any): void {
        this.dragData = event.data;
        this.dragStartY = this.dragData.global.y;
        this.isDragging = true;
    }

    private onDragMove(): void {
        if (this.dragData) {
            const newY = this.dragData.global.y;
            const deltaY = newY - this.dragStartY;

            this.y += deltaY;
            this.dragStartY = newY;
        }

        if (this.y > 0) {
            this.y = 0;
        }

        if (this.y < -330) {
            this.y = -330;
        }

        this.isDragging = false;
    }


    private onDragEnd(): void {
        this.dragData = null;
        if (this.y > 0) {
            this.y = 0;
        }
        setTimeout(() => {
            this.isDragging = false;;
        }, 10);

    }


    private onMouseWheel(event: WheelEvent): void {
        const deltaY = event.deltaY;
        this.y -= deltaY;
        if (this.y > 0) {
            this.y = 0;
        }

        if (this.y < -330) {
            this.y = -330;
        }
    }

}


