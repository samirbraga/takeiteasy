const servicesList = require('./../data/servicesList');
const generalTexts = require('./../texts/general');
const homeTexts = require('./../texts/home');

function sortServices(services) {
	let areas = services.map((service, index) => service.area);
 	areas = Array.from(new Set(areas));
 	let sorted = {};
 	areas.forEach((area, index) => {
 		sorted[area] = services.filter((service) => service.area == area);
 	});
 	return sorted;
}

				var areasNames = {
					design: "Design",
					software: "Software",
					academy: "Acadêmico",
				}
module.exports = (app) => {
	return {
		index: (req, res) => {
			res.render('home/index', {
				services: servicesList,
				sortedServices: sortServices(servicesList),
				texts: Object.assign(generalTexts, homeTexts)
			});
		}
	}
}