import { Container, Graphics, Rectangle, Sprite } from "pixi.js";
import { IHitbox } from "./IHitbox";

export class Platform extends Container implements IHitbox {
    private hitbox: Graphics;

    constructor() {
        super();

        const platform = Sprite.from("Platform");
        platform.y = -25
        this.addChild(platform);                
        
        this.hitbox = new Graphics();
        this.hitbox.beginFill(0x00FFFF,0.3);
        this.hitbox.drawRect(0,-25,300,50);
        this.hitbox.endFill;
        this.addChild(this.hitbox);
        
        const auxZero = new Graphics();
        auxZero.beginFill(0xFF00FF);
        auxZero.drawCircle(0, 0, 10);
        auxZero.endFill();
        this.addChild(auxZero);

    }

    public getHitbox(): Rectangle
    {
        return this.hitbox.getBounds()
    }

}