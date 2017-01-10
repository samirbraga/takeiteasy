let homeData = require('./../data/servicesList');
let services = homeData.services;


module.exports = (app) => {
	return {
		index: (req, res) => {
			res.render('home/index', {
				services: services
			});
		}
	}
}