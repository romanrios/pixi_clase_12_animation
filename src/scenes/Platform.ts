import { Container, Sprite } from "pixi.js";

export class Platform extends Container {

    constructor() {
        super();

        const platform = Sprite.from("Platform");
        this.addChild(platform);

    }
}