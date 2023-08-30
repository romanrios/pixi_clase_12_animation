import { Container, Sprite, Texture, TilingSprite } from "pixi.js";
import { IScene } from "../utils/IScene";
import { Manager } from "../utils/Manager";
import { Player_clase12 } from "../game/Player_clase12";
import { Platform } from "../game/Platform";
import { checkCollision } from "../game/IHitbox";
import { Button } from "../UI/Button";
import { Easing, Tween } from "tweedle.js";
import * as particle from "../game/emitter.json";
import * as particle2 from "../game/cartoonSmoke.json";
import { Emitter, LinkedListContainer, upgradeConfig } from "@pixi/particle-emitter";
import { GlowFilter } from "@pixi/filter-glow";
import { CRTFilter } from "@pixi/filter-crt";
import { SongButton } from "../UI/SongButton";

export class Clase_12_AnimationScene extends Container implements IScene {

    private playerRobot: Player_clase12;
    private platforms: Platform[];
    private platform1: Platform;
    private platform2: Platform;
    private platform3: Platform;
    private logopixi: Sprite;
    private world: Container;
    private background: TilingSprite;

    private particle: Emitter;
    private particleContainer: LinkedListContainer;
    private myCRT: CRTFilter;
    private cartoonSmoke: Emitter;
    private particleContainer2: LinkedListContainer;

