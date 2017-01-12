var backgroundUrls = ['designers.jpg', 'livros.jpg', 'planta.jpg', 'redacao.jpg', 'software.jpg', 'apresentacao.jpg', 'design-palettes.jpg'];

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
		});
	}
/*	$('.introduce p').animate({
		left: '-2px'
	}, 2000);

	$('.introduce p').fadeTo(0, 1);*/

	function passSlide(){
		var bg1 = $('#introduce-background1');
		var bg2 = $('#introduce-background2');
		var index = 0;
		var delay = 5000;
		var transition = 2000;

		var increaseIndex = function(){
			if(index >= backgroundUrls.length-1){
				index = 0;
			}else{
				index++;
			}
			return index;
		}

		function fadeOut(){
			bg1.css('background-image', 'url("/public/images/welcome-slide/' + backgroundUrls[index]) + '")';
			bg2.css('background-image', 'url("/public/images/welcome-slide/' + backgroundUrls[increaseIndex()]) + '")';
			bg1.css('z-index', 10);
			bg2.css('z-index', 5);
			bg2.show();
			setTimeout(function(){
				bg1.fadeOut(transition, fadeIn);
			}, delay);
		}
		function fadeIn(){
			bg2.css('background-image', 'url("/public/images/welcome-slide/' + backgroundUrls[index]) + '")';
			bg1.css('background-image', 'url("/public/images/welcome-slide/' + backgroundUrls[increaseIndex()]) + '")';
			bg1.css('z-index', 5);
			bg2.css('z-index', 10);
			bg1.show();
			setTimeout(function(){
				bg2.fadeOut(transition, fadeOut);
			}, delay);
		}
		fadeOut();
	}


	passSlide();

	$(document).on('scroll', function(){
	 	var max = 1;
	 	var opacity = max * (1 - $(this).scrollTop()*1.5 / $('.introduce').height()); 
	 	$('.introduce p').css('opacity', opacity);
	});

	/*
	$('.service').on('mouseenter', function(e){
		e.preventDefault();
		$('.service').stop().fadeTo('fast', 0.4);
		$(this).stop().fadeTo('fast', 1);
		$('.service').on('mouseleave', function(evt){
			evt.preventDefault();
			$('.service').fadeTo('fast', 1);
		});
	});*/
	$(document).scroll(function(){
		if(document.body.scrollTop >= mainServices.offset().top-200){
			fadeInServices()
		}
	})
});