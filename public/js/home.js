var backgroundUrls = ['designers.jpg', 'livros.jpg', 'ilustracao.jpg', 'escrita.jpg', 'software.jpg', 'apresentacao.jpg', 'design-palettes.jpg'];

var dataImages = backgroundUrls.map(function(bg){
	return "/public/images/welcome-slide/optimized/" + bg;
});

/*
backgroundUrls.forEach(function(bgUrl, i){
	var xml = new XMLHttpRequest(); // Objeto XML
	var blob;
	var url = "/public/images/welcome-slide/optimized/";
	xml.open("GET", url + bgUrl); 
	xml.responseType = "blob";
	xml.onload = function (){
	    if(xml.readyState === 4){
	        if(xml.status === 200 || xml.status == 0){
	            blob = URL.createObjectURL(xml.response); 
	   			dataImages[i] = blob;
	        }
	    }
	}
	xml.send();
})
*/
$(document).ready(function(){
	var mainServices = $('.main-services');
	var introduce = $('.introduce');
	var topBar = $('.top-bar');
	var tbMenuRoutes = $('.top-bar .side-menu .menu-routes');
	var generalSearch = $('.top-bar .side-menu .search-icon .search-input-box');
	var autocomplete = $('.top-bar .side-menu .search-icon .autocomplete');
	var generalSearchInput = $('.top-bar .side-menu .search-icon .search-input-box input');
	var makeYouRelax = {
		header: $('.make-you-relax header'),
		article: $('.make-you-relax article'),
		areaDesign: $('.make-you-relax .services-area .service-area:eq(0)'),
		areaSoftware: $('.make-you-relax .services-area .service-area:eq(1)'),
		areaAcademy: $('.make-you-relax .services-area .service-area:eq(2)')
	}
	var areaExplain = {
		design: $('.design-area-explain'),
		software: $('.software-area-explain'),
		academy: $('.academy-area-explain')
	}
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
		slogan[0].fadeTo(500, 1, function () {
			slogan[1].delay(500).fadeTo(1000, 1);
		})
	}

	// Animate height in section.introduce
	setTimeout(function(){
		introduce.removeClass('shrunken');
		introduce.css('height', (window.innerHeight-50) + "px");
		introduce.addClass('expanded');
		setTimeout(function(){
			introduce.removeAttr('style');
			introduce.css('min-height', '300px');
			fadeInSlogan();
		}, 1200)
	}, 200);

	// Infinite slide loop
	function passSlide(){
		var bg1 = $('#introduce-background1');
		var bg2 = $('#introduce-background2');
		var index = 0;
		var delay = 5000;
		var transition = 2000;

		var increaseIndex = function(){
			if(index >= dataImages.length-1){
				index = 0;
			}else{
				index++;
			}
			return index;
		}

		function fadeOut(){
			bg1.css('background-image', 'url("' + dataImages[index] + '")');
			bg2.css('background-image', 'url("' + dataImages[increaseIndex()] + '")');
			bg1.css('z-index', 10);
			bg2.css('z-index', 5);
			bg2.show();
			setTimeout(function(){
				bg1.fadeOut(transition, fadeIn);
			}, delay);
		}
		function fadeIn(){
			bg2.css('background-image', 'url("' + dataImages[index] + '")');
			bg1.css('background-image', 'url("' + dataImages[increaseIndex()] + '")');
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
	

	// Show Service Areas
	function showServiceAreas() {
		makeYouRelax.areaAcademy.addClass('showed');
		makeYouRelax.areaAcademy.fadeTo('slow', 1);
		setTimeout(function(){
			makeYouRelax.areaSoftware.addClass('showed');
			makeYouRelax.areaSoftware.fadeTo('slow', 1);
		}, 300)
		setTimeout(function(){
			makeYouRelax.areaDesign.addClass('showed');
			makeYouRelax.areaDesign.fadeTo('slow', 1);
		}, 600)
	}

	var lastScrollTop = $(this).scrollTop(); // use to detect direction of scroll

	// Change slogn opacity with scroll
	$(document).on('scroll', function(){
		// Change opacity of slogan by scroll
	 	var max = 1;
	 	var opacity = max * (1 - $(this).scrollTop()*1.8 / introduce.height()); 
	 	$('.introduce p').css('opacity', opacity);

	 	// Show topbar by scroll
		var st = $(this).scrollTop();
		if(st > 0){
 			topBar.removeClass('static');
 			topBar.addClass('fixed');
	 	}else{
	 		topBar.removeClass('fixed');
	 		topBar.addClass('static');
	 	}
		lastScrollTop = st;

		if(st > makeYouRelax.header.offset().top - 300){
			showServiceAreas();
		}
	});

	// Show search input box
	$('.search-icon .icon-svg').click(function (e) {
		e.stopPropagation();
		tbMenuRoutes.stop().fadeTo('fast', 0, function(){
			generalSearch.css('width', '300px');
			generalSearchInput.focus();
		});
		search();
	});
	$('body').on('click', function(){
		generalSearch.css('width', '0');
		tbMenuRoutes.delay(200).fadeTo('fast', 1)
		autocomplete.fadeOut('fast')
	})
	generalSearch.click(function(e){
		e.stopPropagation();
	})
	autocomplete.click(function(e){
		e.stopPropagation();
	})
	generalSearchInput.click(function(e){
		e.stopPropagation();
	})


	var toScroll = $('html, body');
	makeYouRelax.areaDesign.click(function(){
		toScroll.animate({
			scrollTop: areaExplain.design.offset().top 
		}, 800)
	})
	makeYouRelax.areaSoftware.click(function(){
		toScroll.animate({
			scrollTop: areaExplain.software.offset().top 
		}, 800)
	})
	makeYouRelax.areaAcademy.click(function(){
		toScroll.animate({
			scrollTop: areaExplain.academy.offset().top 
		}, 800)
	})

	/*$(document).scroll(function(){
		if(document.body.scrollTop >= mainServices.offset().top-200){
			fadeInServices()
		}
	});*/

	// search engine

	function search(){

		var val = (generalSearchInput.val()  || "  ").replace(/^\s*/g, '').replace(/\s*$/g, '');

		if(val.length > 3){
			var results = [];
			services.forEach(function(service, index){
				service.matches.split(', ').forEach(function(match){
					var regex = new RegExp(val, 'g');
					if(regex.test(match)){
						if(results.indexOf(service) < 0){
							results.push(service);
						}
					}
				});
			});
			if(results.length > 0){
				autocomplete.fadeIn('fast')
				var areasNames = {
					design: "Design",
					software: "Software",
					academy: "Acadêmico",
				}
				autocomplete.children('ul').html(
					results.map(function(result, i){
						return [
							"<a href='" + result.href +"' class='search-result-item' tabindex='0'>",
								"<li class='plain-li' tabindex='-1' >",
									"<span class='name'>" + result.name + "</span>",
									"<span class='area'>" + areasNames[result.area] + "</span>",
								"</li>",
							"</a>"
						].join('');
					})
				);
			}else{
				autocomplete.children('ul').html(
					[
						"<a href='/servicos' class='search-result-item' tabindex='0'>",
							"<li class='plain-li'  tabindex='-1'>",
								"<span class='name'>Veja todos os nosso serviços<span>",
							"</li>",
						"</a>"
					].join('')
				);
			}
		}
	}
	var searchResult = $('.autocomplete ul a');

	generalSearchInput.keydown(function(e){
		e.stopPropagation();
		searchResult = $('.autocomplete ul a');
		if(e.keyCode == 40){
			e.preventDefault()
			searchResult.eq(0).focus();
		}else if(e.keyCode == 38){
			e.preventDefault()
			searchResult.eq(searchResult.length - 1).focus();
		}else if(e.keyCode == 27){
			e.preventDefault()
			generalSearchInput.blur();
			generalSearch.css('width', '0');
			tbMenuRoutes.delay(200).fadeTo('fast', 1)
			autocomplete.fadeOut('fast')
		}
	});

	$(document).keydown(function(e){
		if($(document.activeElement).hasClass('search-result-item')){
			var li = $(document.activeElement);
			var resultIndex = li.index();
			searchResult = $('.autocomplete ul a');
			var keycode = e.keyCode || e.which;
			if(keycode == 40){
				e.preventDefault();
				if(resultIndex == searchResult.length-1){
					searchResult.eq(0).focus();
				}else{
					searchResult.eq(+resultIndex+1).focus();
				}
			}else if(keycode == 38){
				e.preventDefault();
				if(resultIndex == 0){
					searchResult.eq(searchResult.length-1).focus();
				}else{
					searchResult.eq(+resultIndex-1).focus();
				}
			}
		}
	})

	generalSearchInput.keyup(search);

});