    constructor() {
        super();

        this.background = new TilingSprite(Texture.from("SciFiBackground"), Manager.width, Manager.height);
        this.addChild(this.background);

        this.world = new Container()
        this.addChild(this.world)

        this.platforms = [];

        const gear = Sprite.from("Gear")
        gear.anchor.set(0.5);
        gear.position.set(1550, 400);
        this.world.addChild(gear);
        new Tween(gear)
            .to({ angle: 360 }, 3000)
            .start()
            .repeat(Infinity);

        new Tween(gear)
            .to({ y: gear.y - 50 }, 3000)
            .start()
            .yoyo(true)
            .repeat(Infinity)

        this.logopixi = Sprite.from("LogoPixi")
        this.logopixi.position.set(180, 200);
        this.logopixi.scale.set(0.3);
        this.logopixi.anchor.set(0.5);
        this.world.addChild(this.logopixi);

        this.platform1 = new Platform()
        this.platform1.position.set(0, 300);
        this.platform1.scale.set(0.9);
        this.platforms.push(this.platform1);

        this.platform2 = new Platform()
        this.platform2.position.set(900, 500);
        this.platform2.scale.set(0.9);
        this.platforms.push(this.platform2);

        this.platform3 = new Platform()
        this.platform3.position.set(1400, 500);
        this.platform3.scale.set(0.9);
        this.platforms.push(this.platform3);

        this.world.addChild(...this.platforms)

        this.playerRobot = new Player_clase12();
        this.playerRobot.position.x = 640;
        this.playerRobot.scale.set(0.9);
        this.world.addChild(this.playerRobot);


        // Movement buttons
        const buttonLeft = new Button(0xf52261, "Next");
        buttonLeft.position.set(150, 650);
        buttonLeft.getChildAt(1).angle = 180
        buttonLeft.getChildAt(1).position.x -= 2
        this.addChild(buttonLeft);
        buttonLeft.on('pointerdown', () => {
            this.playerRobot.speed.x = -350;
            this.playerRobot.setPlayerScaleX(-1);
        })
            .on('pointerup', () => { this.playerRobot.speed.x = 0 })
            .on('pointerout', () => { this.playerRobot.speed.x = 0 })
            .on('pointerupoutside', () => { this.playerRobot.speed.x = 0 });

        const buttonRight: Button = new Button(0xf52261, "Next");
        buttonRight.position.set(300, 650);
        this.addChild(buttonRight);
        buttonRight.on('pointerdown', () => {
            this.playerRobot.speed.x = 350;
            this.playerRobot.setPlayerScaleX(1);
        })
            .on('pointerup', () => { this.playerRobot.speed.x = 0 })
            .on('pointerupoutside', () => { this.playerRobot.speed.x = 0 })
            .on('pointerout', () => { this.playerRobot.speed.x = 0 });

        const buttonJump: Button = new Button(0xf52261, "Next");
        buttonJump.position.set(1100, 650);
        buttonJump.getChildAt(1).angle = -90;
        buttonJump.getChildAt(1).position.y -= 3;
        this.addChild(buttonJump);
        buttonJump.on('pointerdown', () => { this.playerRobot.jump() });





        // ****************************
        // Tweedle.JS
        // ****************************

        new Tween(this.logopixi)
            .to({ x: 1050, y: 150, alpha: 0.5, scale: { x: 0.6, y: 0.6 }, angle: 360 }, 4000)
            .easing(Easing.Elastic.Out)
            .repeat(Infinity)
            .yoyo(true)
            .onRepeat(() => {

                new Tween(this.logopixi)
                    .to({ y: 500 }, 2000)
                    .easing(Easing.Elastic.Out)
                    .repeat(Infinity)
                    .yoyo(true)
                    .start()

            })
            .start()

        this.movementPlatform1()

        new Tween(this.platform2)
            .to({ y: 300 }, 5000)
            .repeat(Infinity)
            .yoyo(true)
            .easing(Easing.Elastic.Out)
            .start();




        // ****************************
        // Particles
        // ****************************

        this.particleContainer = new LinkedListContainer();
        this.particle = new Emitter(this.particleContainer, upgradeConfig(particle, Texture.from("Particle")))
        // this.particle.spawnPos.x = 0
        // this.particle.spawnPos.y = 0
        this.particle.emit = true
        this.logopixi.addChild(this.particleContainer)

        this.particleContainer2 = new LinkedListContainer();
        this.cartoonSmoke = new Emitter(this.particleContainer2, upgradeConfig(particle2, Texture.from("CartoonSmoke")))
        this.cartoonSmoke.emit = true
        this.playerRobot.addChild(this.particleContainer2);

        // ****************************
        // Filters
        // ****************************

        const myGlow = new GlowFilter({
            //color: 0xFFFFFF,
            //distance: 20,
            alpha: 0.8
        })
        this.playerRobot.filters = [myGlow]
        gear.filters = [myGlow]

        this.myCRT = new CRTFilter({
            noise: 0.1,
            noiseSize: 6,
            lineWidth: 3,
            vignettingAlpha: 0.6
        });

        this.filters = [this.myCRT]


        // Particles & Filters BUTTONS
        const crtButton = new SongButton("CRT Filter", 400);
        crtButton.alpha = 0.8;
        crtButton.setButtonColor(0xf52261);
        crtButton.scale.set(0.7);
        crtButton.position.set(240, 70);
        this.addChild(crtButton);
        crtButton.eventMode = "static";
        crtButton.on("pointerup", () => {
            if (this.filters == null) {
                crtButton.setButtonColor(0xf52261);
                this.filters = [this.myCRT]
            } else {
                crtButton.setButtonColor(0xCCCCCC);
                this.filters = null
            }
        })

        const gLowButton = new SongButton("Glow Filter", 400);
        gLowButton.alpha = 0.8;
        gLowButton.setButtonColor(0xf52261);
        gLowButton.scale.set(0.7);
        gLowButton.position.set(crtButton.x + 400, 70);
        this.addChild(gLowButton);
        gLowButton.eventMode = "static";
        gLowButton.on("pointerup", () => {
            if (this.playerRobot.filters == null) {
                gLowButton.setButtonColor(0xf52261);
                this.playerRobot.filters = [myGlow]
                gear.filters = [myGlow]
            } else {
                gLowButton.setButtonColor(0xCCCCCC);
                this.playerRobot.filters = null
                gear.filters = null
            }
        })

        const particleButton = new SongButton("Particles", 400);
        particleButton.alpha = 0.8;
        particleButton.setButtonColor(0xf52261);
        particleButton.scale.set(0.7);
        particleButton.position.set(gLowButton.x + 400, 70);
        this.addChild(particleButton);
        particleButton.eventMode = "static";
        particleButton.on("pointerup", () => {
            if (this.particle.emit == false) {
                particleButton.setButtonColor(0xf52261);
                this.particle.emit = true
            } else {
                particleButton.setButtonColor(0xCCCCCC);
                this.particle.emit = false
            }
        })






    }






















