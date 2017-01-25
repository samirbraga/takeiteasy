let services = [
	{name: "Ilustrações", imageSrc: 'Illustrações.png', area: 'design', matches: "desenho, ilustração, draws, caricaturas, personagem, criação, sketchs, vetores"},
	{name: "Estampas", imageSrc: 'estampa.png', area: 'design', matches: "estampas, desenho, roupa, bolsa"},
	{name: "Edição de Vídeo", imageSrc: 'Audiovisual.png', area: 'design', matches: "edição de vídeo"},
	{name: "Criação de Logos", imageSrc: 'logo.png', area: 'design', matches: "criação de logos, desenhos, logotipos"},
	{name: "Correção de Redações", imageSrc: 'Redação.png', area: 'academy', matches: "correção, redação"},
	{name: "Confecção de Plantas", imageSrc: 'Plantas.png', area: 'design', matches: "autocad, planta baixa"},
	{name: "Edição de Fotos", imageSrc: 'Edição-de-foto.png', area: 'design', matches: "edição de fotos, photoshop, montagem"},
	{name: "Formatação e Correção de Trabalhos", imageSrc: 'Edição-de-foto.png', area: 'academy', matches: "Formatação e Correção de Trabalhos, abnt"},
	{name: "Banners", imageSrc: 'Edição-de-foto.png', area: 'design', matches: "banners"},
	{name: "Planilhas Automatizadas", imageSrc: 'Edição-de-foto.png', area: 'software', matches: "criação de planilhas, excel"},
	{name: "Convites em Geral", imageSrc: 'Edição-de-foto.png', area: 'design', matches: "Convite de casamento, Convite de aniversário, Convite de formatura"},
	{name: "Soluções em Softwares", imageSrc: 'Edição-de-foto.png', area: 'software', matches: "software, ajuda, programas"},
	{name: "Planfletos", imageSrc: 'Edição-de-foto.png', area: 'design', matches: "Planfletos"},
	{name: "Criação de Sites", imageSrc: 'Edição-de-foto.png', area: 'design', matches: "criação de sites, sites"},
	{name: "Slides", imageSrc: 'Edição-de-foto.png', area: 'academy', matches: "slides, criação de slides, powerpoint, abnt"},
	{name: "Outdoors e Busdoors", imageSrc: 'Edição-de-foto.png', area: 'design', matches: ""}
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

console.log(services)

module.exports = services;