import { Container, Texture, TilingSprite } from "pixi.js";
import { IScene } from "../utils/IScene";
import { Player } from "../game/Player";
import { Platform } from "../game/Platform";
import { checkCollision } from "../game/IHitbox";
import { Button } from "../UI/Button";
import { Manager } from "../utils/Manager";

export class Clase_8 extends Container implements IScene {

    private playerRobot: Player;
    private platforms: Platform[];
    private world: Container;
    private bg: TilingSprite;
    private gameSpeed:number = 200;
    private timePassed:number = 0;

    constructor() {
        super();

        this.world = new Container();

        this.platforms = [];

        this.bg = new TilingSprite(Texture.from("SciFiBackgroundBig"),Manager.width,Manager.height);
        this.addChild(this.bg);

        this.playerRobot = new Player();
        this.playerRobot.x = 200; // POSICION X INICIAL DEL PLAYER
        this.world.addChild(this.playerRobot);

        this.addChild(this.world);

        // movement buttons
        const buttonLeft: Button = new Button(0xf52222, "Next");
        buttonLeft.position.set(100, 1200);
        buttonLeft.getChildAt(1).angle = 180
        buttonLeft.getChildAt(1).position.x -= 2
        this.addChild(buttonLeft);
        buttonLeft.on('pointerdown', () => {
            this.playerRobot.speed.x = -350;
            this.playerRobot.setPlayerScaleX(-1.5);
        })
            .on('pointerup', () => { this.playerRobot.speed.x = 0 })
            .on('pointerout', () => { this.playerRobot.speed.x = 0 })
            .on('pointerupoutside', () => { this.playerRobot.speed.x = 0 });

        const buttonRight: Button = new Button(0xf52222, "Next");
        buttonRight.position.set(250, 1200);
        this.addChild(buttonRight);
        buttonRight.on('pointerdown', () => {
            this.playerRobot.speed.x = 350;
            this.playerRobot.setPlayerScaleX(1.5);
        })
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

        this.timePassed += deltaTime;

        if (this.timePassed > (2500* 250/this.gameSpeed))
        {
            this.gameSpeed += 10;
            this.timePassed = 0;
            const plat = new Platform()
            plat.position.set(Manager.width, Math.random()*300+700);
            this.world.addChild(plat);
            this.platforms.push(plat);
        }

        this.playerRobot.update(deltaTime); // update animation

        for (let platform of this.platforms) {
            platform.speed.x = -this.gameSpeed;
            platform.update(deltaTime/1000)
            const overlap = checkCollision(this.playerRobot, platform);
            if (overlap != null) {
                this.playerRobot.separate(overlap, platform.position);
            }
        }


        this.bg.tilePosition.x += -this.gameSpeed * deltaTime/1000 * 0.9;



        // limit vertical
        if (this.playerRobot.y > Manager.height - 180) {
            this.playerRobot.y = Manager.height - 180;
            this.playerRobot.speed.y = 0;
            this.playerRobot.canJump = true;
        }
       
    }

}
