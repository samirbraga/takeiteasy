const servicesList = require('./../data/servicesList');
const homeTexts = require('./../texts/home');

module.exports = (app) => {
	return {
		index: (req, res) => {
			res.render('home/index', {
				services: servicesList,
				texts: homeTexts
			});
		}
	}
}