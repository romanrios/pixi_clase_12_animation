import { Container, NineSlicePlane, Sprite, SpriteSource, Texture } from "pixi.js";

export class Button extends Container {
    tint: any;
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

        this.interactive = true;

        this.onmouseover = function(){
            button.tint -= 0XFFFFFF * 0.01;            
        }
        this.onmouseout = function(){
            button.tint += 0xFFFFFF * 0.01;            
        }

        this.onpointerdown = function(){
            this.scale.set(0.9)
        }
        this.onpointerup = function(){
            this.scale.set(1)
            //button.tint += 100;
        }
        this.onpointerout = function(){
            this.scale.set(1)
        }



    }
};