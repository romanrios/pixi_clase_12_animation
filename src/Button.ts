import { Container, NineSlicePlane, Sprite, SpriteSource, Texture } from "pixi.js";

export class Button extends Container {
    constructor(tint: number, buttonSprite: SpriteSource) {
        super();
        const button = new NineSlicePlane(
            Texture.from("Panel"),
            30, 30, 30, 30
        );
        button.width = 120;
        button.height = 120;
        button.pivot.set(button.width / 2);
        button.tint = tint;
        this.addChild(button);
        const buttonContent = Sprite.from(buttonSprite)
        buttonContent.pivot.set(buttonContent.width/2);
        buttonContent.scale.set(0.7);
        buttonContent.position.set(button.x,button.y);
        this.addChild(buttonContent); 


    }
};