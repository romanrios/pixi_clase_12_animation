import { Container, Sprite } from "pixi.js";
import { IScene } from "../utils/IScene";
import { Manager } from "../utils/Manager";
import { Player } from "./Player";
import { Platform } from "./Platform";

export class Clase_7 extends Container implements IScene {

    private playerRobot: Player;
    private platform1: Platform;
    private platform2: Platform;

    constructor() {
        super();

        const sciFiBackground = Sprite.from("SciFiBackground");
        this.addChild(sciFiBackground);

        this.platform1 = new Platform()
        this.platform1.position.set(0,660);
        this.addChild(this.platform1);

        this.platform2 = new Platform()
        this.platform2.position.set(420,860);
        this.addChild(this.platform2);

        this.playerRobot = new Player();
        this.addChild(this.playerRobot);

    }


    public update(deltaTime: number, _deltaFrame: number) {

        this.playerRobot.update(deltaTime); // update animation


        // limit horizontal
        if (this.playerRobot.x > Manager.width) {
            //limit right
            this.playerRobot.x = Manager.width;
        } else if (this.playerRobot.x < 0) {
            // limit left
            this.playerRobot.x = 0;
        }

        // limit vertical
        if (this.playerRobot.y > Manager.height - 180) {
            this.playerRobot.y = Manager.height - 180;
            this.playerRobot.canJump = true;
        }




    }

}
