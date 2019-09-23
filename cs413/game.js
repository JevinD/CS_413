const app = new PIXI.Application({ backgroundColor: 0xFFFFFF });
document.body.appendChild(app.view);

// Scale mode for all textures, will retain pixelation
PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.NEAREST;

const sprite = PIXI.Sprite.from('IMG.png');

// Set the initial position
sprite.anchor.set(0.5);
sprite.scale.set(4,4);
sprite.x = app.screen.width / 2;
sprite.y = app.screen.height / 2;
timer = app.ticker;
app.stage.ticker;
// Opt-in to interactivity
sprite.interactive = true;
// Shows hand cursor
sprite.buttonMode = true;



// Pointers normalize touch and mouse
sprite.on('pointerdown', onClick);
app.stage.addChild(sprite);
flag = false;
count = 0;
const basicText = new PIXI.Text('Points:' + count);
basicText.x = 50;
basicText.y = 50;
app.stage.addChild(basicText);
function onClick() {
		count+=1;
		rng1 = Math.floor((Math.random() * 350) + 50);
		rng2 = Math.floor((Math.random() * 350) + 50);

		if(flag == false)
		{
			sprite.position.x = rng1;
			sprite.position.y = rng2;
			flag = true;
		}
		else
		{
			sprite.position.x = rng1;
			sprite.position.y = rng2;
			flag = false;
		}
    sprite.scale.x *= .9;
    sprite.scale.y *= .9;
		basicText.text = 'Points: '+count;
		if(count == 40)
		{
			const gameOverText = new PIXI.Text('GAME OVER');
			gameOverText.x = app.screen.width / 2;
			gameOverText.y = app.screen.height / 2;
			app.stage.addChild(gameOverText);
			app.stage.removeChild(sprite);
		}

}
