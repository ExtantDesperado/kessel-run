(function(game) {

	game.findBestPath = function(curCell) {
		let prevCell = { row: -1, col: -1 };
		if (game.solutionPath.length > 0) {
			prevCell = game.solutionPath[game.solutionPath.length - 1];
		}

		game.solutionPath.push({ row: curCell.row, col: curCell.col });

		if (curCell.row == game.startCell.row && curCell.col == game.startCell.col) {
			return true;
		}

		if (game.maze[curCell.row][curCell.col].paths.n && (curCell.row - 1 != prevCell.row || curCell.col != prevCell.col)) {
			if (game.findBestPath({ row: curCell.row - 1, col: curCell.col })) {
				return true;
			}
		}

		if (game.maze[curCell.row][curCell.col].paths.s && (curCell.row + 1 != prevCell.row || curCell.col != prevCell.col)) {
			if (game.findBestPath({ row: curCell.row + 1, col: curCell.col })) {
				return true;
			}
		}

		if (game.maze[curCell.row][curCell.col].paths.e && (curCell.row != prevCell.row || curCell.col + 1 != prevCell.col)) {
			if (game.findBestPath({ row: curCell.row, col: curCell.col + 1 })) {
				return true;
			}
		}

		if (game.maze[curCell.row][curCell.col].paths.w && (curCell.row != prevCell.row || curCell.col - 1 != prevCell.col)) {
			if (game.findBestPath({ row: curCell.row, col: curCell.col - 1 })) {
				return true;
			}
		}

		game.solutionPath.pop();
		return false;
	}


	game.editSolutionPath = function(cell) {
		if (game.solutionPath.length > 1 && game.solutionPath[game.solutionPath.length - 2].row == cell.row && game.solutionPath[game.solutionPath.length - 2].col == cell.col) {
			game.solutionPath.pop();
		} else {
			game.solutionPath.push({ row: cell.row, col: cell.col });
		}
	}


	game.renderSolutionPath = function() {
		ctx.fillStyle = 'yellow';
		ctx.beginPath();

		for (let i = 0; i < game.solutionPath.length; i++) {
			ctx.rect(game.spaceSize * (game.solutionPath[i].col + 2 / 5), game.spaceSize * (game.solutionPath[i].row + 2 / 5), game.spaceSize / 5, game.spaceSize / 5);
		}

		ctx.closePath();
		ctx.fill();
	}


	game.renderHint = function() {
		if (game.solutionPath.length > 1) {
			ctx.fillStyle = 'orange';
			ctx.beginPath();

			ctx.rect(game.spaceSize * (game.solutionPath[game.solutionPath.length - 2].col + 2 / 5), game.spaceSize * (game.solutionPath[game.solutionPath.length - 2].row + 2 / 5), game.spaceSize / 5, game.spaceSize / 5);

			ctx.closePath();
			ctx.fill();
		}
	}


	game.keyboard.registerCommand('p', () => {
		game.showSolutionPath = !game.showSolutionPath;
		game.showHint = false;
	});
	game.keyboard.registerCommand('h', () => {
		game.showHint = !game.showHint;
		game.showSolutionPath = false;
	});
})(MazeGame.game);