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

function parseToUrl(string){
	let translate = { "ç": "c", "é": "e", "õ": 'o', "á": "a", "ã": "a", "à": "a", "ű": "u", "ő": "o", "ú": "u", "ö": "o", "ï": "i", "ü": "u", "ó": "o", "í": "i", "É": "E", "Á": "A", "Ű": "U", "Ő": "O", "Ú": "U", "Ö": "O", "Ü": "U", "Ó": "O", "Í": "I" };
	let translate_re = new RegExp(`[${Object.keys(translate).join('')}]`, 'g'); 
	
	string = string.replace(/\s/g, '-')
				   .replace(/\?/g, '')
				   .replace(translate_re, letter => translate[letter]);
	return string.toLowerCase();
}


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
	var mainFooter = $('.main-footer');
	var mainMenu = {
		icon: $('.main-menu-icon'),
		container: $('.main-menu-container'),
		self: $('.main-menu'),
		topbar: $('.main-menu-topbar'),
		content: $('.main-menu-content'),
		footer: $('.main-menu-footer'),
		close: $('.main-menu-close')
	}
	
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

		if(st > makeYouRelax.header.offset().top - 300){
			showServiceAreas();
		}
	});

	// Show search input box
	$('.search-icon .icon-svg').click(function (e) {
		e.stopPropagation();
		tbMenuRoutes.css('opacity', 0);
		setTimeout(function(){
			generalSearch.css('width', '300px');
			generalSearchInput.focus();
		}, 200);
		search();
	});
	$('body').on('click', function(){
		generalSearch.css('width', '0');
		tbMenuRoutes.css('opacity', 1);
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

	// search engine
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

	var allResults = [];
	var resultElements;
	
	function search(){

		var val = (generalSearchInput.val()  || "  ")
				  .replace(/^\s*/g, '')
				  .replace(/\s*$/g, '');

		val = removeAccents(val);

		if(val.length > 3){

			var results = [];

			services.forEach(function(service, index){
				service.matches.split(', ').forEach(function(match){
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

			allResults.push(results);

			if(JSON.stringify(allResults[allResults.length - 1]) != JSON.stringify(allResults[allResults.length - 2])){
				
				var areasNames = {
					design: "Design",
					software: "Software",
					academy: "Acadêmico",
				}

				autocomplete.fadeIn('fast');

				var fragment = document.createDocumentFragment();

				if(results.length > 0){
					results.forEach(function(result, i){
						var html = '<li class="plain-li">' + 
									   '<span class="name">'+ result.name +'</span>' + 
									   '<span class="area">'+ areasNames[result.area] +'</span>' + 
								   '</li>';

						var a = document.createElement('a');

						a.href = result.href;
						a.className = 'search-result-item';
						a.tabindex = '0';
						a.setAttribute('data-value', result.name);
						a.innerHTML = html;
										
						fragment.appendChild(a);
					});
				}else{
					var html = '<li class="plain-li" tabindex="-1" >' + 
								 	'<span class="name">Veja todos os nossos serviços</span>' + 
							   '</li>';

				    var a = document.createElement('a');

					a.href = '/servicos';
					a.className = 'search-result-item';
					a.tabindex = '0';
					a.innerHTML = html;

					fragment.appendChild(a);
				}

				autocomplete.children('ul').html('');
				autocomplete.children('ul').get(0).appendChild(fragment);
			}
		}
	}

	var selectedIndex = -1;
	var resultList;
	var selected;

	function indexNext(){
		if(selectedIndex >= resultList.length - 1){
			selectedIndex = 0;
		}else{
			selectedIndex += 1;
		}
	}

	function indexPrev(){
		if(selectedIndex <= 0){
			selectedIndex = resultList.length-1;
		}else{
			selectedIndex -= 1;
		}
	}

	generalSearchInput.keydown(function(e){
		var self = $(this);

		function updateAll(){
			selected = resultList.eq(selectedIndex); // the selected element
			resultList.removeClass('selected'); // deselect all
			selected.addClass('selected'); // select
			self.val(selected.data('value')); // value
		}

		if(e.keyCode == 40){
			e.preventDefault();
			resultList = $('.search-result-item'); // Elements of search result
			indexNext();
			updateAll();
		}else if(e.keyCode == 38){
			e.preventDefault();
			resultList = $('.search-result-item'); // Elements of search result
			indexPrev();
			updateAll();
		}else if(e.keyCode == 13){
			e.preventDefault();
			window.location = selected.prop('href');
		}else if(e.keyCode == 27){
			e.preventDefault();
			self.blur();
			generalSearch.css('width', '0');
			tbMenuRoutes.delay(200).fadeTo('fast', 1);
			autocomplete.fadeOut('fast');
		}
	});

	generalSearchInput.on('input', search);

	// toggle menu
	mainMenu.icon.click(function () {
		mainMenu.container.fadeIn('fast');
		mainMenu.self.addClass('showed');
		$('body').css('overflow-y', 'hidden');
	})
	mainMenu.self.click(function(e){
		e.stopPropagation();
	})

	function closeMenu(){
		var self = mainMenu.container;
		mainMenu.self.removeClass('showed');
		setTimeout(function(){
			self.fadeOut();
		}, 100);
		$('body').css('overflow-y', 'auto');
	}

	mainMenu.container.click(closeMenu);
	mainMenu.close.click(closeMenu);
});


					/*
						var a = document.createElement('a');
						var li = document.createElement('li');
						var span1 = document.createElement('span');
						var span2 = document.createElement('span');

						a.href = result.href;
						a.className = 'search-result-item';
						a.tabindex = '0';
						a.setAttribute('data-value', result.name);

						li.className = 'plain-li';
						li.tabindex = '-1';

						span1.className = 'name';
						span1.innerHTML = result.name;
						span2.className = 'area';
						span2.innerHTML = c;

						li.appendChild(span1);
						li.appendChild(span2);
						a.appendChild(li);
					*/