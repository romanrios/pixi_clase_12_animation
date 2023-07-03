import { TextStyle, Text, Container } from "pixi.js";
import { SongButton } from "../UI/SongButton";
import { sound } from "@pixi/sound";
import { Clase_5_TickerScene } from "./Clase_5_TickerScene";
import { Manager } from "../utils/Manager";
import { Clases_1_2 } from "./Clases_1_2";
import { Clases_3_4 } from "./Clases_3_4";
import { SongGame } from "./SongGame";
import { IScene } from "../utils/IScene";
import { Clase_6 } from "./Clase_6";

export class GameScene extends Container implements IScene{

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
        texty.position.set(Manager.width/2,150);
        this.addChild(texty);

        const button0 = new SongButton("Regresar al inicio");
        button0.position.set(Manager.width / 2, 130)        
        button0.onpointerup = () => {
            sound.stopAll();
            Manager.changeScene(new GameScene());
        };

        const button1 = new SongButton("Clases 1 y 2");
        button1.position.set(Manager.width / 2, 350)
        button1.onpointerup = () => {
            const newScene = new Clases_1_2()
            Manager.changeScene(newScene);
            newScene.addChild(button0)
        };
        this.addChild(button1);

        const button2: SongButton = new SongButton("Clases 3 y 4");
        button2.position.set(Manager.width / 2, button1.y + 150)
        button2.onpointerup = () => {
            const newScene = new Clases_3_4()
            Manager.changeScene(newScene);
            newScene.addChild(button0)
        };
        this.addChild(button2);

        const button3: SongButton = new SongButton("Proyecto Song Quiz");
        button3.position.set(Manager.width / 2, button2.y + 150)
        button3.onpointerup = () => {
            const newScene = new SongGame()
            Manager.changeScene(newScene);
            newScene.addChild(button0)
        };
        this.addChild(button3);

        const button4: SongButton = new SongButton("Clase 5");
        button4.position.set(Manager.width / 2, button3.y + 150)
        button4.onpointerup = () => {
            const newScene = new Clase_5_TickerScene()
            Manager.changeScene(newScene);
            newScene.addChild(button0)
        };
        this.addChild(button4);

        const button5: SongButton = new SongButton("Clase 6");
        button5.position.set(Manager.width / 2, button4.y + 150)
        button5.onpointerup = () => {
            const newScene = new Clase_6()
            Manager.changeScene(newScene);
            newScene.addChild(button0)
        };
        this.addChild(button5);



    }
    update(_framesPassed: number): void {
        //throw new Error("Method not implemented.");
    }

}



