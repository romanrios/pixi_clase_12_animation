import { Application, Assets, Container, Graphics, Sprite } from 'pixi.js'

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

	const appview = app.view as HTMLCanvasElement; // added for Pixi v7

	appview.style.width = gameWidth + "px";
	appview.style.height = gameHeight + "px";
	appview.style.marginLeft = marginHorizontal + "px";
	appview.style.marginRight = marginHorizontal + "px";
	appview.style.marginTop = marginVertical + "px";
	appview.style.marginBottom = marginVertical + "px";
});
window.dispatchEvent(new Event("resize"));



//-------ASSETS-------------------------------------------

Assets.add("Hat", "./hat.png");
Assets.add("Mushroom_eyeless", "./mushroom_eyeless.png");
Assets.add("Mushroom_eyes", "./mushroom_eyes.png");
Assets.add("Pipe", "./pipe.png");

Assets.load(["Hat", "Mushroom_eyeless", "Mushroom_eyes", "Pipe"]).then(() => {

	const mushroom: Sprite = Sprite.from("Mushroom_eyeless");
	mushroom.anchor.set(0.5);
	mushroom.scale.set(0.9, 0.9);
	app.stage.addChild(mushroom);

	const eyes: Sprite = Sprite.from("Mushroom_eyes");
	eyes.anchor.set(0.5);
	eyes.scale.set(0.9, 0.9);
	eyes.y = 60;
	app.stage.addChild(eyes);

	const hat: Sprite = Sprite.from("Hat");
	hat.anchor.set(0.5);
	hat.y = -130;
	app.stage.addChild(hat);


	//----GRAPHICS EXAMPLE-----------
	const graphy: Graphics = new Graphics();
	graphy.beginFill(0x8ad2ff);
	graphy.lineStyle(280, 0x6ec7ff);
	graphy.drawCircle(0, 0, 380); 
	graphy.endFill();
	app.stage.addChild(graphy);
	graphy.x = app.screen.width / 2;
	graphy.y = app.screen.height / 2;
	graphy.moveTo(700, 550);


	const mushroomContainer: Container = new Container();
	mushroomContainer.addChild(mushroom);
	mushroomContainer.addChild(hat);
	mushroomContainer.addChild(eyes);
	mushroomContainer.x = app.screen.width / 2;
	mushroomContainer.y = app.screen.height / 2;
	app.stage.addChild(mushroomContainer);

	const pipe: Sprite = Sprite.from("Pipe");
	pipe.scale.set(1.25);
	pipe.angle = 90;
	pipe.x = 300;
	pipe.y = 110;
	app.stage.addChild(pipe);




	//------TICKER-----------------
	let speed = 0.5;
	let speed_b = 5;
	app.ticker.add((delta) => {
		eyes.x += speed * delta;
		if (eyes.x < -10 || eyes.x > 10) {
			speed = -speed;
		}

		hat.angle += speed;

		mushroomContainer.angle -= 0.5 * delta;
		mushroomContainer.x += speed_b * delta;
		if (mushroomContainer.x < 100 || mushroomContainer.x > 1170) {
			speed_b = -speed_b;
		}

		graphy.x += speed * delta; 
	});







});


