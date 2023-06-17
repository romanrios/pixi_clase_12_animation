import { Container, Graphics, Sprite, TextStyle, Text, AnimatedSprite, Texture, NineSlicePlane } from "pixi.js";
import { app } from "..";
//import { MushroomHat } from "../game/MushroomHat";

export class Scene extends Container {
    constructor() {
        super();

        // Graphics
        const graphy: Graphics = new Graphics();
        graphy.beginFill(0x8ad2ff);
        graphy.lineStyle(280, 0x6ec7ff);
        graphy.drawCircle(0, 0, 380);
        graphy.endFill();
        this.addChild(graphy);
        graphy.x = app.screen.width / 2;
        graphy.y = app.screen.height / 2;
        graphy.moveTo(700, 550);

        // // Class extending from Container
        // const mushroomWithHat: MushroomHat = new MushroomHat();
        // mushroomWithHat.position.set(360, 400);
        // this.addChild(mushroomWithHat);

        // Sprite
        const pipe: Sprite = Sprite.from("Pipe");
        pipe.scale.set(1.25);
        pipe.anchor.set(0.5);
        pipe.x = app.screen.width / 2;
        pipe.y = 1200;
        this.addChild(pipe);

        // TextStyle
        const styly: TextStyle = new TextStyle({
            fontFamily: "KenVector Future",
            fontSize: 50,
            //fontStyle: "oblique",
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
            lineJoin: 'round',
        });
        const texty: Text = new Text('Testing Text and TextStyle', styly);
        // texty.text = "Text change. Do not abuse this resource";
        this.addChild(texty);
        texty.x = 100;
        texty.y = 500;


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
        robotAnimated.position.set(100, 0);
        this.addChild(robotAnimated);


        // Nice-Slice Plane
        const panel = new NineSlicePlane(
            Texture.from("Panel"),
            40, 40, 40, 40
        );
        this.addChild(panel);
        panel.width = 300;
        panel.height = 80;
        panel.position.set(100, 192);


        const panel2 = new NineSlicePlane(
            Texture.from("Panel"),
            30, 30, 30, 30
        );
        this.addChild(panel2);
        panel2.tint = 0x2ef0cc;
        panel2.width = 150;
        panel2.height = 150;
        panel2.position.set(550, 20);


        // Ticker
        // let speed_b = 5;
        // app.ticker.add((delta) => {
        //     mushroomWithHat.angle -= 0.5 * delta;
        //     mushroomWithHat.y += speed_b * delta;
        //     if (mushroomWithHat.y < 100 || mushroomWithHat.y > 1170) {
        //         speed_b = -speed_b;
        //     }
        //     graphy.scale.x += 0.005 * speed_b * delta;
        //     graphy.scale.y += 0.005 * speed_b * delta;
        // });

    }
}