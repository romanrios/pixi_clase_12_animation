import { DisplayObject } from "pixi.js";

export interface IScene extends DisplayObject {
    update(deltaTime: number, deltaFrame: number): void;
}