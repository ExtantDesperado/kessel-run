(function(game) {

	highScoresTable = document.getElementById('highScoresTable');

	game.highScores = [];
	previousScores = localStorage.getItem('MazeGame.highScores');

	if (previousScores !== null) {
		game.highScores = JSON.parse(previousScores);
	}

	// score should be an object with mazeSize, time, and extraSteps properties.
	game.addScore = function(score) {
		game.highScores.push(score);
		game.highScores.sort(function(score1, score2) { return score1.time - score2.time });
		localStorage['MazeGame.highScores'] = JSON.stringify(game.highScores);
	}

	function scoreToHTML(score) {
		html = '<tr>';
		html += '<td>' + score.mazeSize.rows + 'x' + score.mazeSize.cols + '</td>';
		html += '<td>' + score.time.toFixed(2) + '</td>';
		html += '<td>' + score.extraSteps + '</td>';
		html += '</tr>';
		return html;
	}

	game.updateHighScoresHTML = function(numRows, numCols) {
		highScoresTable.innerHTML = '<tr><th>Maze Size</th><th>Time (seconds)</th><th>Extra Steps</th></tr>';

		scores = game.highScores.filter(score => score.mazeSize.rows == numRows && score.mazeSize.cols == numCols);

		for (let i = 0; i < 5; i++) {
			if (i < scores.length) {
				highScoresTable.innerHTML += scoreToHTML(scores[i]);
			} else {
				highScoresTable.innerHTML += '<tr><td>-</td><td>-</td><td>-</td></tr>';
			}
		}
	}

})(MazeGame.game);