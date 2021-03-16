(function(game) {

	MazeGame.changeScreen = function(newScreen) {
		let active = document.getElementsByClassName('active');
		for (let screen = 0; screen < active.length; screen++) {
			if(active[screen].id === "gameScreen") {
				game.running = false;
			}
			active[screen].classList.remove('active');
		}
		MazeGame.screens[newScreen].run();
		document.getElementById(newScreen).classList.add('active');
	}


	MazeGame.screens.homeScreen = (function() {

		function initialize() {
			newGameButton = document.getElementById('newGameButton');
			newGameButton.onclick = function() {
				MazeGame.changeScreen('mazeSizeScreen');
			};

			highScoresButton = document.getElementById('highScoresButton');
			highScoresButton.onclick = function() {
				MazeGame.changeScreen('highScoresScreen');
			};

			aboutButton = document.getElementById('aboutButton');
			aboutButton.onclick = function() {
				MazeGame.changeScreen('aboutScreen');
			};
		}

		function run() {

		}

		return {
			initialize: initialize,
			run: run
		};
	})();


	MazeGame.screens.highScoresScreen = (function() {

		function changeTab(newTab) {
			let currentTab = document.getElementsByClassName('currentTab');
			for (let tab = 0; tab < currentTab.length; tab++) {
				currentTab[tab].classList.remove('currentTab');
			}
			newTab.classList.add('currentTab');
		}

		function initialize() {
			scores5x5Button = document.getElementById('scores5x5Button');
			scores5x5Button.onclick = function() {
				game.updateHighScoresHTML(5, 5);
				changeTab(this);
			}

			scores10x10Button = document.getElementById('scores10x10Button');
			scores10x10Button.onclick = function() {
				game.updateHighScoresHTML(10, 10);
				changeTab(this);
			}

			scores15x15Button = document.getElementById('scores15x15Button');
			scores15x15Button.onclick = function() {
				game.updateHighScoresHTML(15, 15);
				changeTab(this);
			}

			scores20x20Button = document.getElementById('scores20x20Button');
			scores20x20Button.onclick = function() {
				game.updateHighScoresHTML(20, 20);
				changeTab(this);
			}
		}

		function run() {
			game.updateHighScoresHTML(5, 5);
			changeTab(document.getElementById('scores5x5Button'))
		}

		return {
			initialize: initialize,
			run: run
		};
	})();


	MazeGame.screens.aboutScreen = (function() {

		function initialize() {
			
		}

		function run() {

		}

		return {
			initialize: initialize,
			run: run
		};
	})();


	MazeGame.screens.mazeSizeScreen = (function() {

		function initialize() {
			button1 = document.getElementById('5x5Button');
			button1.onclick = function() {
				game.mazeSize = 5;
				MazeGame.changeScreen('gameScreen');
			};

			button2 = document.getElementById('10x10Button');
			button2.onclick = function() {
				game.mazeSize = 10;
				MazeGame.changeScreen('gameScreen');
			};

			button3 = document.getElementById('15x15Button');
			button3.onclick = function() {
				game.mazeSize = 15;
				MazeGame.changeScreen('gameScreen');
			};

			button4 = document.getElementById('20x20Button');
			button4.onclick = function() {
				game.mazeSize = 20;
				MazeGame.changeScreen('gameScreen');
			};
		}

		function run() {

		}

		return {
			initialize: initialize,
			run: run
		};
	})();


	MazeGame.screens.gameScreen = (function() {

		function initialize() {
			retryButton = document.getElementById('retryButton');
			retryButton.onclick = function() {
				MazeGame.changeScreen('gameScreen');
			};

			gameToHighScoresButton = document.getElementById('gameToHighScoresButton');
			gameToHighScoresButton.onclick = function() {
				MazeGame.changeScreen('highScoresScreen');
			};
		}

		function run() {
			retryButton = document.getElementById('retryButton');
			retryButton.setAttribute('style', 'display: none');

			gameToHighScoresButton = document.getElementById('gameToHighScoresButton');
			gameToHighScoresButton.setAttribute('style', 'display: none');

			gameHomeButton = document.getElementById('gameHomeButton');
			gameHomeButton.innerHTML = 'Quit';

			game.spaceSize = game.canvas.width / game.mazeSize;
			game.generateMaze();

			game.character.setInitialPosition(game.startCell);

			game.solutionPath = [];
			game.findBestPath(game.endCell);
			game.minSteps = game.solutionPath.length - 1;

			game.showSolutionPath = false;
			game.showHint = false;
			game.showBreadcrumbs = false;

			game.running = true;
			game.timer = 0;
			game.numberOfSteps = 0;
			game.previousTime = performance.now();
			requestAnimationFrame(game.gameLoop);
		}

		return {
			initialize: initialize,
			run: run
		};
	})();



	let homeButtons = document.getElementsByClassName('homeButton');
	for (let button = 0; button < homeButtons.length; button++) {
		homeButtons[button].onclick = function() {
			MazeGame.changeScreen('homeScreen');
		}
	}

	for (screen in MazeGame.screens) {
		if (MazeGame.screens.hasOwnProperty(screen)) {
			MazeGame.screens[screen].initialize();
		}
	}

})(MazeGame.game);