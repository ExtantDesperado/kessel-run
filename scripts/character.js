(function(game) {

	let characterImage = new Image();
	characterImage.isReady = false;
	characterImage.onload = function() {
	    this.isReady = true;
	};
	characterImage.src = 'images/falcon.png';

	game.character = (function() {
		that = {};

		that.orientation = 's';

		that.moveRight = function(elapsedTime) {
			if (game.maze[that.mazePosition.row][that.mazePosition.col].paths.e) {
				that.mazePosition.col += 1;
				that.topLeft.x = (that.mazePosition.col + 1 / 10) * game.spaceSize;
				that.orientation = 'e';
				game.editSolutionPath(that.mazePosition);
				that.breadcrumbs[that.mazePosition.row][that.mazePosition.col] = true;
				game.numberOfSteps++;
			}
		}

		that.moveLeft = function(elapsedTime) {
			if (game.maze[that.mazePosition.row][that.mazePosition.col].paths.w) {
				that.mazePosition.col -= 1;
				that.topLeft.x = (that.mazePosition.col + 1 / 10) * game.spaceSize;
				that.orientation = 'w';
				game.editSolutionPath(that.mazePosition);
				that.breadcrumbs[that.mazePosition.row][that.mazePosition.col] = true;
				game.numberOfSteps++;
			}
		}

		that.moveUp = function(elapsedTime) {
			if (game.maze[that.mazePosition.row][that.mazePosition.col].paths.n) {
				that.mazePosition.row -= 1;
				that.topLeft.y = (that.mazePosition.row + 1 / 10) * game.spaceSize;
				that.orientation = 'n';
				game.editSolutionPath(that.mazePosition);
				that.breadcrumbs[that.mazePosition.row][that.mazePosition.col] = true;
				game.numberOfSteps++;
			}
		}

		that.moveDown = function(elapsedTime) {
			if (game.maze[that.mazePosition.row][that.mazePosition.col].paths.s) {
				that.mazePosition.row += 1;
				that.topLeft.y = (that.mazePosition.row + 1 / 10) * game.spaceSize;
				that.orientation = 's';
				game.editSolutionPath(that.mazePosition);
				that.breadcrumbs[that.mazePosition.row][that.mazePosition.col] = true;
				game.numberOfSteps++;
			}
		}

		that.setInitialPosition = function(cell) {
			that.mazePosition = {};
			that.mazePosition.row = cell.row;
			that.mazePosition.col = cell.col;
			that.topLeft = {};
			that.topLeft.x = (that.mazePosition.col + 1 / 10) * game.spaceSize;
			that.topLeft.y = (that.mazePosition.row + 1 / 10) * game.spaceSize;
			that.width = game.spaceSize * 4 / 5;
			that.height = game.spaceSize * 4 / 5;
			that.orientation = 's';
			that.breadcrumbs = [];
			for (let row = 0; row < game.mazeSize; row++) {
				that.breadcrumbs.push([]);
				for (let col = 0; col < game.mazeSize; col++) {
					that.breadcrumbs[row].push(false);
				}
			}
			that.breadcrumbs[that.mazePosition.row][that.mazePosition.col] = true;
		}

		that.render = function() {
			ctx.save();

			if (characterImage.isReady) {
				ctx.translate(that.topLeft.x + that.width / 2, that.topLeft.y + that.height / 2);
				if (that.orientation == 'e') {
					ctx.rotate(Math.PI / 2);
				} else if (that.orientation == 'w') {
					ctx.rotate(-Math.PI / 2);
				} else if (that.orientation == 's') {
					ctx.rotate(Math.PI);
				}
				ctx.translate(-(that.topLeft.x + that.width / 2), -(that.topLeft.y + that.height / 2));
				ctx.drawImage(characterImage, that.topLeft.x, that.topLeft.y, that.width, that.height);
			}

			ctx.restore();
		}

		return that;
	}());

	game.renderBreadcrumbs = function() {
		ctx.fillStyle = 'purple';
		ctx.beginPath();

		for (let row = 0; row < game.mazeSize; row++) {
			for (let col = 0; col < game.mazeSize; col++) {
				if (game.character.breadcrumbs[row][col]) {
					ctx.rect(game.spaceSize * (col + 2 / 5), game.spaceSize * (row + 2 / 5), game.spaceSize / 5, game.spaceSize / 5);
				}
			}
		}

		ctx.closePath();
		ctx.fill();
	}

	game.keyboard.registerCommand('ArrowRight', game.character.moveRight);
	game.keyboard.registerCommand('ArrowLeft', game.character.moveLeft);
	game.keyboard.registerCommand('ArrowUp', game.character.moveUp);
	game.keyboard.registerCommand('ArrowDown', game.character.moveDown);

	game.keyboard.registerCommand('d', game.character.moveRight);
	game.keyboard.registerCommand('a', game.character.moveLeft);
	game.keyboard.registerCommand('w', game.character.moveUp);
	game.keyboard.registerCommand('s', game.character.moveDown);

	game.keyboard.registerCommand('l', game.character.moveRight);
	game.keyboard.registerCommand('j', game.character.moveLeft);
	game.keyboard.registerCommand('i', game.character.moveUp);
	game.keyboard.registerCommand('k', game.character.moveDown);

	game.keyboard.registerCommand('b', () => { game.showBreadcrumbs = !game.showBreadcrumbs; });
})(MazeGame.game);