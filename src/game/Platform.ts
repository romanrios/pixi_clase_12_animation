import { Container, Graphics, Rectangle, Sprite } from "pixi.js";
import { IHitbox } from "./IHitbox";

export class Platform extends Container implements IHitbox {
    private hitbox: Graphics;

    constructor() {
        super();

        const platform = Sprite.from("Platform");
        this.addChild(platform);

        this.hitbox = new Graphics();
        this.hitbox.beginFill(0x00FFFF,0.3);
        this.hitbox.drawRect(0,0,300,50);
        this.hitbox.endFill;
        this.addChild(this.hitbox);       

    }

    public getHitbox(): Rectangle
    {
        return this.hitbox.getBounds()
    }

}