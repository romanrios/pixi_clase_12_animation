import { Container, Text } from "pixi.js";
import { IScene } from "../utils/IScene";
import { Button } from "../UI/Button";
import { Manager } from "../utils/Manager";
import { filters as soundFilters, sound } from "@pixi/sound";
import { SongButton } from "../UI/SongButton";

export class Clase_9_SoundScene extends Container implements IScene {
    private button: Button;
    private buttonMute: SongButton;
    private volumeUp: SongButton;
    private volumeDown: SongButton;
    private text: Text;
    private muted: boolean = false;

    constructor() {
        super();


        // const sndPip = sound.find("Pip");
        // const instPip = sndPip.play() as IMediaInstance;
        // instPip.volume = 0.1;

        this.button = new Button(0x00C18C, "Next");
        this.button.x = Manager.width / 2;
        this.button.y = 350
        this.addChild(this.button);
        this.button.on("pointerup", () => {
            sound.play("Pip", {
                loop: true,
                singleInstance: true,
                filters: [new soundFilters.TelephoneFilter()]
            })
        })

        this.text = new Text("Volumen actual: 1", { fontSize: 40 });
        this.text.anchor.x = 0.5;
        this.text.position.set(Manager.width / 2, this.button.y + 100)
        this.addChild(this.text)

        this.buttonMute = new SongButton("Toggle mute", 500)
        this.buttonMute.position.set(Manager.width / 2, this.text.y + 150)
        this.addChild(this.buttonMute);
        this.buttonMute.on("pointerup", () => this.toggleMute())

        this.volumeUp = new SongButton("Volume +", 500)
        this.volumeUp.position.set(Manager.width / 2, this.buttonMute.y + 150)
        this.addChild(this.volumeUp);
        this.volumeUp.on("pointerup", () => {
            sound.volumeAll += 0.1,
                this.text.text = `Volumen: ${sound.volumeAll.toFixed(1)}`
        }
        )

        this.volumeDown = new SongButton("Volume -", 500)
        this.volumeDown.position.set(Manager.width / 2, this.volumeUp.y + 150)
        this.addChild(this.volumeDown);
        this.volumeDown.on("pointerup", () => {
            sound.volumeAll -= 0.1,
                this.text.text = `Volumen: ${sound.volumeAll.toFixed(1)}`
        }
        )


    }

    public toggleMute() {
        if (!this.muted) {
            sound.muteAll();
            this.text.text = "Mute ON";
            this.muted = true;
        } else {
            sound.unmuteAll();
            this.text.text = "Mute OFF"
            this.muted = false;
        }
    }


    update(_deltaTime: number, _deltaFrame: number): void {
        // update
    }

}