let services = [
	{name: "Illustrações", imageSrc: 'Illustrações.png', area: 'design'},
	{name: "Estampas", imageSrc: 'estampa.png', area: 'design'},
	{name: "Edição de Vídeo", imageSrc: 'Audiovisual.png', area: 'design'},
	{name: "Criação de Logos", imageSrc: 'logo.png', area: 'design'},
	{name: "Correção de Redações", imageSrc: 'Redação.png', area: 'academy'},
	{name: "Confecção de Plantas", imageSrc: 'Plantas.png', area: 'design'},
	{name: "Edição de Fotos", imageSrc: 'Edição-de-foto.png', area: 'design'},
	{name: "Formatação e Correção de Trabalhos", imageSrc: 'Edição-de-foto.png', area: 'academy'},
	{name: "Banners", imageSrc: 'Edição-de-foto.png', area: 'design'},
	{name: "Planilhas Automatizadas", imageSrc: 'Edição-de-foto.png', area: 'software'},
	{name: "Convites em Geral", imageSrc: 'Edição-de-foto.png', area: 'design'},
	{name: "Soluções em Softwares", imageSrc: 'Edição-de-foto.png', area: 'software'},
	{name: "Planfletos", imageSrc: 'Edição-de-foto.png', area: 'design'},
	{name: "Criação de Sites", imageSrc: 'Edição-de-foto.png', area: 'design'},
	{name: "Slides", imageSrc: 'Edição-de-foto.png', area: 'academy'},
	{name: "Outdoors e Busdoors", imageSrc: 'Edição-de-foto.png', area: 'design'}
];

function parseToUrl(string){
	let translate = { "ç": "c", "é": "e", "õ": 'o', "á": "a", "ã": "a", "à": "a", "ű": "u", "ő": "o", "ú": "u", "ö": "o", "ï": "i", "ü": "u", "ó": "o", "í": "i", "É": "E", "Á": "A", "Ű": "U", "Ő": "O", "Ú": "U", "Ö": "O", "Ü": "U", "Ó": "O", "Í": "I" };
	let translate_re = new RegExp(`[${Object.keys(translate).join('')}]`, 'g'); 
	
	string = string.replace(/\s/g, '-')
				   .replace(/\?/g, '')
				   .replace(translate_re, letter => translate[letter]);
	return string.toLowerCase();
}

services.forEach( function(service, index) {
	service['href'] = `/servicos/${ parseToUrl(service.name) }`;
});

module.exports = {
	services: services
};