    public update(deltaTime: number, _deltaFrame: number) {

        this.myCRT.time += _deltaFrame;
        this.myCRT.seed = Math.random();

        this.particle.update(deltaTime / 1000 * 0.5)
        this.cartoonSmoke.update(deltaTime / 1000 * 0.5)

        this.world.x = -this.playerRobot.x * this.worldTransform.a + Manager.width / 2
        this.background.tileScale.x = this.world.scale.x
        this.background.tileScale.y = this.world.scale.y

        console.log(this.background.tilePosition.x)
        this.background.tilePosition.x = this.world.x
        this.background.tilePosition.x %= 1280        


        // Sub-stepping
        if (this.playerRobot.speed.y > 1) {
            while (deltaTime > 1) {
                deltaTime -= 1;
                this.playerRobot.update(1);
                for (let platform of this.platforms) {
                    const overlap = checkCollision(this.playerRobot, platform);
                    if (overlap != null) {
                        this.playerRobot.separate(overlap, platform.position, platform.speed.x);
                    }
                }
            }
        } else {
            this.playerRobot.update(deltaTime);
            for (let platform of this.platforms) {
                const overlap = checkCollision(this.playerRobot, platform);
                if (overlap != null) {
                    this.playerRobot.separate(overlap, platform.position, platform.speed.x);
                }
            }
        }


        // // limit horizontal
        // if (this.playerRobot.x > Manager.width) {
        //     //limit right
        //     this.playerRobot.x = Manager.width;
        // } else if (this.playerRobot.x < 0) {
        //     // limit left
        //     this.playerRobot.x = 0;
        // }

        // limit vertical
        if (this.playerRobot.y > Manager.height - 100) {
            if (this.playerRobot.canJump == false && this.particle.emit == true) {
                this.cartoonSmoke.emit = true
            }
            this.playerRobot.y = Manager.height - 100;
            this.playerRobot.speed.y = 0;
            this.playerRobot.canJump = true;
            if (this.playerRobot.speed.x !== 0) {
                this.playerRobot.playState("run", false)
            }
            else {
                this.playerRobot.playState("idle", true)
            }
        }
    }
















    private movementPlatform1() {
        new Tween(this.platform1)
            .onUpdate(() => { this.platform1.speed.x = 0 })
            .to({ x: 0, y: 400 }, 3000)
            .easing(Easing.Elastic.Out)
            .start()
            .onComplete(
                () => {
                    new Tween(this.platform1)
                        .onUpdate(() => { this.platform1.speed.x = 2.8 })
                        .to({ x: 500, y: 400 }, 3000)
                        .start()
                        .onComplete(
                            () => {
                                new Tween(this.platform1)
                                    .onUpdate(() => { this.platform1.speed.x = 0 })
                                    .to({ x: 500, y: 300 }, 3000)
                                    .easing(Easing.Elastic.Out)
                                    .start()
                                    .onComplete(() => {
                                        new Tween(this.platform1)
                                            .onUpdate(() => { this.platform1.speed.x = -2.8 })
                                            .to({ x: 0, y: 300 }, 3000)
                                            .start()
                                            .onComplete(this.movementPlatform1.bind(this))
                                    })
                            }
                        )
                }
            )
    }
}
