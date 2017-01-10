let services = [
	{name: "Illustrações", imageSrc: 'Illustrações.png'},
	{name: "Estampas", imageSrc: 'estampa.png'},
	{name: "Edição de Vídeo e Áudio", imageSrc: 'Audiovisual.png'},
	{name: "Criação de Logos", imageSrc: 'logo.png'},
	{name: "Correção de Redações", imageSrc: 'Redação.png'},
	{name: "Confecção de Plantas", imageSrc: 'Plantas.png'},
	{name: "Edição de Fotos", imageSrc: 'Edição-de-foto.png'},
	{name: "Formatação e Correção de Trabalhos", imageSrc: 'Edição-de-foto.png'},
	{name: "Banners", imageSrc: 'Edição-de-foto.png'},
	{name: "Planilhas Automatizadas", imageSrc: 'Edição-de-foto.png'},
	{name: "Convites em Geral", imageSrc: 'Edição-de-foto.png'},
	{name: "Soluções em Softwares", imageSrc: 'Edição-de-foto.png'},
	{name: "Planfletos", imageSrc: 'Edição-de-foto.png'},
	{name: "Criação de Sites", imageSrc: 'Edição-de-foto.png'},
	{name: "Slides", imageSrc: 'Edição-de-foto.png'},
	{name: "Outdoors e Busdoors", imageSrc: 'Edição-de-foto.png'}
];

module.exports = (app) => {
	return {
		index: (req, res) => {
			res.render('home/index', {
				services: services
			});
		}
	}
}