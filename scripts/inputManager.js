(function(game) {
	let input = (function() {
		function Keyboard() {
			let that = {
				keys: {},
				handlers: {}
			};

			function keyPress(e) {
				that.keys[e.key] = e.timeStamp;
			}

			function keyRelease(e) {
				delete that.keys[e.key];
				if (that.handlers.hasOwnProperty(e.key)) {
					if (that.handlers[e.key].hasOwnProperty('hasRun')) {
						that.handlers[e.key].hasRun = false;
					}
				}
			}

			window.addEventListener('keydown', keyPress);
			window.addEventListener('keyup', keyRelease);

			that.registerCommand = function(key, handler) {
				that.handlers[key] = {
					run: handler,
					hasRun: false
				};
			}

			that.update = function(elapsedTime) {
				Object.keys(that.keys).forEach(key => {
					if (that.handlers.hasOwnProperty(key)) {
						if (that.handlers[key].hasOwnProperty('hasRun') && !that.handlers[key].hasRun) {
							that.handlers[key].run(elapsedTime);
							that.handlers[key].hasRun = true;
						}
					}
				});
			}

			return that;
		}

		return {
			Keyboard: Keyboard
		};
	})();

	game.keyboard = input.Keyboard()
})(MazeGame.game);