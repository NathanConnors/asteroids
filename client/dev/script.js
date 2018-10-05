/* Event Handlers */
const main = new Main();
(_ => {
	$(document).on('click', '#gameTitle', function () {
		main.canvas.stopClickingMe();
	})
})();