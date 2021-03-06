	(function(b){function d(a){this.input=a;a.attr("type")=="password"&&this.handlePassword();b(a[0].form).submit(function(){if(a.hasClass("placeholder")&&a[0].value==a.attr("placeholder"))a[0].value=""})}d.prototype={show:function(a){if(this.input[0].value===""||a&&this.valueIsPlaceholder()){if(this.isPassword)try{this.input[0].setAttribute("type","text")}catch(b){this.input.before(this.fakePassword.show()).hide()}this.input.addClass("placeholder");this.input[0].value=this.input.attr("placeholder")}},
hide:function(){if(this.valueIsPlaceholder()&&this.input.hasClass("placeholder")&&(this.input.removeClass("placeholder"),this.input[0].value="",this.isPassword)){try{this.input[0].setAttribute("type","password")}catch(a){}this.input.show();this.input[0].focus()}},valueIsPlaceholder:function(){return this.input[0].value==this.input.attr("placeholder")},handlePassword:function(){var a=this.input;a.attr("realType","password");this.isPassword=!0;if(b.browser.msie&&a[0].outerHTML){var c=b(a[0].outerHTML.replace(/type=(['"])?password\1/gi,
"type=$1text$1"));this.fakePassword=c.val(a.attr("placeholder")).addClass("placeholder").focus(function(){a.trigger("focus");b(this).hide()});b(a[0].form).submit(function(){c.remove();a.show()})}}};var e=!!("placeholder"in document.createElement("input"));b.fn.placeholder=function(){return e?this:this.each(function(){var a=b(this),c=new d(a);c.show(!0);a.focus(function(){c.hide()});a.blur(function(){c.show(!1)});b.browser.msie&&(b(window).load(function(){a.val()&&a.removeClass("placeholder");c.show(!0)}),
a.focus(function(){if(this.value==""){var a=this.createTextRange();a.collapse(!0);a.moveStart("character",0);a.select()}}))})}})(jQuery);

	$('input[placeholder], textarea[placeholder]').placeholder();
	$('.btnsubmit').click(function(e){
		// Declare the function variables:
		// Parent form, form URL, email regex and the error HTML
		var $formId = $(this).parents('form');
		var formAction = $formId.attr('action');
		var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
		var $error = $('<span class="error"></span>');

		// Prepare the form for validation - remove previous errors
		$('li',$formId).removeClass('error');
		$('span.error').remove();
		$('.knopkaotpravit').removeClass('dispn');
		// Validate all inputs with the class "required"
		$('.required',$formId).each(function(){
			var inputVal = $(this).val();
			var $parentTag = $(this).parent();
			if(inputVal == ''){
				$parentTag.addClass('error').append($error.clone().text('Заполните поле информацией'));
				$('.knopkaotpravit').addClass('dispn');
			}
			
			// Run the email validation using the regex for those input items also having class "email"
			if($(this).hasClass('email') == true){
				if(!emailReg.test(inputVal)){
					$parentTag.addClass('error').append($error.clone().text('Введите правильно свой email'));
				}
			}

		});

		// All validation complete - Check if any errors exist
		// If has errors
		if ($('span.error').length > 1) {
			
			$('span.error').each(function(){
				
				// Set the distance for the error animation
				var distance = 5;
				
				// Get the error dimensions
				var width = $(this).outerWidth();
				
				// Calculate starting position
				var start = width + distance;
				
				// Set the initial CSS
				$(this).show().css({
					display: 'block',
					opacity: 0,
					right: 100
				})
				// Animate the error message
				.animate({
					right: 1,
					opacity: 1
				}, 'slow');
				
			});
		} else {
			$formId.submit();
		}
		// Prevent form submission
			e.preventDefault();
	});
	
	// Fade out error message when input field gains focus
	$('.required').focus(function(){
		var $parent = $(this).parent();
		$parent.removeClass('error');
		$('span.error',$parent).fadeOut();
	});
		// $('razdelsan .plo,.sovmestsan .plo').mousemove(function(){
		// 	$(".metrov").each(function(){
		// 		var inputVal = $(this).val();
		// 		var $parentTag = $(this).parent();
		// 		if(inputVal <= '2'){
		// 			$('.plo i').html('<small>Введите пожалуйста от 3м</small>');
		// 		}
		// 	});
		// });

		// $('.vanna .plo').mousemove(function(){
		// 	$(".metrov").each(function(){
		// 		var inputVal = $(this).val();
		// 		var $parentTag = $(this).parent();
		// 		if(inputVal == '1'){
		// 			$('.plo i').html('<small>Введите пожалуйста от 2м</small>');
		// 		}
		// 	});
		// });
		// $('.tualet .plo').mousemove(function(){
		// 	$(".metrov").each(function(){
		// 		var inputVal = $(this).val();
		// 		var $parentTag = $(this).parent();
		// 		if(inputVal > '10'){
		// 				$('.calc_blok .calc .fl_r span.butt.stoim').html('Превышенная площадь');
		// 		}
		// 		if(inputVal == '0'){
		// 			$('.plo i').html('<small>Введите пожалуйста  1 или более</small>');
		// 			$('.calc_blok .calc .fl_r span.butt.stoim').html('Неверное значение');
		// 		}
		// 		if(inputVal == '1'){$('.calc_blok .calc .fl_r span.butt.stoim').html('20 000 рублей');}
		// 		if(inputVal == '2'){
		// 				$('.calc_blok .calc .fl_r span.butt.stoim').html('25 000 рублей');}
		// 		if(inputVal == '3'){
		// 				$('.calc_blok .calc .fl_r span.butt.stoim').html('30 000 рублей');
		// 		}
		// 		if(inputVal == '4'){
		// 				$('.calc_blok .calc .fl_r span.butt.stoim').html('35 000 рублей');
		// 		}
		// 		if(inputVal == '5'){
		// 				$('.calc_blok .calc .fl_r span.butt.stoim').html('40 000 рублей');
		// 		}
		// 		if(inputVal == '6'){
		// 				$('.calc_blok .calc .fl_r span.butt.stoim').html('45 000 рублей');
		// 		}
		// 		if(inputVal == '7'){
		// 				$('.calc_blok .calc .fl_r span.butt.stoim').html('50 000 рублей');
		// 		}
		// 		if(inputVal == '8'){
		// 				$('.calc_blok .calc .fl_r span.butt.stoim').html('55 000 рублей');
		// 		}
		// 		if(inputVal == '9'){
		// 				$('.calc_blok .calc .fl_r span.butt.stoim').html('60 000 рублей');
		// 		}
		// 		if(inputVal == '10'){
		// 				$('.calc_blok .calc .fl_r span.butt.stoim').html('65 000 рублей');
		// 		}
		// 	});
		// });

		$('.metrov').mousemove(function(){
			$('.plo i small').fadeOut();
		});
		$("label.razdelsan").click(function () { $('.butt.sroki').html('14 дней'); $('.butt.stoim'); });
		$("label.sovmestsan").click(function () { $('.butt.sroki').html('16 дней'); $(this).addClass('checked'); });
		$("label.vanna").click(function () { $('.butt.sroki').html('7 дней'); $(this).addClass('checked'); });
		$("label.tualet").click(function () { $('.butt.sroki').html('5 дней'); $(this).addClass('checked'); });
			// $(".butt_menu").click(function () { 
			// 	$('header').toggleClass('active');
			// 	$('.all_menu_list').addClass('dispn');
			// 	$('header.header').removeClass('static');
			// });
			// $(".faq li b").click(function () {$(this).parent().toggleClass("open");$(this).next('p').slideToggle('normal'); });
			// $(".selector").click(function () {
			// 	$(this).toggleClass('blue');
			// 	$(this).parent().addClass('up');
			// 	$(this).next('div.list').toggleClass('dispn');
			// });
			// $(".statuskvartir .list .new").click(function () {
			// 	$('#newstroy').attr('value', '1.05');
			// 	$(this).parent().addClass('dispn');
			// 	$('span.s1').removeClass('dispn');
			// 	$('span.s2').addClass('dispn');
			// 	$('.statuskvartir .selector').toggleClass('blue'); 
			// });
			// $(".statuskvartir .list .old").click(function () {
			// 	$('#newstroy').attr('value', '1');
			// 	$(this).parent().addClass('dispn');	
			// 	$('span.s2').removeClass('dispn');
			// 	$('span.s1').addClass('dispn');
			// 	$('.statuskvartir .selector').toggleClass('blue'); 
			// });
			// $(".kolvosanuzlov .list .one").click(function () {
			// 	$('#sanu').attr('value', '1');
			// 	$(this).parent().addClass('dispn');
			// 	$('span.ss1').removeClass('dispn');
			// 	$('span.ss2').addClass('dispn');
			// 	$('.kolvosanuzlov .selector').toggleClass('blue'); 
			// });
			// $(".kolvosanuzlov .list .two").click(function () {
			// 	$('#sanu').attr('value', '1.1');
			// 	$(this).parent().addClass('dispn');	
			// 	$('span.ss2').removeClass('dispn');
			// 	$('span.ss1').addClass('dispn');
			// 	$('.kolvosanuzlov .selector').toggleClass('blue'); 
			// });
			// $(".tipremonta .list .kos").click(function () {
			// 	$(this).parent().addClass('dispn');
			// 	$('span.t1').removeClass('dispn');
			// 	$('span.t2,span.t3,span.t4').addClass('dispn');
			// 	$('.tipremonta .selector').removeClass('blue'); 
			// });
			// $(".tipremonta .list .kap").click(function () {
			// 	$(this).parent().addClass('dispn');
			// 	$('span.t2').removeClass('dispn');
			// 	$('span.t1,span.t3,span.t4').addClass('dispn');
			// 	$('.tipremonta .selector').removeClass('blue'); 
			// });
			// $(".foto1 .galleria-image-nav-right").click(function () {$('.foto1').addClass('dispn');	$('.foto2').removeClass('dispn');	});
			// $(".foto1 .galleria-image-nav-left").click(function () {$('.foto1').addClass('dispn');	$('.foto3').removeClass('dispn');	});
			// $(".foto2 .galleria-image-nav-right").click(function () {$('.foto2').addClass('dispn');	$('.foto3').removeClass('dispn');	});
			// $(".foto2 .galleria-image-nav-left").click(function () {$('.foto2').addClass('dispn');	$('.foto1').removeClass('dispn');	});
			// $(".foto3 .galleria-image-nav-right").click(function () {$('.foto3').addClass('dispn');	$('.foto1').removeClass('dispn');	});
			// $(".foto3 .galleria-image-nav-left").click(function () {$('.foto3').addClass('dispn');	$('.foto2').removeClass('dispn');	});
			// $(".tipremonta .list .eur").click(function () {
			// 	$(this).parent().addClass('dispn');
			// 	$('span.t3').removeClass('dispn');
			// 	$('span.t2,span.t1,span.t4').addClass('dispn');
			// 	$('.tipremonta .selector').removeClass('blue'); 
			// });
			// $(".tipremonta .list .eli").click(function () {
			// 	$(this).parent().addClass('dispn');
			// 	$('span.t4').removeClass('dispn');
			// 	$('span.t1,span.t3,span.t2').addClass('dispn');
			// 	$('.tipremonta .selector').removeClass('blue'); 
			// });
			// $(".vysota .list .twosix").click(function () {
			// 	$('#vysotapotolkov').attr('value', '2.6');
			// 	$(this).parent().addClass('dispn');
			// 	$('span.v26').removeClass('dispn');
			// 	$('span.v27,span.v28,span.v3,span.v32').addClass('dispn');
			// 	$('.vysota .selector').toggleClass('blue'); 
			// });
			// $(".vysota .list .twoseven").click(function () {
			// 	$('#vysotapotolkov').attr('value', '2.7');
			// 	$(this).parent().addClass('dispn');
			// 	$('span.v27').removeClass('dispn');
			// 	$('span.v26,span.v28,span.v3,span.v32').addClass('dispn');
			// 	$('.vysota .selector').toggleClass('blue'); 
			// });
			// $(".vysota .list .twoeight").click(function () {
			// 	$('#vysotapotolkov').attr('value', '2.8');
			// 	$(this).parent().addClass('dispn');
			// 	$('span.v28').removeClass('dispn');
			// 	$('span.v26,span.v27,span.v3,span.v32').addClass('dispn');
			// 	$('.vysota .selector').toggleClass('blue'); 
			// });
			// $(".vysota .list .three").click(function () {
			// 	$('#vysotapotolkov').attr('value', '3');
			// 	$(this).parent().addClass('dispn');
			// 	$('span.v3').removeClass('dispn');
			// 	$('span.v26,span.v27,span.v28,span.v32').addClass('dispn');
			// 	$('.vysota .selector').toggleClass('blue'); 
			// });
			// $(".vysota .list .threetwo").click(function () {
			// 	$('#vysotapotolkov').attr('value', '3.2');
			// 	$(this).parent().addClass('dispn');
			// 	$('span.v32').removeClass('dispn');
			// 	$('span.v26,span.v27,span.v28,span.v3').addClass('dispn');
			// 	$('.vysota .selector').toggleClass('blue'); 
			// });
			// $("span.arrow.ar1").click(function () { 
			// 	$('li.pm1 ul').slideToggle('normal');
			// 	$(this).toggleClass('up');
			// });
			// $("span.arrow.ar2").click(function () { 
			// 	$('li.pm2 ul').slideToggle('normal');
			// 	$(this).toggleClass('up');
			// });
			// $("a.apm1,li.pm1 ul").mouseover(function () { 
			// 	$('li.pm1 ul').attr('style','display:block;');
			// });
			// $("li.posRel.pm1 ul,a.apm1").mouseout(function () { 
			// 	$('li.posRel.pm1 ul').attr('style','display:none;');
			// });
			// $("a.apm2,li.pm2 ul").mouseover(function () { 
			// 	$('li.pm2 ul').attr('style','display:block;');
			// });
			// $("li.posRel.pm2 ul,a.apm2").mouseout(function () { 
			// 	$('li.posRel.pm2 ul').attr('style','display:none;');
			// });
			// $(".cb").click(function () { 
			// 	$('.posFix.popup.callback').toggleClass('dispn');
			// });
			// $(".calcbtn").click(function () { 
			// 	$('.popup.calcback').toggleClass('dispn');
			// });
			// $(".fb").click(function () { 
			// 	$('.popup.feedback').toggleClass('dispn');
			// });
			// $(".m1").click(function () { 
			// 	$('.popup.mp1').toggleClass('dispn');
			// 	$('.mas').toggleClass('dispn');
			// });
			// $(".m2").click(function () { 
			// 	$('.popup.mp2').toggleClass('dispn');
			// 	$('.mas').toggleClass('dispn');
			// });
			// $(".m3").click(function () { 
			// 	$('.popup.mp3').toggleClass('dispn');
			// 	$('.mas').toggleClass('dispn');
			// });
			// $("a.price123").click(function () { 
			// 	$('.popup.smeta123').toggleClass('dispn');
			// });
			// $(".van1").click(function () {$(this).addClass('active'); $('.van2,.van3').removeClass('active');$('.blok1').removeClass('dispn');$('.blok2,.blok3').addClass('dispn'); });
			// $(".van2").click(function () {$(this).addClass('active'); $('.van1,.van3').removeClass('active');$('.blok2').removeClass('dispn');$('.blok1,.blok3').addClass('dispn'); });
			// $(".van3").click(function () {$(this).addClass('active'); $('.van2,.van1').removeClass('active');$('.blok3').removeClass('dispn');$('.blok1,.blok2').addClass('dispn'); });
			// $(".kuh1").click(function () {$(this).addClass('active'); $('.kuh2,.kuh3,.kuh4,.kuh5,.kuh6').removeClass('active');$('.blok1').removeClass('opa0');$('.blok2,.blok3,.blok4,.blok5,.blok6').addClass('opa0'); });
			// $(".kuh2").click(function () {$(this).addClass('active'); $('.kuh1,.kuh3,.kuh4,.kuh5,.kuh6').removeClass('active');$('.blok2').removeClass('opa0');$('.blok1,.blok3,.blok4,.blok5,.blok6').addClass('opa0'); });
			// $(".kuh3").click(function () {$(this).addClass('active'); $('.kuh2,.kuh1,.kuh4,.kuh5,.kuh6').removeClass('active');$('.blok3').removeClass('opa0');$('.blok1,.blok4,.blok2,.blok5,.blok6').addClass('opa0'); });
			// $(".kuh4").click(function () {$(this).addClass('active'); $('.kuh2,.kuh3,.kuh1,.kuh5,.kuh6').removeClass('active');$('.blok4').removeClass('opa0');$('.blok1,.blok3,.blok2,.blok5,.blok6').addClass('opa0'); });
			// $(".kuh5").click(function () {$(this).addClass('active'); $('.kuh2,.kuh3,.kuh4,.kuh1,.kuh6').removeClass('active');$('.blok5').removeClass('opa0');$('.blok1,.blok3,.blok4,.blok2,.blok6').addClass('opa0'); });
			// $(".kuh6").click(function () {$(this).addClass('active'); $('.kuh2,.kuh3,.kuh4,.kuh1,.kuh5').removeClass('active');$('.blok6').removeClass('opa0');$('.blok1,.blok3,.blok4,.blok2,.blok5').addClass('opa0'); });
			// $("a.price1").click(function () { $('.el1,.bg.sme').removeClass('dispn'); });
			// $("a.price2").click(function () { $('.el2,.bg.sme').removeClass('dispn'); });
			// $("a.price3").click(function () { $('.el3,.bg.sme').removeClass('dispn'); });
			// $("a.price4").click(function () { $('.el4,.bg.sme').removeClass('dispn'); });
			// $("a.price5").click(function () { $('.el5,.bg.sme').removeClass('dispn'); });
			// $("a.price6").click(function () { $('.el6,.bg.sme').removeClass('dispn'); });
			// $("a.price7").click(function () { $('.el7,.bg.sme').removeClass('dispn'); });
			// $("a.price8").click(function () { $('.el8,.bg.sme').removeClass('dispn'); });
			// $(".step1 .butt").click(function () {$(this).parent().addClass("dispn"); $('.step2').removeClass('dispn'); });
			// $(".step2 .butt").click(function () {$(this).parent().addClass("dispn"); $('.step3').removeClass('dispn'); });
			// $(".step3 .butt").click(function () {$(this).parent().addClass("dispn"); $('.finish').removeClass('dispn'); });
			// $(".bg.cal").click(function () { $('.callback').addClass('dispn'); });
			// $(".bg.feed").click(function () { $('.calcback').toggleClass('dispn'); });
			// $(".bg.mas").click(function () {$(this).addClass('dispn'); $('.master').addClass('dispn'); });
			// $(".bg.tha").click(function () { $('.thanks').toggleClass('dispn'); });
			// $(".all_menu").mousemove(function () { $('.all_menu_list').removeClass('dispn'); $('.header').addClass('static');  });
			// $(".all_menu_list").mousemove(function () { $('.all_menu_list').removeClass('dispn'); $('.header').addClass('static'); $(this).addClass('active');  });
			// $(".all_menu").mouseout(function () { $('.all_menu_list').addClass('dispn'); $('.header').removeClass('static');   });
			// $(".all_menu_list").mouseout(function () { $('.all_menu_list').addClass('dispn'); $('.header').removeClass('static'); $(this).removeClass('active');  });
			// $(".bg.sme").click(function () { $(this).addClass('dispn');$('.smeta').addClass('dispn'); });
			// $(".close").click(function () { $('.bg.sme').addClass('dispn');$('.bg.mas').addClass('dispn');$('.smeta,.callback,.calcback,.master').addClass('dispn'); });
			//     $(function hideDiv(){
			//         $('.warning,.tha').delay(3000).fadeOut(); 
			//     });
			// $(".posRel input").click(function () { $(this).parent().addClass('up'); });
			// $(".radiobutt label").click(function () { $('.radiobutt label').removeClass('checked'); $(this).addClass('checked'); });

		


	var phoneInput = document.getElementById("call-telcb");
	phoneInput.onblur = function() {
	  var myErrorMessage = document.getElementById('myErrorMessage_phone');
	  if (this.value.length < 16) { 
		if(myErrorMessage === null){
			var newNode = document.createElement('div');
			newNode.setAttribute("id", "myErrorMessage_phone");
			newNode.innerHTML ="<span style='font-size:11px; color:red;position: absolute;top: 39px;border-top: 1px solid;'>введите все цифры вашего номера</span><style>.nosend{padding-bottom: 1px;margin-bottom:-1px;background: #f1f1f18c;}</style>"
			this.after(newNode);
		}
		
	  } else {
		if(myErrorMessage)
			myErrorMessage.remove();
	  }
	};
	
  function mask(inputName, mask, evt) {
    try {
      var text = document.getElementById(inputName);
      var value = text.value;
      try {
        var e = (evt.which) ? evt.which : event.keyCode;
        
      } catch (e1) {}

      var literalPattern=/[0\*]/;
      var numberPattern=/[0-9]/;
      var newValue = "";

      for (var vId = 0, mId = 0 ; mId < mask.length ; ) {
        if (mId >= value.length)
          break;

        if (mask[mId] == '0' && value[vId].match(numberPattern) == null) {
          break;
        }

        while (mask[mId].match(literalPattern) == null) {
          if (value[vId] == mask[mId])
            break;

        newValue += mask[mId++];
      }

      newValue += value[vId++];
      mId++;
    }

    text.value = newValue;
  } catch(e) {}
}

// Калькулятор

const inputsParent = document.querySelector('.fl_l'),
	  inputMetrov = document.querySelector('.metrov'),
	  stoim = document.querySelector('.butt.stoim'),
	  sroki = document.querySelector('.butt.sroki');

// Капитальный ремонт ванной
inputMetrov.addEventListener('input', () => {
	if(document.querySelector('#bath').checked && (document.querySelector('#novostr').checked || document.querySelector('#ftor').checked) && document.querySelector('#kap').checked && (inputMetrov.value > 1 && inputMetrov.value < 16)) {
		if (inputMetrov.value == 2) {
			stoim.innerHTML = '45 000 руб.'
		} else if(inputMetrov.value == 3) {
			stoim.innerHTML = '55 000 руб.'
		} else {
			stoim.innerHTML = (inputMetrov.value - 3) * 5000 + 55000 + ' руб.'
		}
	}
})
document.querySelector('#bath').addEventListener('click', () => {
	if(document.querySelector('#bath').checked && (document.querySelector('#novostr').checked || document.querySelector('#ftor').checked) && document.querySelector('#kap').checked && (inputMetrov.value > 1 && inputMetrov.value < 16)) {
		if (inputMetrov.value == 2) {
			stoim.innerHTML = '45 000 руб.'
		} else if(inputMetrov.value == 3) {
			stoim.innerHTML = '55 000 руб.'
		} else {
			stoim.innerHTML = (inputMetrov.value - 3) * 5000 + 55000 + ' руб.'
		}
	}
})
document.querySelector('#novostr').addEventListener('click', () => {
	if(document.querySelector('#bath').checked && (document.querySelector('#novostr').checked || document.querySelector('#ftor').checked) && document.querySelector('#kap').checked && (inputMetrov.value > 1 && inputMetrov.value < 16)) {
		if (inputMetrov.value == 2) {
			stoim.innerHTML = '45 000 руб.'
		} else if(inputMetrov.value == 3) {
			stoim.innerHTML = '55 000 руб.'
		} else {
			stoim.innerHTML = (inputMetrov.value - 3) * 5000 + 55000 + ' руб.'
		}
	}
})
document.querySelector('#ftor').addEventListener('click', () => {
	if(document.querySelector('#bath').checked && (document.querySelector('#novostr').checked || document.querySelector('#ftor').checked) && document.querySelector('#kap').checked && (inputMetrov.value > 1 && inputMetrov.value < 16)) {
		if (inputMetrov.value == 2) {
			stoim.innerHTML = '45 000 руб.'
		} else if(inputMetrov.value == 3) {
			stoim.innerHTML = '55 000 руб.'
		} else {
			stoim.innerHTML = (inputMetrov.value - 3) * 5000 + 55000 + ' руб.'
		}
	}
})
document.querySelector('#kap').addEventListener('click', () => {
	if(document.querySelector('#bath').checked && (document.querySelector('#novostr').checked || document.querySelector('#ftor').checked) && document.querySelector('#kap').checked && (inputMetrov.value > 1 && inputMetrov.value < 16)) {
		if (inputMetrov.value == 2) {
			stoim.innerHTML = '45 000 руб.'
		} else if(inputMetrov.value == 3) {
			stoim.innerHTML = '55 000 руб.'
		} else {
			stoim.innerHTML = (inputMetrov.value - 3) * 5000 + 55000 + ' руб.'
		}
	}
})

// Евро ремонт ванной
inputMetrov.addEventListener('input', () => {
	if(document.querySelector('#bath').checked && (document.querySelector('#novostr').checked || document.querySelector('#ftor').checked) && document.querySelector('#euro').checked && (inputMetrov.value > 1 && inputMetrov.value < 16)) {
		if (inputMetrov.value == 2) {
			stoim.innerHTML = '50 000 руб.'
		} else if(inputMetrov.value == 3) {
			stoim.innerHTML = '55 000 руб.'
		} else {
			stoim.innerHTML = (inputMetrov.value - 3) * 5000 + 55000 + ' руб.'
		}
	}
})
document.querySelector('#bath').addEventListener('click', () => {
	if(document.querySelector('#bath').checked && (document.querySelector('#novostr').checked || document.querySelector('#ftor').checked) && document.querySelector('#euro').checked && (inputMetrov.value > 1 && inputMetrov.value < 16)) {
		if (inputMetrov.value == 2) {
			stoim.innerHTML = '50 000 руб.'
		} else if(inputMetrov.value == 3) {
			stoim.innerHTML = '55 000 руб.'
		} else {
			stoim.innerHTML = (inputMetrov.value - 3) * 5000 + 55000 + ' руб.'
		}
	}
})
document.querySelector('#novostr').addEventListener('click', () => {
	if(document.querySelector('#bath').checked && (document.querySelector('#novostr').checked || document.querySelector('#ftor').checked) && document.querySelector('#euro').checked && (inputMetrov.value > 1 && inputMetrov.value < 16)) {
		if (inputMetrov.value == 2) {
			stoim.innerHTML = '50 000 руб.'
		} else if(inputMetrov.value == 3) {
			stoim.innerHTML = '55 000 руб.'
		} else {
			stoim.innerHTML = (inputMetrov.value - 3) * 5000 + 55000 + ' руб.'
		}
	}
})
document.querySelector('#ftor').addEventListener('click', () => {
	if(document.querySelector('#bath').checked && (document.querySelector('#novostr').checked || document.querySelector('#ftor').checked) && document.querySelector('#euro').checked && (inputMetrov.value > 1 && inputMetrov.value < 16)) {
		if (inputMetrov.value == 2) {
			stoim.innerHTML = '50 000 руб.'
		} else if(inputMetrov.value == 3) {
			stoim.innerHTML = '55 000 руб.'
		} else {
			stoim.innerHTML = (inputMetrov.value - 3) * 5000 + 55000 + ' руб.'
		}
	}
})
document.querySelector('#euro').addEventListener('click', () => {
	if(document.querySelector('#bath').checked && (document.querySelector('#novostr').checked || document.querySelector('#ftor').checked) && document.querySelector('#euro').checked && (inputMetrov.value > 1 && inputMetrov.value < 16)) {
		if (inputMetrov.value == 2) {
			stoim.innerHTML = '50 000 руб.'
		} else if(inputMetrov.value == 3) {
			stoim.innerHTML = '55 000 руб.'
		} else {
			stoim.innerHTML = (inputMetrov.value - 3) * 5000 + 55000 + ' руб.'
		}
	}
})

// Ремонт ванной с перепланировкой
inputMetrov.addEventListener('input', () => {
	if(document.querySelector('#bath').checked && (document.querySelector('#novostr').checked || document.querySelector('#ftor').checked) && document.querySelector('#spere').checked && (inputMetrov.value > 1 && inputMetrov.value < 16)) {
		if (inputMetrov.value == 2) {
			stoim.innerHTML = '55 000 руб.'
		} else if(inputMetrov.value == 3) {
			stoim.innerHTML = '60 000 руб.'
		} else {
			stoim.innerHTML = (inputMetrov.value - 3) * 5000 + 60000 + ' руб.'
		}
	}
})
document.querySelector('#bath').addEventListener('click', () => {
	if(document.querySelector('#bath').checked && (document.querySelector('#novostr').checked || document.querySelector('#ftor').checked) && document.querySelector('#spere').checked && (inputMetrov.value > 1 && inputMetrov.value < 16)) {
		if (inputMetrov.value == 2) {
			stoim.innerHTML = '55 000 руб.'
		} else if(inputMetrov.value == 3) {
			stoim.innerHTML = '60 000 руб.'
		} else {
			stoim.innerHTML = (inputMetrov.value - 3) * 5000 + 60000 + ' руб.'
		}
	}
})
document.querySelector('#novostr').addEventListener('click', () => {
	if(document.querySelector('#bath').checked && (document.querySelector('#novostr').checked || document.querySelector('#ftor').checked) && document.querySelector('#spere').checked && (inputMetrov.value > 1 && inputMetrov.value < 16)) {
		if (inputMetrov.value == 2) {
			stoim.innerHTML = '55 000 руб.'
		} else if(inputMetrov.value == 3) {
			stoim.innerHTML = '60 000 руб.'
		} else {
			stoim.innerHTML = (inputMetrov.value - 3) * 5000 + 60000 + ' руб.'
		}
	}
})
document.querySelector('#ftor').addEventListener('click', () => {
	if(document.querySelector('#bath').checked && (document.querySelector('#novostr').checked || document.querySelector('#ftor').checked) && document.querySelector('#spere').checked && (inputMetrov.value > 1 && inputMetrov.value < 16)) {
		if (inputMetrov.value == 2) {
			stoim.innerHTML = '55 000 руб.'
		} else if(inputMetrov.value == 3) {
			stoim.innerHTML = '60 000 руб.'
		} else {
			stoim.innerHTML = (inputMetrov.value - 3) * 5000 + 60000 + ' руб.'
		}
	}
})
document.querySelector('#spere').addEventListener('click', () => {
	if(document.querySelector('#bath').checked && (document.querySelector('#novostr').checked || document.querySelector('#ftor').checked) && document.querySelector('#spere').checked && (inputMetrov.value > 1 && inputMetrov.value < 16)) {
		if (inputMetrov.value == 2) {
			stoim.innerHTML = '55 000 руб.'
		} else if(inputMetrov.value == 3) {
			stoim.innerHTML = '60 000 руб.'
		} else {
			stoim.innerHTML = (inputMetrov.value - 3) * 5000 + 60000 + ' руб.'
		}
	}
})

// Туалет капитальный 
inputMetrov.addEventListener('input', () => {
	if(document.querySelector('#toilet').checked && (document.querySelector('#novostr').checked || document.querySelector('#ftor').checked) && document.querySelector('#kap').checked && (inputMetrov.value >= 1 && inputMetrov.value < 16)) {
		if (inputMetrov.value == 1) {
			stoim.innerHTML = '20 000 руб.'
		} else if(inputMetrov.value == 2) {
			stoim.innerHTML = '25 000 руб.'
		} else {
			stoim.innerHTML = (inputMetrov.value - 2) * 5000 + 25000 + 'руб.'
		}
	}
})
document.querySelector('#toilet').addEventListener('click', () => {
	if(document.querySelector('#toilet').checked && (document.querySelector('#novostr').checked || document.querySelector('#ftor').checked) && document.querySelector('#kap').checked && (inputMetrov.value >= 1 && inputMetrov.value < 16)) {
		if (inputMetrov.value == 1) {
			stoim.innerHTML = '20 000 руб.'
		} else if(inputMetrov.value == 2) {
			stoim.innerHTML = '25 000 руб.'
		} else {
			stoim.innerHTML = (inputMetrov.value - 3) * 5000 + 25000 + ' руб.'
		}
	}
})
document.querySelector('#novostr').addEventListener('click', () => {
	if(document.querySelector('#toilet').checked && (document.querySelector('#novostr').checked || document.querySelector('#ftor').checked) && document.querySelector('#kap').checked && (inputMetrov.value >= 1 && inputMetrov.value < 16)) {
		if (inputMetrov.value == 1) {
			stoim.innerHTML = '20 000 руб.'
		} else if(inputMetrov.value == 2) {
			stoim.innerHTML = '25 000 руб.'
		} else {
			stoim.innerHTML = (inputMetrov.value - 3) * 5000 + 25000 + ' руб.'
		}
	}
})
document.querySelector('#ftor').addEventListener('click', () => {
	if(document.querySelector('#toilet').checked && (document.querySelector('#novostr').checked || document.querySelector('#ftor').checked) && document.querySelector('#kap').checked && (inputMetrov.value >= 1 && inputMetrov.value < 16)) {
		if (inputMetrov.value == 1) {
			stoim.innerHTML = '20 000 руб.'
		} else if(inputMetrov.value == 2) {
			stoim.innerHTML = '25 000 руб.'
		} else {
			stoim.innerHTML = (inputMetrov.value - 3) * 5000 + 25000 + ' руб.'
		}
	}
})
document.querySelector('#kap').addEventListener('click', () => {
	if(document.querySelector('#toilet').checked && (document.querySelector('#novostr').checked || document.querySelector('#ftor').checked) && document.querySelector('#kap').checked && (inputMetrov.value >= 1 && inputMetrov.value < 16)) {
		if (inputMetrov.value == 1) {
			stoim.innerHTML = '20 000 руб.'
		} else if(inputMetrov.value == 2) {
			stoim.innerHTML = '25 000 руб.'
		} else {
			stoim.innerHTML = (inputMetrov.value - 3) * 5000 + 25000 + ' руб.'
		}
	}
})

// Туалет евро 
inputMetrov.addEventListener('input', () => {
	if(document.querySelector('#toilet').checked && (document.querySelector('#novostr').checked || document.querySelector('#ftor').checked) && document.querySelector('#euro').checked && (inputMetrov.value >= 1 && inputMetrov.value < 16)) {
		if (inputMetrov.value == 1) {
			stoim.innerHTML = '25 000 руб.'
		} else if(inputMetrov.value == 2) {
			stoim.innerHTML = '30 000 руб.'
		} else {
			stoim.innerHTML = (inputMetrov.value - 2) * 5000 + 30000 + 'руб.'
		}
	}
})
document.querySelector('#toilet').addEventListener('click', () => {
	if(document.querySelector('#toilet').checked && (document.querySelector('#novostr').checked || document.querySelector('#ftor').checked) && document.querySelector('#euro').checked && (inputMetrov.value >= 1 && inputMetrov.value < 16)) {
		if (inputMetrov.value == 1) {
			stoim.innerHTML = '25 000 руб.'
		} else if(inputMetrov.value == 2) {
			stoim.innerHTML = '30 000 руб.'
		} else {
			stoim.innerHTML = (inputMetrov.value - 3) * 5000 + 30000 + ' руб.'
		}
	}
})
document.querySelector('#novostr').addEventListener('click', () => {
	if(document.querySelector('#toilet').checked && (document.querySelector('#novostr').checked || document.querySelector('#ftor').checked) && document.querySelector('#euro').checked && (inputMetrov.value >= 1 && inputMetrov.value < 16)) {
		if (inputMetrov.value == 1) {
			stoim.innerHTML = '25 000 руб.'
		} else if(inputMetrov.value == 2) {
			stoim.innerHTML = '30 000 руб.'
		} else {
			stoim.innerHTML = (inputMetrov.value - 3) * 5000 + 30000 + ' руб.'
		}
	}
})
document.querySelector('#ftor').addEventListener('click', () => {
	if(document.querySelector('#toilet').checked && (document.querySelector('#novostr').checked || document.querySelector('#ftor').checked) && document.querySelector('#euro').checked && (inputMetrov.value >= 1 && inputMetrov.value < 16)) {
		if (inputMetrov.value == 1) {
			stoim.innerHTML = '25 000 руб.'
		} else if(inputMetrov.value == 2) {
			stoim.innerHTML = '30 000 руб.'
		} else {
			stoim.innerHTML = (inputMetrov.value - 3) * 5000 + 30000 + ' руб.'
		}
	}
})
document.querySelector('#euro').addEventListener('click', () => {
	if(document.querySelector('#toilet').checked && (document.querySelector('#novostr').checked || document.querySelector('#ftor').checked) && document.querySelector('#euro').checked && (inputMetrov.value >= 1 && inputMetrov.value < 16)) {
		if (inputMetrov.value == 1) {
			stoim.innerHTML = '25 000 руб.'
		} else if(inputMetrov.value == 2) {
			stoim.innerHTML = '30 000 руб.'
		} else {
			stoim.innerHTML = (inputMetrov.value - 3) * 5000 + 30000 + ' руб.'
		}
	}
})

// Туалет с перепланировкой

inputMetrov.addEventListener('input', () => {
	if(document.querySelector('#toilet').checked && (document.querySelector('#novostr').checked || document.querySelector('#ftor').checked) && document.querySelector('#spere').checked && (inputMetrov.value >= 1 && inputMetrov.value < 16)) {
		if (inputMetrov.value == 1) {
			stoim.innerHTML = '30 000 руб.'
		} else if(inputMetrov.value == 2) {
			stoim.innerHTML = '35 000 руб.'
		} else {
			stoim.innerHTML = (inputMetrov.value - 2) * 5000 + 35000 + 'руб.'
		}
	}
})
document.querySelector('#toilet').addEventListener('click', () => {
	if(document.querySelector('#toilet').checked && (document.querySelector('#novostr').checked || document.querySelector('#ftor').checked) && document.querySelector('#spere').checked && (inputMetrov.value >= 1 && inputMetrov.value < 16)) {
		if (inputMetrov.value == 1) {
			stoim.innerHTML = '30 000 руб.'
		} else if(inputMetrov.value == 2) {
			stoim.innerHTML = '35 000 руб.'
		} else {
			stoim.innerHTML = (inputMetrov.value - 2) * 5000 + 35000 + ' руб.'
		}
	}
})
document.querySelector('#novostr').addEventListener('click', () => {
	if(document.querySelector('#toilet').checked && (document.querySelector('#novostr').checked || document.querySelector('#ftor').checked) && document.querySelector('#spere').checked && (inputMetrov.value >= 1 && inputMetrov.value < 16)) {
		if (inputMetrov.value == 1) {
			stoim.innerHTML = '30 000 руб.'
		} else if(inputMetrov.value == 2) {
			stoim.innerHTML = '35 000 руб.'
		} else {
			stoim.innerHTML = (inputMetrov.value - 2) * 5000 + 35000 + ' руб.'
		}
	}
})
document.querySelector('#ftor').addEventListener('click', () => {
	if(document.querySelector('#toilet').checked && (document.querySelector('#novostr').checked || document.querySelector('#ftor').checked) && document.querySelector('#spere').checked && (inputMetrov.value >= 1 && inputMetrov.value < 16)) {
		if (inputMetrov.value == 1) {
			stoim.innerHTML = '30 000 руб.'
		} else if(inputMetrov.value == 2) {
			stoim.innerHTML = '35 000 руб.'
		} else {
			stoim.innerHTML = (inputMetrov.value - 2) * 5000 + 35000 + ' руб.'
		}
	}
})
document.querySelector('#spere').addEventListener('click', () => {
	if(document.querySelector('#toilet').checked && (document.querySelector('#novostr').checked || document.querySelector('#ftor').checked) && document.querySelector('#spere').checked && (inputMetrov.value >= 1 && inputMetrov.value < 16)) {
		if (inputMetrov.value == 1) {
			stoim.innerHTML = '30 000 руб.'
		} else if(inputMetrov.value == 2) {
			stoim.innerHTML = '35 000 руб.'
		} else {
			stoim.innerHTML = (inputMetrov.value - 2) * 5000 + 35000 + ' руб.'
		}
	}
})

// Капитальный совмещенный санузел 
inputMetrov.addEventListener('input', () => {
	if(document.querySelector('#sovsan').checked && (document.querySelector('#novostr').checked || document.querySelector('#ftor').checked) && document.querySelector('#kap').checked && (inputMetrov.value > 2 && inputMetrov.value < 16)) {
		if (inputMetrov.value == 3) {
			stoim.innerHTML = '78 000 руб.'
		} else {
			stoim.innerHTML = (inputMetrov.value - 3) * 10000 + 78000 + 'руб.'
		}
	}
})
document.querySelector('#sovsan').addEventListener('click', () => {
	if(document.querySelector('#sovsan').checked && (document.querySelector('#novostr').checked || document.querySelector('#ftor').checked) && document.querySelector('#kap').checked && (inputMetrov.value > 2 && inputMetrov.value < 16)) {
		if (inputMetrov.value == 3) {
			stoim.innerHTML = '78 000 руб.'
		} else {
			stoim.innerHTML = (inputMetrov.value - 3) * 10000 + 78000 + ' руб.'
		}
	}
})
document.querySelector('#novostr').addEventListener('click', () => {
	if(document.querySelector('#sovsan').checked && (document.querySelector('#novostr').checked || document.querySelector('#ftor').checked) && document.querySelector('#kap').checked && (inputMetrov.value > 2 && inputMetrov.value < 16)) {
		if (inputMetrov.value == 3) {
			stoim.innerHTML = '78 000 руб.'
		} else {
			stoim.innerHTML = (inputMetrov.value - 3) * 10000 + 78000 + ' руб.'
		}
	}
})
document.querySelector('#ftor').addEventListener('click', () => {
	if(document.querySelector('#sovsan').checked && (document.querySelector('#novostr').checked || document.querySelector('#ftor').checked) && document.querySelector('#kap').checked && (inputMetrov.value > 2 && inputMetrov.value < 16)) {
		if (inputMetrov.value == 3) {
			stoim.innerHTML = '78 000 руб.'
		} else {
			stoim.innerHTML = (inputMetrov.value - 3) * 10000 + 78000 + ' руб.'
		}
	}
})
document.querySelector('#kap').addEventListener('click', () => {
	if(document.querySelector('#sovsan').checked && (document.querySelector('#novostr').checked || document.querySelector('#ftor').checked) && document.querySelector('#kap').checked && (inputMetrov.value > 2 && inputMetrov.value < 16)) {
		if (inputMetrov.value == 3) {
			stoim.innerHTML = '78 000 руб.'
		} else {
			stoim.innerHTML = (inputMetrov.value - 3) * 10000 + 78000 + ' руб.'
		}
	}
})

// Евро ремонт совмещенный санузел

inputMetrov.addEventListener('input', () => {
	if(document.querySelector('#sovsan').checked && (document.querySelector('#novostr').checked || document.querySelector('#ftor').checked) && document.querySelector('#euro').checked && (inputMetrov.value > 2 && inputMetrov.value < 16)) {
		if (inputMetrov.value == 3) {
			stoim.innerHTML = '95 000 руб.'
		} else {
			stoim.innerHTML = (inputMetrov.value - 3) * 10000 + 95000 + 'руб.'
		}
	}
})
document.querySelector('#sovsan').addEventListener('click', () => {
	if(document.querySelector('#sovsan').checked && (document.querySelector('#novostr').checked || document.querySelector('#ftor').checked) && document.querySelector('#euro').checked && (inputMetrov.value > 2 && inputMetrov.value < 16)) {
		if (inputMetrov.value == 3) {
			stoim.innerHTML = '95 000 руб.'
		} else {
			stoim.innerHTML = (inputMetrov.value - 3) * 10000 + 95000 + ' руб.'
		}
	}
})
document.querySelector('#novostr').addEventListener('click', () => {
	if(document.querySelector('#sovsan').checked && (document.querySelector('#novostr').checked || document.querySelector('#ftor').checked) && document.querySelector('#euro').checked && (inputMetrov.value > 2 && inputMetrov.value < 16)) {
		if (inputMetrov.value == 3) {
			stoim.innerHTML = '95 000 руб.'
		} else {
			stoim.innerHTML = (inputMetrov.value - 3) * 10000 + 95000 + ' руб.'
		}
	}
})
document.querySelector('#ftor').addEventListener('click', () => {
	if(document.querySelector('#sovsan').checked && (document.querySelector('#novostr').checked || document.querySelector('#ftor').checked) && document.querySelector('#euro').checked && (inputMetrov.value > 2 && inputMetrov.value < 16)) {
		if (inputMetrov.value == 3) {
			stoim.innerHTML = '95 000 руб.'
		} else {
			stoim.innerHTML = (inputMetrov.value - 3) * 10000 + 95000 + ' руб.'
		}
	}
})
document.querySelector('#euro').addEventListener('click', () => {
	if(document.querySelector('#sovsan').checked && (document.querySelector('#novostr').checked || document.querySelector('#ftor').checked) && document.querySelector('#euro').checked && (inputMetrov.value > 2 && inputMetrov.value < 16)) {
		if (inputMetrov.value == 3) {
			stoim.innerHTML = '95 000 руб.'
		} else {
			stoim.innerHTML = (inputMetrov.value - 3) * 10000 + 95000 + ' руб.'
		}
	}
})

// Совмещенный с перепланировкой

inputMetrov.addEventListener('input', () => {
	if(document.querySelector('#sovsan').checked && (document.querySelector('#novostr').checked || document.querySelector('#ftor').checked) && document.querySelector('#spere').checked && (inputMetrov.value > 2 && inputMetrov.value < 16)) {
		if (inputMetrov.value == 3) {
			stoim.innerHTML = '105 000 руб.'
		} else {
			stoim.innerHTML = (inputMetrov.value - 3) * 10000 + 105000 + 'руб.'
		}
	}
})
document.querySelector('#sovsan').addEventListener('click', () => {
	if(document.querySelector('#sovsan').checked && (document.querySelector('#novostr').checked || document.querySelector('#ftor').checked) && document.querySelector('#spere').checked && (inputMetrov.value > 2 && inputMetrov.value < 16)) {
		if (inputMetrov.value == 3) {
			stoim.innerHTML = '105 000 руб.'
		} else {
			stoim.innerHTML = (inputMetrov.value - 3) * 10000 + 105000 + ' руб.'
		}
	}
})
document.querySelector('#novostr').addEventListener('click', () => {
	if(document.querySelector('#sovsan').checked && (document.querySelector('#novostr').checked || document.querySelector('#ftor').checked) && document.querySelector('#spere').checked && (inputMetrov.value > 2 && inputMetrov.value < 16)) {
		if (inputMetrov.value == 3) {
			stoim.innerHTML = '105 000 руб.'
		} else {
			stoim.innerHTML = (inputMetrov.value - 3) * 10000 + 105000 + ' руб.'
		}
	}
})
document.querySelector('#ftor').addEventListener('click', () => {
	if(document.querySelector('#sovsan').checked && (document.querySelector('#novostr').checked || document.querySelector('#ftor').checked) && document.querySelector('#spere').checked && (inputMetrov.value > 2 && inputMetrov.value < 16)) {
		if (inputMetrov.value == 3) {
			stoim.innerHTML = '105 000 руб.'
		} else {
			stoim.innerHTML = (inputMetrov.value - 3) * 10000 + 105000 + ' руб.'
		}
	}
})
document.querySelector('#spere').addEventListener('click', () => {
	if(document.querySelector('#sovsan').checked && (document.querySelector('#novostr').checked || document.querySelector('#ftor').checked) && document.querySelector('#spere').checked && (inputMetrov.value > 2 && inputMetrov.value < 16)) {
		if (inputMetrov.value == 3) {
			stoim.innerHTML = '105 000 руб.'
		} else {
			stoim.innerHTML = (inputMetrov.value - 3) * 10000 + 105000 + ' руб.'
		}
	}
})

// Раздельный капитальный

inputMetrov.addEventListener('input', () => {
	if(document.querySelector('#rassan').checked && (document.querySelector('#novostr').checked || document.querySelector('#ftor').checked) && document.querySelector('#kap').checked && (inputMetrov.value > 2 && inputMetrov.value < 16)) {
		if (inputMetrov.value == 3) {
			stoim.innerHTML = '75 000 руб.'
		} else {
			stoim.innerHTML = (inputMetrov.value - 3) * 5000 + 75000 + 'руб.'
		}
	}
})
document.querySelector('#rassan').addEventListener('click', () => {
	if(document.querySelector('#rassan').checked && (document.querySelector('#novostr').checked || document.querySelector('#ftor').checked) && document.querySelector('#kap').checked && (inputMetrov.value > 2 && inputMetrov.value < 16)) {
		if (inputMetrov.value == 3) {
			stoim.innerHTML = '75 000 руб.'
		} else {
			stoim.innerHTML = (inputMetrov.value - 3) * 5000 + 75000 + ' руб.'
		}
	}
})
document.querySelector('#novostr').addEventListener('click', () => {
	if(document.querySelector('#rassan').checked && (document.querySelector('#novostr').checked || document.querySelector('#ftor').checked) && document.querySelector('#kap').checked && (inputMetrov.value > 2 && inputMetrov.value < 16)) {
		if (inputMetrov.value == 3) {
			stoim.innerHTML = '75 000 руб.'
		} else {
			stoim.innerHTML = (inputMetrov.value - 3) * 5000 + 75000 + ' руб.'
		}
	}
})
document.querySelector('#ftor').addEventListener('click', () => {
	if(document.querySelector('#rassan').checked && (document.querySelector('#novostr').checked || document.querySelector('#ftor').checked) && document.querySelector('#kap').checked && (inputMetrov.value > 2 && inputMetrov.value < 16)) {
		if (inputMetrov.value == 3) {
			stoim.innerHTML = '75 000 руб.'
		} else {
			stoim.innerHTML = (inputMetrov.value - 3) * 5000 + 75000 + ' руб.'
		}
	}
})
document.querySelector('#kap').addEventListener('click', () => {
	if(document.querySelector('#rassan').checked && (document.querySelector('#novostr').checked || document.querySelector('#ftor').checked) && document.querySelector('#kap').checked && (inputMetrov.value > 2 && inputMetrov.value < 16)) {
		if (inputMetrov.value == 3) {
			stoim.innerHTML = '75 000 руб.'
		} else {
			stoim.innerHTML = (inputMetrov.value - 3) * 5000 + 75000 + ' руб.'
		}
	}
})

// Раздельный евро

inputMetrov.addEventListener('input', () => {
	if(document.querySelector('#rassan').checked && (document.querySelector('#novostr').checked || document.querySelector('#ftor').checked) && document.querySelector('#euro').checked && (inputMetrov.value > 2 && inputMetrov.value < 16)) {
		if (inputMetrov.value == 3) {
			stoim.innerHTML = '85 000 руб.'
		} else {
			stoim.innerHTML = (inputMetrov.value - 3) * 10000 + 85000 + 'руб.'
		}
	}
})
document.querySelector('#rassan').addEventListener('click', () => {
	if(document.querySelector('#rassan').checked && (document.querySelector('#novostr').checked || document.querySelector('#ftor').checked) && document.querySelector('#euro').checked && (inputMetrov.value > 2 && inputMetrov.value < 16)) {
		if (inputMetrov.value == 3) {
			stoim.innerHTML = '85 000 руб.'
		} else {
			stoim.innerHTML = (inputMetrov.value - 3) * 10000 + 85000 + ' руб.'
		}
	}
})
document.querySelector('#novostr').addEventListener('click', () => {
	if(document.querySelector('#rassan').checked && (document.querySelector('#novostr').checked || document.querySelector('#ftor').checked) && document.querySelector('#euro').checked && (inputMetrov.value > 2 && inputMetrov.value < 16)) {
		if (inputMetrov.value == 3) {
			stoim.innerHTML = '85 000 руб.'
		} else {
			stoim.innerHTML = (inputMetrov.value - 3) * 10000 + 85000 + ' руб.'
		}
	}
})
document.querySelector('#ftor').addEventListener('click', () => {
	if(document.querySelector('#rassan').checked && (document.querySelector('#novostr').checked || document.querySelector('#ftor').checked) && document.querySelector('#euro').checked && (inputMetrov.value > 2 && inputMetrov.value < 16)) {
		if (inputMetrov.value == 3) {
			stoim.innerHTML = '85 000 руб.'
		} else {
			stoim.innerHTML = (inputMetrov.value - 3) * 10000 + 85000 + ' руб.'
		}
	}
})
document.querySelector('#euro').addEventListener('click', () => {
	if(document.querySelector('#rassan').checked && (document.querySelector('#novostr').checked || document.querySelector('#ftor').checked) && document.querySelector('#euro').checked && (inputMetrov.value > 2 && inputMetrov.value < 16)) {
		if (inputMetrov.value == 3) {
			stoim.innerHTML = '85 000 руб.'
		} else {
			stoim.innerHTML = (inputMetrov.value - 3) * 10000 + 85000 + ' руб.'
		}
	}
})

// Раздельный с перепланировкой

inputMetrov.addEventListener('input', () => {
	if(document.querySelector('#rassan').checked && (document.querySelector('#novostr').checked || document.querySelector('#ftor').checked) && document.querySelector('#spere').checked && (inputMetrov.value > 2 && inputMetrov.value < 16)) {
		if (inputMetrov.value == 3) {
			stoim.innerHTML = '95 000 руб.'
		} else {
			stoim.innerHTML = (inputMetrov.value - 3) * 10000 + 95000 + 'руб.'
		}
	}
})
document.querySelector('#rassan').addEventListener('click', () => {
	if(document.querySelector('#rassan').checked && (document.querySelector('#novostr').checked || document.querySelector('#ftor').checked) && document.querySelector('#spere').checked && (inputMetrov.value > 2 && inputMetrov.value < 16)) {
		if (inputMetrov.value == 3) {
			stoim.innerHTML = '95 000 руб.'
		} else {
			stoim.innerHTML = (inputMetrov.value - 3) * 10000 + 95000 + ' руб.'
		}
	}
})
document.querySelector('#novostr').addEventListener('click', () => {
	if(document.querySelector('#rassan').checked && (document.querySelector('#novostr').checked || document.querySelector('#ftor').checked) && document.querySelector('#spere').checked && (inputMetrov.value > 2 && inputMetrov.value < 16)) {
		if (inputMetrov.value == 3) {
			stoim.innerHTML = '95 000 руб.'
		} else {
			stoim.innerHTML = (inputMetrov.value - 3) * 10000 + 95000 + ' руб.'
		}
	}
})
document.querySelector('#ftor').addEventListener('click', () => {
	if(document.querySelector('#rassan').checked && (document.querySelector('#novostr').checked || document.querySelector('#ftor').checked) && document.querySelector('#spere').checked && (inputMetrov.value > 2 && inputMetrov.value < 16)) {
		if (inputMetrov.value == 3) {
			stoim.innerHTML = '95 000 руб.'
		} else {
			stoim.innerHTML = (inputMetrov.value - 3) * 10000 + 95000 + ' руб.'
		}
	}
})
document.querySelector('#spere').addEventListener('click', () => {
	if(document.querySelector('#rassan').checked && (document.querySelector('#novostr').checked || document.querySelector('#ftor').checked) && document.querySelector('#spere').checked && (inputMetrov.value > 2 && inputMetrov.value < 16)) {
		if (inputMetrov.value == 3) {
			stoim.innerHTML = '95 000 руб.'
		} else {
			stoim.innerHTML = (inputMetrov.value - 3) * 10000 + 95000 + ' руб.'
		}
	}
})



