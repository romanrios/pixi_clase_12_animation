import { Container, Assets, TextStyle, Text } from "pixi.js";
import { SongButton } from "../UI/SongButton";
import { app } from "..";
import { Tarea_1_2 } from "./Tarea_1_2";
import { Tarea_3_4 } from "./Tarea_3_4";
import { SongGame } from "./SongGame";
import { sound } from "@pixi/sound";

export class MainScene extends Container {

    constructor() {
        super();

        const styly: TextStyle = new TextStyle({
            fontFamily: "Montserrat ExtraBold",
            fill: 0xFFFFFF,
            align: "center",
            fontSize: 50,
        });
        const texty: Text = new Text("Curso PixiJS 2023\nRomán Ríos", styly);
        texty.anchor.set(0.5);
        texty.position.set(app.screen.width/2,150);
        this.addChild(texty);

        const changeScene = (scene: typeof MainScene, bundle: string) => {
            this.removeChildren();
            Assets.loadBundle(bundle).then(() => {
                const myScene = new scene();
                this.addChild(myScene);
                myScene.addChild(button0);
            });
        };

        const button0 = new SongButton("Regresar al inicio");
        button0.position.set(app.screen.width / 2, 130)
        
        button0.onpointerup = () => {
            sound.stopAll();
            this.removeChildren();
            Assets.loadBundle("mainScene").then(() => {
                const myScene = new MainScene();
                this.addChild(myScene);
            });

        };

        const button1 = new SongButton("Clases 1 y 2");
        button1.position.set(app.screen.width / 2, 350)
        button1.onpointerup = () => {
            changeScene(Tarea_1_2, "tarea_1_2")
        };
        this.addChild(button1);

        const button2: SongButton = new SongButton("Clases 3 y 4");
        button2.position.set(app.screen.width / 2, button1.y + 150)
        button2.onpointerup = () => {
            changeScene(Tarea_3_4, "tarea_3_4")
        };
        this.addChild(button2);

        const button3: SongButton = new SongButton("Proyecto Song Quiz");
        button3.position.set(app.screen.width / 2, button2.y + 150)
        button3.onpointerup = () => {
            changeScene(SongGame, "songGame")
        };
        this.addChild(button3);

        const button4: SongButton = new SongButton("Clase 5");
        button4.position.set(app.screen.width / 2, button3.y + 150)
        button4.alpha=0.3
        this.addChild(button4);

    }



};