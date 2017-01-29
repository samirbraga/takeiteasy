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


const search = (string) => {
	function parseToReg(str){
		return str.replace(/\(/g, '\\(')
		.replace(/\)/g, '\\)')
		.replace(/\./g, '\\.')
		.replace(/\*/g, '\\*')
		.replace(/\+/g, '\\+')
		.replace(/\-/g, '\\-')
		.replace(/\//g, '\\/')
		.replace(/\"/g, '\\"')
		.replace(/\'/g, "\\'")
		.replace(/\,/g, '\\,')
		.replace(/\&/g, '\\&');
	}
	function removeAccents(str){
		var translate = { "ç": "c", "é": "e", "õ": 'o', "á": "a", "ã": "a", "à": "a", "ű": "u", "ő": "o", "ú": "u", "ö": "o", "ï": "i", "ü": "u", "ó": "o", "í": "i", "É": "E", "Á": "A", "Ű": "U", "Ő": "O", "Ú": "U", "Ö": "O", "Ü": "U", "Ó": "O", "Í": "I" };
		var translate_re = new RegExp("[" + Object.keys(translate).join('') + "]", 'g'); 

		return str.replace(translate_re, function(letter){
			return translate[letter];
		});
	}

	var val = (string  || "  ")
	.replace(/^\s*/g, '')
	.replace(/\s*$/g, '');

	val = removeAccents(val);

	var results;

	if(val.length > 3){

		results = [];

		servicesList.forEach((service, index) => {
			service.matches.split(', ').forEach((match) => {
				match = removeAccents(match);

				var regex1 = new RegExp(parseToReg(val), 'gui');
				if(regex1.test(match)){
					if(results.indexOf(service) < 0){
						results.push(service);
					}
				}
				var regex2 = new RegExp(parseToReg(match), 'gui');
				if(regex2.test(val)){
					if(results.indexOf(service) < 0){
						results.push(service);
					}
				}
			});	
		});
	}
	return results;
}

module.exports = (app) => {
	return {
		index: (req, res) => {
			res.render('home/index', {
				services: servicesList,
				sortedServices: sortServices(servicesList),
				texts: Object.assign(generalTexts, homeTexts)
			});
		},
		search: (req, res) => {
			let searchString = req.query.q;
			res.send(search(searchString));
		}
	}
}