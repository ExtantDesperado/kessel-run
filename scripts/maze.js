(function(game) {

	function divide(row, col, width, height) {
		if (width == 1 || height == 1) {
			return;
		}

		let divHorizontal = Math.random() < 0.5 ? true : false;
		if (width > height) {
			divHorizontal = false;
		}
		else if (height > width) {
			divHorizontal = true;
		}

		if (divHorizontal) {
			// let midRow = row + Math.floor(height / 2);
			let midRow = row + 1 + Math.floor(Math.random() * (height - 1));
			let openCol = Math.floor(Math.random() * width) + col;
			for (let j = col; j < col + width; j++) {
				if (j != openCol) {
					game.maze[midRow - 1][j].paths.s = false;
					game.maze[midRow][j].paths.n = false;
				}
			}
			// divide(row, col, width, Math.floor(height / 2));
			// divide(row + Math.floor(height / 2), col, width, Math.ceil(height / 2));
			divide(row, col, width, midRow - row);
			divide(midRow, col, width, height - midRow + row);
		}
		else {
			// let midCol = col + Math.floor(width / 2);
			let midCol = col + 1 + Math.floor(Math.random() * (width - 1));
			let openRow = Math.floor(Math.random() * height) + row;
			for (let i = row; i < row + height; i++) {
				if (i != openRow) {
					game.maze[i][midCol - 1].paths.e = false;
					game.maze[i][midCol].paths.w = false;
				}
			}
			divide(row, col, midCol - col, height);
			divide(row, midCol, width - midCol + col, height);
		}
	}


	game.generateMaze = function() {
		game.maze = [];
		for (let i = 0; i < game.mazeSize; i++) {
			game.maze[i] = [];
			for (let j = 0; j < game.mazeSize; j++) {
				game.maze[i][j] = {
					paths: {
						n: i == 0 ? false : true,
						s: i == game.mazeSize - 1 ? false : true,
						e: j == game.mazeSize - 1 ? false : true,
						w: j == 0 ? false : true
					}
				};
			}
		}

		divide(0, 0, game.mazeSize, game.mazeSize);

		game.startCell = { row: 0, col: Math.floor(Math.random() * game.mazeSize) }
		game.endCell = { row: game.mazeSize - 1, col: Math.floor(Math.random() * game.mazeSize) }
	}


	game.renderMaze = function() {
		edgeLength = canvas.width / game.mazeSize;
		ctx.save();
		ctx.beginPath();
		ctx.moveTo(0, 0);
		ctx.lineTo(canvas.width, 0);
		ctx.moveTo(0, 0);
		ctx.lineTo(0, canvas.height);

		for (let i = 0; i < game.mazeSize; i++) {
			for (let j = 0; j < game.mazeSize; j++) {
				if (!game.maze[i][j].paths.e) {
					ctx.moveTo((j + 1) * edgeLength, i * edgeLength);
					ctx.lineTo((j + 1) * edgeLength, (i + 1) * edgeLength);
				}
				if (!game.maze[i][j].paths.s) {
					ctx.moveTo(j * edgeLength, (i + 1) * edgeLength);
					ctx.lineTo((j + 1) * edgeLength, (i + 1) * edgeLength);
				}
			}
		}

		ctx.lineWidth = 3;
		ctx.lineCap = 'round';
		ctx.strokeStyle = 'white';
		ctx.stroke();
		ctx.restore();
	}
})(MazeGame.game);