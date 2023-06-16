import { Container, NineSlicePlane, TextStyle, Texture, Text, Sprite } from "pixi.js";
import { app } from ".";
import { Button } from "./Button";


export class SceneCompletedUI extends Container {
    constructor() {
        super();

        // PARA USAR ZINDEX
        // this.sortableChildren = true

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


        // Class extending from Container
        const buttonHome: Button = new Button(0x00A3A8, "ThreeLines");
        buttonHome.x = app.screen.width / 2 - 140;
        buttonHome.y = 880;
        this.addChild(buttonHome);

        const buttonRetry: Button = new Button(0xFFC931, "Retry");
        buttonRetry.x = app.screen.width / 2;
        buttonRetry.y = 880;
        this.addChild(buttonRetry);

        const buttonNext: Button = new Button(0x00C18C, "Next");
        buttonNext.x = app.screen.width / 2 + 140;
        buttonNext.y = 880
        this.addChild(buttonNext);







        const styly: TextStyle = new TextStyle({
            fontFamily: "Square",
            fontSize: 60,
            fill: '#ffffff',
            dropShadow: true,
            dropShadowColor: '#007555',
            align: "center"
        });
        const titleText: Text = new Text('NIVEL\nCOMPLETADO', styly);
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



        // Fullscreen Button
        const buttonFullscreen: Button = new Button(0x00A3A8, "Fullscreen");
        buttonFullscreen.x = 630;
        buttonFullscreen.y = 1190
        this.addChild(buttonFullscreen);
        buttonFullscreen.interactive = true;
        buttonFullscreen.onpointerdown = function () {
            if (document.documentElement.requestFullscreen) {
                document.documentElement.requestFullscreen()
            };
            if (document.exitFullscreen) {
                document.exitFullscreen();
            }
        }


        // Ticker
        app.ticker.add((delta) => {
            glow.angle -= 0.7 * delta;
        });


    }
}