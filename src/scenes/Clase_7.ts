import { Container, Sprite } from "pixi.js";
import { IScene } from "../utils/IScene";
import { Manager } from "../utils/Manager";
import { Player } from "../game/Player";
import { Platform } from "../game/Platform";
import { checkCollision } from "../game/IHitbox";
import { Button } from "../UI/Button";

export class Clase_7 extends Container implements IScene {

    private playerRobot: Player;


    private platforms: Platform[];

    constructor() {
        super();

        this.platforms = [];

        const sciFiBackground = Sprite.from("SciFiBackground");
        this.addChild(sciFiBackground);

        const platform1 = new Platform()
        platform1.position.set(0, 660);
        this.addChild(platform1);
        this.platforms.push(platform1);

        const platform2 = new Platform()
        platform2.position.set(420, 860);
        this.addChild(platform2);
        this.platforms.push(platform2);

        this.playerRobot = new Player();
        this.addChild(this.playerRobot);



        // movement buttons
        const buttonLeft: Button = new Button(0xf52222, "Next");
        buttonLeft.position.set(100, 1200);
        buttonLeft.getChildAt(1).angle = 180
        buttonLeft.getChildAt(1).position.x -= 2
        this.addChild(buttonLeft);
        buttonLeft.on('pointerdown', () => { this.playerRobot.speed.x = -350 })
            .on('pointerup', () => { this.playerRobot.speed.x = 0 })
            .on('pointerout', () => { this.playerRobot.speed.x = 0 })
            .on('pointerupoutside', () => { this.playerRobot.speed.x = 0 });

        const buttonRight: Button = new Button(0xf52222, "Next");
        buttonRight.position.set(250, 1200);
        this.addChild(buttonRight);
        buttonRight.on('pointerdown', () => { this.playerRobot.speed.x = 350 })
            .on('pointerup', () => { this.playerRobot.speed.x = 0 })
            .on('pointerupoutside', () => { this.playerRobot.speed.x = 0 })
            .on('pointerout', () => { this.playerRobot.speed.x = 0 });

        const buttonJump: Button = new Button(0xf52222, "Next");
        buttonJump.position.set(600, 1200);
        buttonJump.getChildAt(1).angle = -90;
        buttonJump.getChildAt(1).position.y -= 3;
        this.addChild(buttonJump);
        buttonJump.on('pointerdown', () => { this.playerRobot.jump() });

    }


    public update(deltaTime: number, _deltaFrame: number) {

        this.playerRobot.update(deltaTime); // update animation

        for (let platform of this.platforms) {
            const overlap = checkCollision(this.playerRobot, platform);
            if (overlap != null) {
                this.playerRobot.separate(overlap, platform.position);
            }
        }


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
            this.playerRobot.speed.y = 0;
            this.playerRobot.canJump = true;
        }

    }

}
