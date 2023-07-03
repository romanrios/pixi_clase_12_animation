import { Container, Sprite } from "pixi.js";
import { IScene } from "../utils/IScene";

export class MushroomHat extends Container implements IScene {

    public eyes: Sprite;
    public hat: Sprite;
    private mushroom: Sprite;
    private mushroomContainer: Container;

    constructor() {
        super();

        this.mushroom = Sprite.from("Mushroom_eyeless");
        this.mushroom.anchor.set(0.5);
        this.mushroom.scale.set(0.9, 0.9);
        this.addChild(this.mushroom);

        this.eyes = Sprite.from("Mushroom_eyes");
        this.eyes.anchor.set(0.5);
        this.eyes.scale.set(0.9, 0.9);
        this.eyes.y = 60;
        this.addChild(this.eyes);

        this.hat = Sprite.from("Hat");
        this.hat.anchor.set(0.5);
        this.hat.y = -130;
        this.addChild(this.hat);

        this.mushroomContainer = new Container();
        this.mushroomContainer.addChild(this.mushroom);
        this.mushroomContainer.addChild(this.hat);
        this.mushroomContainer.addChild(this.eyes);
        this.mushroomContainer.x = this.width / 2;
        this.mushroomContainer.y = this.height / 2;
        this.addChild(this.mushroomContainer);

    }

    private speed = 0.5;
    update(delta: number): void {
        this.eyes.x += this.speed * delta;
        if (this.eyes.x < -10 || this.eyes.x > 10) {
            this.speed = -this.speed;
        }
        this.hat.angle += this.speed;
    }

    

}







