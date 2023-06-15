import { Container, NineSlicePlane, TextStyle, Texture, Text, Sprite } from "pixi.js";
import { app } from ".";


export class SceneCompletedUI extends Container {
    constructor() {
        super();

        const glow: Sprite = Sprite.from("Glow");
        glow.anchor.set(0.5);
        glow.x = app.screen.width / 2;
        glow.y = 300;
        this.addChild(glow)

        const panelFondo = new NineSlicePlane(
            Texture.from("Panel"),
            30, 30, 30, 30
        );
        panelFondo.tint = 0xFFF9E3;
        panelFondo.width = 500;
        panelFondo.height = 600;
        panelFondo.pivot.x = panelFondo.width / 2;
        panelFondo.x = app.screen.width / 2;
        panelFondo.y = 400;
        this.addChild(panelFondo);

        const panelTitle = new NineSlicePlane(
            Texture.from("Panel"),
            30, 30, 30, 30
        );
        panelTitle.width = 500;
        panelTitle.pivot.x = panelTitle.width / 2;
        panelTitle.height = 150;
        panelTitle.x = app.screen.width / 2;
        panelTitle.y = 250;
        panelTitle.tint = 0x00C18C;
        this.addChild(panelTitle);

        const panelHome = new NineSlicePlane(
            Texture.from("Panel"),
            30, 30, 30, 30
        );
        panelHome.width = 120;
        panelHome.pivot.set(panelHome.width / 2);
        panelHome.height = 120;
        panelHome.x = app.screen.width / 2 - 140;
        panelHome.y = 880;
        panelHome.tint = 0x00A3A8;
        this.addChild(panelHome);
        const threelines = Sprite.from("ThreeLines")
        threelines.pivot.set(threelines.width/2);
        threelines.scale.set(0.7);
        threelines.position.set(panelHome.x,panelHome.y);
        this.addChild(threelines); 

        const panelRetry = new NineSlicePlane(
            Texture.from("Panel"),
            30, 30, 30, 30
        );
        panelRetry.width = 120;
        panelRetry.pivot.set(panelRetry.width / 2);
        panelRetry.height = 120;
        panelRetry.x = app.screen.width / 2;
        panelRetry.y = 880;
        panelRetry.tint = 0xFFC931;
        this.addChild(panelRetry);
        const retry = Sprite.from("Retry")
        retry.pivot.set(retry.width/2);
        retry.scale.set(0.7);
        retry.position.set(panelRetry.x,panelRetry.y);
        this.addChild(retry); 

        const panelNext = new NineSlicePlane(
            Texture.from("Panel"),
            30, 30, 30, 30
        );
        panelNext.width = 120;
        panelNext.pivot.set(panelNext.width / 2);
        panelNext.height = 120;
        panelNext.x = app.screen.width / 2 + 140;
        panelNext.y = 880;
        panelNext.tint = 0x00C18C;
        this.addChild(panelNext);
        const next = Sprite.from("Next")
        next.pivot.set(next.width/2);
        next.scale.set(0.7);
        next.position.set(panelNext.x,panelNext.y);
        this.addChild(next); 


        const styly2: TextStyle = new TextStyle({
            fontFamily: "Square",
            fontSize: 60,
            fill: '#ffffff',
            dropShadow: true,
            dropShadowColor: '#007555',
            align: "center"
        });
        const titleText: Text = new Text('NIVEL\nCOMPLETADO', styly2);
        titleText.anchor.set(0.5);
        titleText.x = app.screen.width / 2;
        titleText.y = 325;
        this.addChild(titleText);

        const star1 = Sprite.from("Star");
        star1.pivot.set(star1.width / 2);
        star1.x = app.screen.width / 2 - 130;
        star1.y = 520;
        star1.angle = -10;
        this.addChild(star1);        


        const star2 = Sprite.from("Star");
        star2.pivot.set(star2.width / 2);
        star2.scale.set(1.1);
        star2.x = app.screen.width / 2;
        star2.y = 490;
        this.addChild(star2);        


        const star3 = Sprite.from("Star");
        star3.pivot.set(star3.width / 2);
        star3.x = app.screen.width / 2 + 130;
        star3.y = 520;
        star3.angle = 10;
        this.addChild(star3);        

        const brownText: TextStyle = new TextStyle({
            fontFamily: "Square",
            fontSize: 40,
            fill: '#665042',
        });
        const textMonedas: Text = new Text(' MONEDAS   470 ', brownText);
        textMonedas.anchor.set(0.5);
        textMonedas.x = app.screen.width / 2;
        textMonedas.y = 650;
        this.addChild(textMonedas);


        const textPuntaje: Text = new Text(' PUNTAJE   12500 ', brownText);
        textPuntaje.anchor.set(0.5);
        textPuntaje.x = app.screen.width / 2;
        textPuntaje.y = 740;
        this.addChild(textPuntaje);





        // Ticker
        app.ticker.add((delta) => {
            glow.angle -= 0.7 * delta;
        });


    }
}