import { Assets, Container, Sprite } from "pixi.js";
import { IScene } from "../utils/IScene";
import { Manager } from "../utils/Manager";
import { SongButton } from "../UI/SongButton";
import '@pixi/gif';
import { sound } from '@pixi/sound';

export class SongGame_Title extends Container implements IScene {
    private titleLogo: Sprite;

    constructor() {
        super();

        sound.play("Guitar");

        const titleBackground = Sprite.from("TitleBackground");
        this.addChild(titleBackground);

        this.titleLogo = Sprite.from("TitleLogo");
        this.titleLogo.anchor.set(0.5);
        this.titleLogo.position.set(Manager.width / 2, 550);
        this.addChild(this.titleLogo);

        const rayo1 = Assets.get("Rayo");
        rayo1.position.set(40, 700);
        this.addChild(rayo1);

        const rayo2 = rayo1.clone();
        rayo2.scale.set(-0.9, 0.9);
        rayo2.position.set(680, 700);
        rayo2.angle = 10;
        this.addChild(rayo2);

        const button = new SongButton("Jugar", 500);
        button.position.set(Manager.width / 2, 1050)
        this.addChild(button);


    }

    currentTime = 0; // Tiempo actual para el cálculo de la escala

    update(deltaTime: number, _deltaFrame: number): void {

        const scaleMin = 0.97; // Escala mínima del objeto
        const scaleMax = 1.03; // Escala máxima del objeto
        const beatDuration = 800; // Duración de un latido en milisegundos

        this.currentTime += deltaTime;

        const t = (this.currentTime % beatDuration) / beatDuration;
        const scale = scaleMin + Math.abs(Math.sin(t * Math.PI)) * (scaleMax - scaleMin);

        this.titleLogo.scale.set(scale);
    }
}