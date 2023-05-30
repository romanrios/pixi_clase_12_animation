import { Application, Assets, Sprite } from 'pixi.js'

const app = new Application({
	view: document.getElementById("pixi-canvas") as HTMLCanvasElement,
	resolution: window.devicePixelRatio || 1,
	autoDensity: true,
	backgroundColor: '#54C3FF',
	width: 640,
	height: 480
});


Assets.add("Clampy", "./clampy.png");
Assets.add("Mushroom", "./mushroom.png");

Assets.load(["Clampy", "Mushroom"]).then(() => {

	const mushroom: Sprite = Sprite.from("Mushroom");
	console.log("Hola mundo!", mushroom.width, mushroom.height);
	mushroom.anchor.set(0.5);
	mushroom.x = app.screen.width/2;
	mushroom.y = app.screen.height/2;
	app.stage.addChild(mushroom);

});


