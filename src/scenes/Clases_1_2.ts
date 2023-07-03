import { Container, Graphics, Sprite, TextStyle, Text, AnimatedSprite, Texture, NineSlicePlane } from "pixi.js";
import { Manager } from "../utils/Manager";
import { MushroomHat } from "../game/MushroomHat";
import { IScene } from "../utils/IScene";

export class Clases_1_2 extends Container implements IScene {
    private mushroomWithHat: MushroomHat;
    private graphy: Graphics;

    constructor() {
        super();

        // Graphics
        this.graphy = new Graphics();
        this.graphy.beginFill(0x8ad2ff);
        this.graphy.lineStyle(280, 0x6ec7ff);
        this.graphy.drawCircle(0, 0, 380);
        this.graphy.endFill();
        this.addChild(this.graphy);
        this.graphy.x = Manager.width / 2;
        this.graphy.y = Manager.height / 2;
        this.graphy.moveTo(700, 550);

        // // Class extending from Container
        this.mushroomWithHat = new MushroomHat();
        this.mushroomWithHat.position.set(360, 400);
        this.addChild(this.mushroomWithHat);

        // Sprite
        const pipe: Sprite = Sprite.from("Pipe");
        pipe.scale.set(1.25);
        pipe.anchor.set(0.5);
        pipe.x = Manager.width / 2;
        pipe.y = 1200;
        this.addChild(pipe);

        // TextStyle
        const styly: TextStyle = new TextStyle({
            fontFamily: 'Square',
            fontSize: 60,
            fontStyle: "oblique",
            fontWeight: 'bold',
            fill: ['#ffffff', '#fab234'], // gradient
            stroke: '#4a1850',
            strokeThickness: 5,
            dropShadow: true,
            dropShadowColor: '#4083e3',
            dropShadowBlur: 4,
            dropShadowAngle: Math.PI / 2,
            dropShadowDistance: 4,
            wordWrap: true,
            wordWrapWidth: 400,
            lineJoin: 'round'
        });
        const texty: Text = new Text('welcome\n    to pixijs.', styly);
        // texty.text = "Text change. Do not abuse this resource";
        this.addChild(texty);
        texty.x = 100;
        texty.y = 520;
        texty.angle = -14;


        // Animated Sprite
        const robotAnimated: AnimatedSprite = new AnimatedSprite(
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
        );
        robotAnimated.play();
        robotAnimated.animationSpeed = 0.3;
        robotAnimated.scale.set(1.5);
        robotAnimated.position.set(100, 170);
        this.addChild(robotAnimated);


        // Nice-Slice Plane
        const panel = new NineSlicePlane(
            Texture.from("Panel"),
            40, 40, 40, 40
        );
        this.addChild(panel);
        panel.width = 300;
        panel.height = 80;
        panel.position.set(0, 362);
        panel.alpha = 0.5;


        const panel2 = new NineSlicePlane(
            Texture.from("Panel"),
            30, 30, 30, 30
        );
        panel2.tint = 0x50b9f2;
        panel2.width = 150;
        panel2.height = 250;
        panel2.position.set(540, 450);
        panel2.alpha = 0.5;
        panel2.angle = 20;
        this.addChild(panel2);
    }

    private speed = 0.5;
    private speed_b = 5;
    update(_deltaTime: number, deltaFrame: number): void {
        this.mushroomWithHat.angle -= 0.5 * deltaFrame;
        this.mushroomWithHat.y += this.speed_b * deltaFrame;
        if (this.mushroomWithHat.y < 100 || this.mushroomWithHat.y > 1170) {
            this.speed_b = -this.speed_b;
        }
        this.graphy.scale.x += 0.005 * this.speed_b * deltaFrame;
        this.graphy.scale.y += 0.005 * this.speed_b * deltaFrame;

        this.mushroomWithHat.eyes.x += this.speed * deltaFrame;
        if (this.mushroomWithHat.eyes.x < -10 || this.mushroomWithHat.eyes.x > 10) {
            this.speed = -this.speed;
        }
        this.mushroomWithHat.hat.angle += this.speed * deltaFrame;
    }
}
