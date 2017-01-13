var backgroundUrls = ['designers.jpg', 'livros.jpg', 'ilustracao.jpg', 'escrita.jpg', 'software.jpg', 'apresentacao.jpg', 'design-palettes.jpg'];

$(document).ready(function(){
	var mainServices = $('.main-services');
	var introduce = $('.introduce');
	var topBar = $('.top-bar');
	var tbMenuRoutes = $('.top-bar .side-menu .menu-routes');
	var generalSearch = $('.top-bar .side-menu .search-icon .search-input-box');
	var generalSearchInput = $('.top-bar .side-menu .search-icon .search-input-box input');
	/*
	services.forEach(function(service){
		var serviceDiv = $('<div class="service" ></div>');
		var img = $('<div class="service-image"></div>');
		var title = $('<span class="service-title"></span>');
		title.text(service.name);
		img.css('background-image', 'url("/public/images/services/' + service.imageSrc + '")');
		serviceDiv.append(img);
		serviceDiv.append(title);
		mainServices.append(serviceDiv);
	});
	*/
	
	// Sequence services fade-in 
	function fadeInServices(){
		$('.service').each(function(i){
			$(this).delay((+i+1)*100).fadeTo('slow', 1);
		});
	}

	// Fade-in Slogan
	function fadeInSlogan(){
		var slogan = [$('.introduce p span').eq(0), $('.introduce p span').eq(1)];
		slogan[0].fadeTo(300, 1, function () {
			slogan[1].delay(400).fadeTo(1000, 1);
		})
	}

	// Animate height in section.introduce
	setTimeout(function(){
		introduce.removeClass('shrunken');
		introduce.addClass('expanded');
		setTimeout(function(){
			introduce.css('min-height', '300px');
			fadeInSlogan();
		}, 800)
	}, 200)

	// Infinite slide loop
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
			bg1.css('background-image', 'url("/public/images/welcome-slide/' + backgroundUrls[index] + '")');
			bg2.css('background-image', 'url("/public/images/welcome-slide/' + backgroundUrls[increaseIndex()] + '")');
			bg1.css('z-index', 10);
			bg2.css('z-index', 5);
			bg2.show();
			setTimeout(function(){
				bg1.fadeOut(transition, fadeIn);
			}, delay);
		}
		function fadeIn(){
			bg2.css('background-image', 'url("/public/images/welcome-slide/' + backgroundUrls[index] + '")');
			bg1.css('background-image', 'url("/public/images/welcome-slide/' + backgroundUrls[increaseIndex()] + '")');
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

	// Change slogn opacity with scroll
	$(document).on('scroll', function(){
	 	var max = 1;
	 	var opacity = max * (1 - $(this).scrollTop()*1.5 / introduce.height()); 
	 	$('.introduce p').css('opacity', opacity);

	 	if($(this).scrollTop() > topBar.height()){
	 		if($(this).scrollTop() > introduce.height()){
	 			topBar.removeClass('static');
	 			topBar.addClass('fixed');
	 			topBar.css('transform', 'translateY(0)')
	 		}else{
	 			topBar.css('transform', 'translateY(-300px)')
	 		}
	 	}else{
	 		topBar.removeClass('fixed');
	 		topBar.addClass('static');
	 		topBar.css('transform', 'translateY(0)')
	 	}
	});

	// Show search input box
	$('.search-icon').click(function () {
		tbMenuRoutes.stop().fadeTo('fast', 0, function(){
			generalSearch.css('width', '300px');
			generalSearchInput.focus();
		})
	});
	generalSearchInput.on('blur', function(){
		generalSearch.css('width', '0');
		tbMenuRoutes.delay(200).fadeTo('fast', 1)
	})

	/*$(document).scroll(function(){
		if(document.body.scrollTop >= mainServices.offset().top-200){
			fadeInServices()
		}
	});*/
});