import { AnimatedSprite, Graphics, Texture } from "pixi.js";
import { PhysicsContainer } from "../utils/PhysicsContainer";
import { Keyboard } from "../utils/Keyboard";

export class Player extends PhysicsContainer {

    private static readonly GRAVITY = 600;
    private static readonly MOVE_SPEED = 350;
    private static readonly SCALE = 1.5;

    public canJump = true;


    private robotAnimated: AnimatedSprite;

   // private hitbox

    constructor() {
        super();

        // Animated Sprite
        this.robotAnimated = new AnimatedSprite(
            [
                Texture.from("RobotWalk0"),
                Texture.from("RobotWalk1"),
                Texture.from("RobotWalk2"),
                Texture.from("RobotWalk3"),
                Texture.from("RobotWalk4"),
                Texture.from("RobotWalk5"),
                Texture.from("RobotWalk6"),
                Texture.from("RobotWalk7")
            ],
            false
        );
        this.robotAnimated.play();
        this.robotAnimated.animationSpeed = 0.2;
        this.robotAnimated.scale.set(Player.SCALE);
        this.robotAnimated.anchor.set(0.5, 1);

        const auxZero = new Graphics();
        auxZero.beginFill(0xFF00FF);
        auxZero.drawCircle(0, 0, 10);
        auxZero.endFill();

        this.addChild(this.robotAnimated);
        this.addChild(auxZero);

        this.acceleration.y = Player.GRAVITY;

        Keyboard.down.on("ArrowUp", this.jump, this)

    }

    // la contraparte de agregar eventos al teclado, debemos apagarlos
    public override destroy(options: any){
        super.destroy(options);
        Keyboard.down.off("ArrowUp",this.jump)
    }

    public override update(deltaMS: number) {
        super.update(deltaMS / 1000);
        this.robotAnimated.update(deltaMS / (1000 / 60))

        if (Keyboard.state.get("ArrowRight")) {
            this.speed.x = Player.MOVE_SPEED;
            this.robotAnimated.scale.x = Player.SCALE
        } else if (Keyboard.state.get("ArrowLeft")) {
            this.speed.x = -Player.MOVE_SPEED;
            this.robotAnimated.scale.x = -Player.SCALE;
        } else {
            this.speed.x = 0;
        }

        // if (Keyboard.state.get("ArrowUp")) {
        //     this.jump();
        // }
    }


    private jump() {
        if (this.canJump) {
            this.canJump = false;
            this.speed.y = -600;
        }
    }


}