import { AnimatedSprite, Container, NineSlicePlane, Texture } from "pixi.js";
import { Button } from "../UI/Button";
import { Keyboard } from "../utils/Keyboard";
import { IScene } from "../utils/IScene";

export class Clase_5_TickerScene extends Container implements IScene {

    private robotAnimated: AnimatedSprite;

    constructor() {
        super();

        const panel = new NineSlicePlane(
            Texture.from("Panel"),
            40, 40, 40, 40
        );
        panel.width = 720;
        panel.height = 80;
        panel.position.set(0, 692);
        panel.tint = 0xebdabc;
        this.addChild(panel);


        // Animated Sprite
        this.robotAnimated = new AnimatedSprite(
            [
                Texture.from("RobotWalk0"),
                Texture.from("RobotWalk1"),
                Texture.from("RobotWalk2"),
                Texture.from("RobotWalk3"),
                Texture.from("RobotWalk4"),
                Texture.from("RobotWalk5"),
                Texture.from("RobotWalk6"),
                Texture.from("RobotWalk7")
            ],
            false
        );
        this.robotAnimated.play();
        this.robotAnimated.animationSpeed = 0;
        this.robotAnimated.scale.set(1.5);
        this.robotAnimated.anchor.x = 0.5;
        this.robotAnimated.position.set(100, 500);
        this.addChild(this.robotAnimated);

        const buttonRight: Button = new Button(0xf52222, "Next");
        buttonRight.x = this.width / 2 + 140;
        buttonRight.y = 880
        this.addChild(buttonRight);
        buttonRight.on('pointerdown', () => {
            this.movingRight = true;
        });

        buttonRight.on('pointerup', () => {
            this.movingRight = false;
        });

        buttonRight.on('pointerupoutside', () => {
            this.movingRight = false;
        });

        buttonRight.on('pointerout', () => {
            this.movingRight = false;
        });

        const buttonLeft: Button = new Button(0xf52222, "Next");
        buttonLeft.x = this.width / 2 - 140;
        buttonLeft.y = 880
        buttonLeft.getChildAt(1).angle = 180
        buttonLeft.getChildAt(1).position.x -= 2

        this.addChild(buttonLeft);

        buttonLeft.on('pointerdown', () => {
            this.movingLeft = true;
        });

        buttonLeft.on('pointerup', () => {
            this.movingLeft = false;
        });

        buttonLeft.on('pointerout', () => {
            this.movingLeft = false;
        });

    }


    private movingRight = false
    private movingLeft = false

    update(deltaTime: number, deltaFrame: number) {

        console.log(deltaTime, deltaFrame)

        this.robotAnimated.update(deltaFrame);

        if (this.movingRight == true) {
            this.robotAnimated.animationSpeed = 0.2 * deltaFrame;
            this.robotAnimated.scale.x = 1.5;
            this.robotAnimated.x += 2 * deltaFrame;
        } else if (this.movingLeft == true) {
            this.robotAnimated.animationSpeed = 0.2 * deltaFrame;
            this.robotAnimated.scale.x = -1.5;
            this.robotAnimated.x -= 2 * deltaFrame;
        } else {
            this.robotAnimated.animationSpeed = 0
            this.robotAnimated.x += 0;
        }

        if (Keyboard.state.get("ArrowRight") || Keyboard.state.get("KeyD")) {
            this.robotAnimated.animationSpeed = 0.2 * deltaFrame;
            this.robotAnimated.scale.x = 1.5;
            this.robotAnimated.x += 2 * deltaFrame;
        }
        if (Keyboard.state.get("ArrowLeft") || Keyboard.state.get("KeyA")) {
            this.robotAnimated.animationSpeed = 0.2 * deltaFrame;
            this.robotAnimated.scale.x = -1.5;
            this.robotAnimated.x -= 2 * deltaFrame;
        }

        // LAG MACHINE
        // for (let index = 0; index < 35000000; index++) {1+1;};        

    }

};