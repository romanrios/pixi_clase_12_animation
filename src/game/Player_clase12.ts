import { Graphics, ObservablePoint, Rectangle } from "pixi.js";
import { PhysicsContainer } from "../utils/PhysicsContainer";
import { Keyboard } from "../utils/Keyboard";
import { IHitbox } from "./IHitbox";
import { StateAnimation } from "./StateAnimation";

export class Player_clase12 extends PhysicsContainer implements IHitbox {


    private static readonly GRAVITY = 1500;
    private static readonly MOVE_SPEED = 350;
    private static readonly JUMP = 900;

    public canJump = true;

    private robotAnimated: StateAnimation;

    private hitbox: Graphics;

    constructor() {
        super();


        // Animated Sprite
        // this.robotAnimated = new AnimatedSprite(
        //     [
        //         Texture.from("character_robot_walk0.png"),
        //         Texture.from("character_robot_walk1.png"),
        //         Texture.from("character_robot_walk2.png"),
        //         Texture.from("character_robot_walk3.png"),
        //         Texture.from("character_robot_walk4.png"),
        //         Texture.from("character_robot_walk5.png"),
        //         Texture.from("character_robot_walk6.png"),
        //         Texture.from("character_robot_walk7.png")
        //     ],
        //     false
        // );
        // this.robotAnimated.play();
        // this.robotAnimated.animationSpeed = 0.2;
        // this.robotAnimated.anchor.set(0.5, 1);

        this.robotAnimated = new StateAnimation();
        this.robotAnimated.pivot.set(this.robotAnimated.width / 2, this.robotAnimated.height)

        this.robotAnimated.addState("run", [
            ("character_robot_walk0.png"),
            ("character_robot_walk1.png"),
            ("character_robot_walk2.png"),
            ("character_robot_walk3.png"),
            ("character_robot_walk4.png"),
            ("character_robot_walk5.png"),
            ("character_robot_walk6.png"),
            ("character_robot_walk7.png")
        ]);

        this.robotAnimated.addState("jump", [
            ("character_robot_jump.png"),
        ]);

        this.robotAnimated.addState("idle", [
            ("character_robot_idle.png"),
        ]);

        this.robotAnimated.playState("run", true);


        // const auxZero = new Graphics();
        // auxZero.beginFill(0xFF00FF);
        // auxZero.drawCircle(0, 0, 10);
        // auxZero.endFill();

        this.hitbox = new Graphics();
        this.hitbox.beginFill(0xFF00FF, 0.0001);
        this.hitbox.drawRect(0, -175, 100, 175);
        this.hitbox.endFill;
        this.hitbox.pivot.x = this.hitbox.width / 2;


        this.addChild(this.robotAnimated);
        //this.addChild(auxZero);
        this.addChild(this.hitbox);

        this.acceleration.y = Player_clase12.GRAVITY;

        Keyboard.down.on("ArrowUp", this.jump, this)


        // agregado para que no anule botones touch
        Keyboard.up.on("ArrowLeft", () => {
            this.speed.x = 0;
        });

        Keyboard.up.on("ArrowRight", () => {
            this.speed.x = 0;
        });
    }

    // la contraparte de agregar eventos al teclado, debemos apagarlos
    public override destroy(options: any) {
        super.destroy(options);
        Keyboard.down.off("ArrowUp", this.jump)
    }

    public override update(deltaMS: number) {
        super.update(deltaMS / 1000);
        this.robotAnimated.update(deltaMS / (1000 / 60), 0)

        if (Keyboard.state.get("ArrowRight")) {
            this.speed.x = Player_clase12.MOVE_SPEED;
            this.robotAnimated.scale.x = 1
        } else if (Keyboard.state.get("ArrowLeft")) {
            this.speed.x = -Player_clase12.MOVE_SPEED;
            this.robotAnimated.scale.x = -1;

        }

        if (Keyboard.state.get("ArrowDown")) {
            this.speed.y = 1400;
        }



        // Reemplazado por  Keyboard.up.on ...
        // else if{
        //  this.speed.x = 0;
        //}  

        // if (Keyboard.state.get("ArrowUp")) {
        //     this.jump();
        // }


        // Detiene animación robot cuando no se mueve
        // if (this.speed.x === 0){
        //     this.robotAnimated.animationSpeed = 0;
        // } else {
        //     this.robotAnimated.animationSpeed = 0.2;
        // }
    }

    // Pública para poder acceder desde Clase_7.ts
    jump() {
        if (this.canJump) {
            this.canJump = false;
            this.speed.y = -Player_clase12.JUMP;
            this.robotAnimated.playState("jump", false);
        }
    }

    public getHitbox(): Rectangle {
        return this.hitbox.getBounds()
    }

    public separate(overlap: Rectangle, platform: ObservablePoint<any>) {
        if (overlap.width < overlap.height) {
            if (this.x > platform.x) {
                this.x += overlap.width;
            } else if (this.x < platform.x) {
                this.x -= overlap.width;
            }
        }
        else {
            if (this.y < platform.y) {
                this.y -= overlap.height;
                this.speed.y = 0;
                this.canJump = true;
                if (this.speed.x !== 0) {
                    this.robotAnimated.playState("run", false)
                }
                else {
                    this.robotAnimated.playState("idle",true)
                }

            } else if (this.y > platform.y) {
                this.y += overlap.height;
                this.speed.y = 0;
            }
        }
    }

    public setPlayerScaleX(scaleX: number) {
        this.robotAnimated.scale.x = scaleX;
    }

    public playState(state: string, value: boolean) {
        this.robotAnimated.playState(state,value);
    }


}