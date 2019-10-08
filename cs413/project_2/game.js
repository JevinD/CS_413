
//########################SPOILER ALERT###############################
//THE TRICK IS TO CLICK AND UNCLICK ON THE SPRITE TO ERASE PRIOR MESSAGE WITH MY FUNCTION onUP
count = 0;
const app = new PIXI.Application({ backgroundColor: 0xFFFFFF });
document.body.appendChild(app.view);
const gameOverText = new PIXI.Text('GAME OVER');
const credits = new PIXI.Text('Created By Jevin');
const restart = PIXI.Sprite.from('restart icon.png');
const sprite = PIXI.Sprite.from('IMG.png');
const q1 = PIXI.Sprite.from('q1.png');
const q2 = PIXI.Sprite.from('q2.png');
const q3 = PIXI.Sprite.from('q3.png');
const q4 = PIXI.Sprite.from('q4.png');
const q5 = PIXI.Sprite.from('q5.png');
const title = PIXI.Sprite.from('Title Screen.png');
PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.NEAREST;

function populateGame(app)
{
	//index for question pulling
	i = 0;
	//my list of questions
	questions = [q1,q2,q3,q4,q5];
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
	sprite.on('pointerup',onUp);
	app.stage.addChild(sprite);

	//hold Click to get rid of the questions (puzzling Part)
	function onUp()
	{
		app.stage.removeChild(questions[i]);
	}
	//on click function for sprites in game
	function onClick()
	{
		//random numbers to pull for questions list
		i = Math.floor((Math.random() * 5));
		//counter to reach end game
		count+=1;
		rng1 = Math.floor((Math.random() * 350) + 50);
		rng2 = Math.floor((Math.random() * 350) + 50);
		sprite.position.x = rng1;
		sprite.position.y = rng2;
		//pull a question from the list
		questions[i].anchor.set(0.5);
		questions[i].scale.set(1,1);
		questions[i].x = app.screen.width / 2;
		questions[i].y = app.screen.height / 2;
		app.stage.addChild(questions[i]);

		//GAME OVER COUNTER
		if(count >= 10)
		{
			//set the credits coordinates
			credits.x = app.screen.width / 2;
			credits.y = app.screen.height / 3;
			//set the gameOver Text coordinates
			gameOverText.x = app.screen.width / 2;
			gameOverText.y = app.screen.height / 4;
			//remove the sprite and basic text for points
			app.stage.removeChild(sprite);
			app.stage.removeChild(questions[i]);
			//add the gameover text and credits
			app.stage.addChild(gameOverText);
			app.stage.addChild(credits);
			count = 0;
			//also add the start icon with coordinates and cursor options
			restart.anchor.set(0.5);
			restart.scale.set(.1,.1);
			restart.x = app.screen.width / 2;
			restart.y = app.screen.height / 1.5;
			restart.interactive = true;
			// Shows hand cursor
			restart.buttonMode = true;
			app.stage.addChild(restart);
			restart.on('pointerdown', onClick1);
		}
	}
}
//onclikc function for restart icon
function onClick1()
{
	count = 0;
	app.stage.removeChild(gameOverText);
	app.stage.removeChild(restart);
	app.stage.removeChild(credits);
	populateGame(app);
}
//MENU TITLE
function populateMenu(app)
{
	// Set the initial position
	title.anchor.set(0.5);
	title.scale.set(1,1);
	title.x = app.screen.width / 2;
	title.y = app.screen.height / 2;

	// Opt-in to interactivity
	title.interactive = true;
	// Shows hand cursor
	title.buttonMode = true;
	// Pointers normalize touch and mouse
	title.on('pointerdown', onClick2);
	app.stage.addChild(title);

	//function for starting the game
	function onClick2()
	{
		app.stage.removeChild(title);
		populateGame(app);
	}
}
populateMenu(app);
