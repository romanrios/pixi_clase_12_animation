import { AnimatedSprite, Container, Sprite, Texture } from "pixi.js";
import { IScene } from "../utils/IScene";
import { PhysicsContainer } from "../utils/PhysicsContainer";
import { Manager } from "../utils/Manager";

export class Clase_6 extends Container implements IScene {

    private robotAnimated: AnimatedSprite;
    private physRobot: PhysicsContainer;
    private dvdLogo: Sprite;
    private physDvdLogo: PhysicsContainer;

    constructor() {
        super();

        // DVD Portable + Logo

        const portableDvd = Sprite.from("PortableDvd");
        portableDvd.position.set(-21, 340
        );
        portableDvd.scale.set(1.18);

        this.addChild(portableDvd);

        this.dvdLogo = Sprite.from("DvdLogo");
        this.dvdLogo.anchor.set(0.5);
        this.dvdLogo.scale.set(0.4);
        this.physDvdLogo = new PhysicsContainer()
        this.physDvdLogo.addChild(this.dvdLogo)
        this.physDvdLogo.position.set(362, 561)
        this.physDvdLogo.speed.x = 150;
        this.physDvdLogo.speed.y = 150;
        this.addChild(this.physDvdLogo);


        // Animated Sprite robot

        this.robotAnimated = new AnimatedSprite(
            [
                Texture.from("character_robot_walk0.png"),
                Texture.from("character_robot_walk1.png"),
                Texture.from("character_robot_walk2.png"),
                Texture.from("character_robot_walk3.png"),
                Texture.from("character_robot_walk4.png"),
                Texture.from("character_robot_walk5.png"),
                Texture.from("character_robot_walk6.png"),
                Texture.from("character_robot_walk7.png")
            ],
            false
        );
        this.robotAnimated.play();
        this.robotAnimated.animationSpeed = 0.2;
        this.robotAnimated.anchor.set(0.5, 1);

        this.physRobot = new PhysicsContainer()
        this.physRobot.speed.x = 150;
        this.physRobot.speed.y = 0;
        this.physRobot.acceleration.y = 500;
        this.addChild(this.physRobot)
        this.physRobot.addChild(this.robotAnimated);

    }


    public update(deltaTime: number, deltaFrame: number) {
        this.robotAnimated.update(deltaFrame); // update animation

        // craft delta time in seconds
        const dt = deltaTime / 1000

        // update physics
        this.physRobot.update(dt);

        // limit horizontal
        if (this.physRobot.x > Manager.width) {
            //limit right
            this.physRobot.x = Manager.width;
            this.physRobot.speed.x = Math.abs(-this.physRobot.speed.x) * -1;
            this.physRobot.scale.x = -1;
        } else if (this.physRobot.x < 0) {
            // limit left
            this.physRobot.x = 0;
            this.physRobot.speed.x = Math.abs(-this.physRobot.speed.x);
            this.physRobot.scale.x = 1;
        }

        // limit vertical
        if (this.physRobot.y > Manager.height - 300) {
            this.physRobot.y = Manager.height - 300;
            this.physRobot.speed.y = -700 * Math.random();
        }

        // DVD LOGO LIMITS

        // update physics
        this.physDvdLogo.update(dt);

        // limit horizontal
        if (this.physDvdLogo.x > Manager.width - 125) {
            //limit right
            this.physDvdLogo.x = Manager.width - 125;
            this.physDvdLogo.speed.x = Math.abs(-this.physDvdLogo.speed.x) * -1;
            this.dvdLogo.tint = Math.floor(Math.random() * 0xAAAAAA + 0x555555);
        } else if (this.physDvdLogo.x < 125) {
            // limit left
            this.physDvdLogo.x = 125;
            this.physDvdLogo.speed.x = Math.abs(this.physDvdLogo.speed.x);
            this.dvdLogo.tint = Math.floor(Math.random() * 0xAAAAAA + 0x555555);
        }

        // limit vertical
        if (this.physDvdLogo.y > 670) {
            //limit bottom
            this.physDvdLogo.y = 670;
            this.physDvdLogo.speed.y = Math.abs(this.physDvdLogo.speed.y) * -1;
            this.dvdLogo.tint = Math.floor(Math.random() * 0xAAAAAA + 0x555555);
        } else if (this.physDvdLogo.y < 425) {
            // limit top
            this.physDvdLogo.y = 425;
            this.physDvdLogo.speed.y = Math.abs(this.physDvdLogo.speed.y);
            this.dvdLogo.tint = Math.floor(Math.random() * 0xAAAAAA + 0x555555);
        }




    }

};
