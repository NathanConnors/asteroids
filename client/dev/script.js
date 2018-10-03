/* Event Handlers */
const main = new Main();
(_ => {
	$(document).on('click', '#login-btn', function () {
		main.controller.grabData();
	})
})();