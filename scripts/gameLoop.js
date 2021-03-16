(function(game) {

	ctx = game.canvas.getContext('2d');
	timerDisplay = document.getElementById('timerDisplay');
	stepCounter = document.getElementById('stepCounter')

	let backgroundImage = new Image();
	backgroundImage.isReady = false;
	backgroundImage.onload = function() {
	    this.isReady = true;
	};
	backgroundImage.src = 'images/blue-nebula.jpg';


	function processInput(elapsedTime) {
		game.keyboard.update(elapsedTime);
	}


	function update(elapsedTime) {
		game.timer += elapsedTime / 1000;
		if (game.character.mazePosition.row == game.endCell.row && game.character.mazePosition.col == game.endCell.col) {
			game.addScore({
				mazeSize: {
					rows: game.mazeSize,
					cols: game.mazeSize
				},
				time: game.timer,
				extraSteps: game.numberOfSteps - game.minSteps
			});

			game.running = false;

			retryButton = document.getElementById('retryButton');
			retryButton.setAttribute('style', 'display: block');

			gameToHighScoresButton = document.getElementById('gameToHighScoresButton');
			gameToHighScoresButton.setAttribute('style', 'display: block');

			gameHomeButton = document.getElementById('gameHomeButton');
			gameHomeButton.innerHTML = 'Home';
		}
	}


	function render(elapsedTime) {
		timerDisplay.innerHTML = 'Timer: ' + game.timer.toFixed(2);
		stepCounter.innerHTML = 'Steps: ' + game.numberOfSteps + ' (min ' + game.minSteps + ')';

		ctx.clearRect(0, 0, game.canvas.width, game.canvas.height);
		if (backgroundImage.isReady) {
			ctx.drawImage(backgroundImage, 0, 0, game.canvas.width, game.canvas.height);
		}

		ctx.fillStyle = 'red';
		ctx.beginPath();
		ctx.rect(game.startCell.col * game.spaceSize, game.startCell.row * game.spaceSize, game.spaceSize, game.spaceSize);
		ctx.closePath();
		ctx.fill();

		ctx.fillStyle = 'green';
		ctx.beginPath();
		ctx.rect(game.endCell.col * game.spaceSize, game.endCell.row * game.spaceSize, game.spaceSize, game.spaceSize);
		ctx.closePath();
		ctx.fill();

		if (game.showBreadcrumbs) {
			game.renderBreadcrumbs();
		}

		if (game.showSolutionPath) {
			game.renderSolutionPath();
		} else if (game.showHint) {
			game.renderHint();
		}

		game.character.render();

		game.renderMaze();

		if (!game.running) {
			let message = 'SUCCESS!';
			ctx.font = '82px Lucida Console';
			let xpos = (game.canvas.width - ctx.measureText(message).width) / 2;
			let ypos = (game.canvas.height + ctx.measureText('M').width) / 2;
			ctx.fillStyle = 'rgb(200, 200, 200)';
			ctx.strokeStyle = 'black';
			ctx.fillText(message, xpos, ypos);
			ctx.strokeText(message, xpos, ypos);
		}
	}


	game.gameLoop = function(curTime) {
		elapsedTime = curTime - game.previousTime;
		game.previousTime = curTime;
		// console.log(Math.floor(game.timer));				// Negative elapsed time???

		processInput(elapsedTime);
		update(elapsedTime);
		render(elapsedTime);

		if (game.running) {
			requestAnimationFrame(game.gameLoop);
		}
	}

	}(MazeGame.game));