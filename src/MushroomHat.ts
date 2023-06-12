import { Container, Sprite } from "pixi.js";
import { app } from "./index"

export class MushroomHat extends Container {
    constructor() {
        super();

        const mushroom: Sprite = Sprite.from("Mushroom_eyeless");
        mushroom.anchor.set(0.5);
        mushroom.scale.set(0.9, 0.9);
        this.addChild(mushroom);

        const eyes: Sprite = Sprite.from("Mushroom_eyes");
        eyes.anchor.set(0.5);
        eyes.scale.set(0.9, 0.9);
        eyes.y = 60;
        this.addChild(eyes);

        const hat: Sprite = Sprite.from("Hat");
        hat.anchor.set(0.5);
        hat.y = -130;
        this.addChild(hat);

        const mushroomContainer: Container = new Container();
        mushroomContainer.addChild(mushroom);
        mushroomContainer.addChild(hat);
        mushroomContainer.addChild(eyes);
        mushroomContainer.x = this.width / 2;
        mushroomContainer.y = this.height / 2;
        this.addChild(mushroomContainer);

        // Ticker
        let speed = 0.5;
        app.ticker.add((delta) => {
            eyes.x += speed * delta;
            if (eyes.x < -10 || eyes.x > 10) {
                speed = -speed;
            }
            hat.angle += speed;
        });

    }
}







