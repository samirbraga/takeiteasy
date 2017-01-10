

$(document).ready(function(){
	var mainServices = $('.main-services');/*
	services.forEach(function(service){
		var serviceDiv = $('<div class="service" ></div>');
		var img = $('<div class="service-image"></div>');
		var title = $('<span class="service-title"></span>');
		title.text(service.name);
		img.css('background-image', 'url("/public/images/services/' + service.imageSrc + '")');
		serviceDiv.append(img);
		serviceDiv.append(title);
		mainServices.append(serviceDiv);
	});*/
	function fadeInServices(){
		$('.service').each(function(i){
			$(this).delay((+i+1)*100).fadeTo('slow', 1);
		})
	}
	$(document).scroll(function(){
		if(document.body.scrollTop >= mainServices.offset().top-200){
			fadeInServices()
		}
	})
});