let servicesList = require('./../data/servicesList').services;

module.exports = (app) => {
	servicesList.forEach( function(service, index) {
		app.get('/servicos/'+  service.href.substring(10, service.href.length), (req, res) => {
			res.end(service.name)
		});
	});
}