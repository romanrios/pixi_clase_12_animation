import { Container } from "pixi.js";
import { IScene } from "../utils/IScene";
import { SongButton } from "../UI/SongButton";
import { Manager } from "../utils/Manager";
import { SongGame_Puzzle } from "./SongGame_Puzzle";
import { GameScene } from "./GameScene";

export class SongGame_LevelSelector extends Container implements IScene {

    private buttons: SongButton[];
    private button0: SongButton;

    constructor() {
        super();

        this.button0 = new SongButton("Regresar al inicio", 500);
        this.button0.position.set(Manager.width / 2, 130);
        this.button0.onpointerup = () => {
            Manager.changeScene(new GameScene());
        };
        this.addChild(this.button0);


        this.buttons = [];

        const buttonData = generateButtonData(40); // Genera los datos para 40 botones

        const buttonWidth = 110;
        const buttonHeight = 110;
        const buttonSpacingX = 130;
        const buttonSpacingY = 130;

        const startX = (buttonSpacingX * 3 - buttonWidth) / 2 /*agregado ->*/ - 35; // Calcula la posición inicial en x para centrar el grupo de botones
        
        let currentX = startX;
        let currentY = 270;

        buttonData.forEach((data, index) => {
            const button = new SongButton(data.text, buttonWidth);
            this.addChild(button);
            button.width = buttonWidth;
            button.height = buttonHeight;
            button.position.set(currentX, currentY);
            button.on("pointertap", () =>
                Manager.changeScene(new SongGame_Puzzle(data.image, data.level))
            );
            this.buttons.push(button);

            currentX += buttonSpacingX;

            if ((index + 1) % 5 === 0) {
                currentX = startX;
                currentY += buttonSpacingY;
            }
        });
    }

    update(_deltaTime: number, _deltaFrame: number): void {
        // update
    }

}

function generateButtonData(count: number): { text: string; image: string; level: number }[] {
    const buttonData = [];
    for (let i = 0; i < count; i++) {
        const text = (i + 1).toString();
        const image = `ImgSong${i+1}`;
        const level = 3;
        buttonData.push({ text, image, level });
    }
    return buttonData;
}
