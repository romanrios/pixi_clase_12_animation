import { Application, Assets, Container, Sprite } from 'pixi.js'

const app = new Application({
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

	const canvas = app.view as HTMLCanvasElement; // added for Pixi v7

	canvas.style.width = gameWidth + "px";
	canvas.style.height = gameHeight + "px";

	canvas.style.marginLeft = marginHorizontal + "px";
	canvas.style.marginRight = marginHorizontal + "px";

	canvas.style.marginTop = marginVertical + "px";
	canvas.style.marginBottom = marginVertical + "px";
});
window.dispatchEvent(new Event("resize"));


Assets.add("Hat", "./hat.png");
Assets.add("Mushroom_eyeless", "./mushroom_eyeless.png");
Assets.add("Mushroom_eyes", "./mushroom_eyes.png");

Assets.load(["Hat", "Mushroom_eyeless", "Mushroom_eyes"]).then(() => {

	const mushroom: Sprite = Sprite.from("Mushroom_eyeless");
	mushroom.anchor.set(0.5);
	mushroom.scale.set(0.9,0.9);
	app.stage.addChild(mushroom);

	const eyes: Sprite = Sprite.from("Mushroom_eyes");
	eyes.anchor.set(0.5);
	eyes.scale.set(0.9,0.9);
	eyes.y = 60;
	app.stage.addChild(eyes);

	const hat: Sprite = Sprite.from("Hat");
	hat.anchor.set(0.5);
	hat.y = -130;
	app.stage.addChild(hat);

	const mushroomContainer : Container = new Container();

	mushroomContainer.addChild(mushroom);
	mushroomContainer.addChild(hat);	
	mushroomContainer.addChild(eyes);	
	mushroomContainer.x = app.screen.width / 2;
	mushroomContainer.y = app.screen.height / 2;
	app.stage.addChild(mushroomContainer);


	let speed = 0.5
	app.ticker.add(() => {
		mushroomContainer.angle -= 0.2 ;
		eyes.x += speed;
		if (eyes.x < -10 || eyes.x > 10){
			speed = -speed
		}
		hat.angle += speed;
	});

});