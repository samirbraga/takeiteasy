module.exports = (app) => {
	let homeCtrl = app.controllers.home;
	app.get('/', homeCtrl.index);
	app.get('/search', homeCtrl.search);
}