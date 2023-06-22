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
        buttonContent.pivot.set(buttonContent.width / 2);
        buttonContent.scale.set(0.7);
        buttonContent.position.set(button.x, button.y);
        this.addChild(buttonContent);

        this.eventMode = 'static'; // replaces interactive true
        this.cursor = 'pointer';

        this.onmouseover = () => {
            console.log("onmouseover");
            button.tint = button.tint as number + 10000;
        }
        this.onmouseout  = () => {
            console.log("onmouseout");
            button.tint = button.tint as number - 10000;
        }
        this.onmouseup = () => {
            console.log("onmouseup")
            this.scale.set(1)
        }

        this.onpointerdown = () => {
            console.log("onpointerdown")
            this.scale.set(0.9)
        }
        this.onpointerup = () => {
            console.log("onpointerup")
            this.scale.set(1)
            //button.tint += 100;
        }
        this.onpointerout = () => {
            console.log("onpointerout")
            this.scale.set(1)
        }
        this.ontouchend = () => {
            console.log("ontouchend")
            this.scale.set(1)
        }



    }
};