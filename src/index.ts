import { Application, Assets } from 'pixi.js'
import { assets } from './assets';
import { Scene } from './Scene';

export const app = new Application({
	view: document.getElementById("pixi-canvas") as HTMLCanvasElement,
	resolution: window.devicePixelRatio || 1,
	autoDensity: true,
	backgroundColor: '#54C3FF',
	width: 1280,
	height: 720
});

window.addEventListener("resize", () => {
	const scaleX = window.innerWidth / app.screen.width;
	const scaleY = window.innerHeight / app.screen.height;
	const scale = Math.min(scaleX, scaleY);

	const gameWidth = Math.round(app.screen.width * scale);
	const gameHeight = Math.round(app.screen.height * scale);

	const marginHorizontal = Math.floor((window.innerWidth - gameWidth) / 2);
	const marginVertical = Math.floor((window.innerHeight - gameHeight) / 2);

	const appview = app.view as HTMLCanvasElement; // added for Pixi v7

	appview.style.width = gameWidth + "px";
	appview.style.height = gameHeight + "px";
	appview.style.marginLeft = marginHorizontal + "px";
	appview.style.marginRight = marginHorizontal + "px";
	appview.style.marginTop = marginVertical + "px";
	appview.style.marginBottom = marginVertical + "px";
});

window.dispatchEvent(new Event("resize"));

Assets.addBundle("myAssets", assets);
Assets.loadBundle(["myAssets"]).then(() => {

	const myScene = new Scene();
	app.stage.addChild(myScene);

});


