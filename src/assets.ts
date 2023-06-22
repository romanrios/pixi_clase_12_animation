import type { ResolverManifest } from "pixi.js";

export const manifest: ResolverManifest = {
    bundles: [
        {
            name : "assets1",
            assets:
            {
                Hat: "./hat.png",
                Mushroom_eyeless: "./mushroom_eyeless.png",
                Mushroom_eyes: "./mushroom_eyes.png",
                Pipe: "./pipe.png",
                RobotWalk0: "./character_robot_walk0.png",
                RobotWalk1: "./character_robot_walk1.png",
                RobotWalk2: "./character_robot_walk2.png",
                RobotWalk3: "./character_robot_walk3.png",
                RobotWalk4: "./character_robot_walk4.png",
                RobotWalk5: "./character_robot_walk5.png",
                RobotWalk6: "./character_robot_walk6.png",
                RobotWalk7: "./character_robot_walk7.png",
            }
        },
        {
            name: "assets2",
            assets:
            {
                Panel: "./panel3.png",
                Square: "./Square.ttf",
                Glow: "./glow.png",
                Star: "./star.svg",
                ThreeLines: "./3lines.svg",
                Next: "./next.svg",
                Retry: "./retry.svg",
                Fullscreen: "./fullscreen.svg",
                GreenButtonDefault: "./green_button_default.png",
                GreenButtonOver: "./green_button_over.png",
                GreenButtonDown: "./green_button_down.png"
            }
        },
    ]
}