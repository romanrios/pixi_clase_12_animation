import { ResolverManifest } from "pixi.js";

export const manifest: ResolverManifest = {
    bundles: [
        {
            name: "mainScene",
            assets:
            {
                SciFiBackground: "./scifibackground.jpg",
                Platform: "./platform.png",
                robot: "./robot.json",
                LogoPixi: "./logopixi.svg",
                Panel: "./panel3.png",
                Next: "./next.svg",
                Gear: "./gear.png",
                Particle: "./particle.png",
                CartoonSmoke: "./cartoonSmoke.png"
                //Montserrat: "./Montserrat-ExtraBold.ttf",
                //Square: "./Square.ttf",
                //Glow: "./glow.png",
                //ThreeLines: "./3lines.svg",
                //Retry: "./retry.svg",
                //Fullscreen: "./fullscreen.svg",
            }
        }
    ]
}