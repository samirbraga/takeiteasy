var services = [
	{name: "Illustrações", imageSrc: 'Illustrações.png'},
	{name: "Estampas", imageSrc: 'estampa.png'},
	{name: "Edição de Vídeo e Áudio", imageSrc: 'Audiovisual.png'},
	{name: "Criação de Logos", imageSrc: 'logo.png'},
	{name: "Correção de Redações", imageSrc: 'Redação.png'},
	{name: "Confecção de Plantas", imageSrc: 'Plantas.png'},
	{name: "Edição de Fotos", imageSrc: 'Edição-de-foto.png'}
]

$(document).ready(function(){
	var mainServices = $('.main-services');
	services.forEach(function(service){
		var serviceDiv = $('<div class="service" ></div>');
		var img = $('<div class="service-image"></div>');
		var title = $('<span class="service-title"></span>');
		title.text(service.name);
		img.css('background-image', 'url("/public/images/services/' + service.imageSrc) + '")';
		serviceDiv.append(img);
		serviceDiv.append(title);
		mainServices.append(serviceDiv);
	});
	$('.service').each(function(i){
		$(this).delay((+i+1)*100).fadeTo('slow', 1);
	})
});