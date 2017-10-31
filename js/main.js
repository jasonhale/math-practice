var mt = {
	settings : {
		totalProbs : 100,
		problemtypes : {
			addition : true,
			subtraction : false,
			multiplication : false,
			division : false
		},
		numbers : {
			setByMinMax : true,
			setByTotAmt : false,
			minNum : 0,
			maxNum : 9,
			maxAnswerTotal : 20
		},
		style : 'horizontal'
	},
	problemtypes : {
		addition : '+',
		subtraction : '-',
		multiplication : 'x',
		division : '/'
	},
	getRandomInt : function(min, max){
		return Math.floor(Math.random() * (max - min)) + min;
	},
	simpleValidateOnInput : function(){
		var el = $(this);
		var inp = $(this).val();
		//var lastVal = inp % 10;
		if(isNaN(inp)){
			// if input is a string (aka 'not-a-number'), don't allow that input in the input field
			if(inp.length > 1) { // if there was already part of an answer given...
				var lastVal = inp.charAt(inp.length-1), // get the very last item in the list
					initVal = inp.substr(0,inp.length-1); // get the typed answer minus this last addition
				$(el).val(initVal).attr({
					'data-solve' : lastVal
				});
			} else {
				$(el).val('').attr({
					'data-solve' : '' // ...just make sure the answer and attribute are cleared out if there wasn't an answer to begin with.
				});
			}
		} else {
			// hey, it's a number.  update the value and data-solve attribute.
			$(el).attr({
				'data-solve' : inp
			});
			if(el.hasClass('incorrect')){
				el.addClass('incorrect-fixed');
			}
		}
	},
	answerModal : function(totals){
		// assigns values to modal and shows modal.
		totals = totals || {};
		var mod = $('.js-modal-answers');
		mod.find('.total-answered').text(totals.answered+'/'+totals.problems);
		mod.find('.total-correct').text(totals.correct+'/'+totals.answered);
		mod.find('.total-incorrect').text((totals.answered-totals.correct)+'/'+totals.answered);
		$('.js-modal, .js-modal-overlay, .js-modal-answers').show();
	},
	closeModal : function(){
		// closes modal.
		$('.js-modal, .js-modal-overlay, .js-modal-box').hide();
	},
	buildProbs : function(total){
		// create and show problem.  Loops as many times as the current problem count is set.

		// more than one type of problem?  If so, set a global setting and store a local array of only those problem types that are chosen/set.
		var probtypes = Object.keys(mt.settings.problemtypes);
		var multProb = [];
		for(var i = 0; i < probtypes.length; i++){
			if(mt.settings.problemtypes[probtypes[i]]) multProb.push(probtypes[i]);
		}
		if ( multProb.length > 1 ) mt.settings.multProbTypes = true;
		else mt.settings.multProbTypes = false;

		for (var i = 0; i < total; i++) {
			var numA = mt.getRandomInt(mt.settings.numbers.minNum, mt.settings.numbers.maxNum),
				numB = mt.getRandomInt(mt.settings.numbers.minNum, mt.settings.numbers.maxNum),
				oper = '',
				answer,
				probtype = '';

			//	If there are multiple problem types, pick one at random.
			//	Otherwise, just grab the one.
			if (mt.settings.multProbTypes) probtype = multProb[Math.floor(Math.random() * multProb.length)];
			else probtype = multProb[0];

			// in the case of subtraction, lets just put the larger number on top for now so we don't have to deal with negative numbers.
			if(probtype=='subtraction' && numA<numB) {
				var tmp = numA;
				numA = numB;
				numB = tmp;
			}

			// get answer
			switch (probtype){
				case 'addition':
					answer = numA + numB;
					break;

				case 'subtraction':
					answer = numA - numB;
					break;

				case 'multiplication':
					answer = numA * numB;
					break;

				case 'division':
					answer = numA / numB;
					break;
			}

			var template = $('.prob.template').clone();
			$(template).removeClass('template');
			$(template).attr({
				'data-index' : i+1,
				'data-problemtype' : probtype
			});
			$(template).find('.question').attr({
				'for'			: 'problem'+i
			});
			$(template).find('.num-a').text(''+numA);
			$(template).find('.num-b').text(''+numB);
			$(template).find('.operator').text(mt.problemtypes[probtype]);
			$(template).find('.answer').attr({
				'id'			: 'problem'+i,
				'tab-index'		: i,
				'name'			: 'answer'+i,
				'data-answer'	: answer
			});
			$(template).appendTo($('.problems'));
		};
	},
	checkanswers : function(){
		// goes through each problem and checks whether it is correct/incorrect.
		var totals = {
			'problems'	: 0,
			'answered'	: 0,
			'correct'	: 0
		};
		$('.problems .prob').each(function(){
			var prob = $(this),
				answer = $(this).find('.answer'),
				answerNum = parseInt(answer.attr('data-answer')),
				solvedNum = answer.val();
			++totals.problems;
			if(solvedNum != ''){
				++totals.answered;
				if(answerNum == solvedNum){
					// correct answer
					answer.removeClass('incorrect-fixed').removeClass('incorrect').addClass('correct');
					answer.prop('disabled',true);
					++totals.correct;
				} else {
					// incorrect answer
					answer.removeClass('incorrect-fixed').addClass('incorrect');
				}
			}
		});
		mt.answerModal(totals);
	},
	clearanswers : function(){
		// clears answers without creating new problems.
		$('.prob .answer').val('').attr('data-solve','').removeClass('incorrect incorrect-fixed correct').prop('disabled',false);
	},
	regenerate : function(){
		// remove all current problems and generate new ones.
		mt.settingsSet();
		$('.problems .prob').remove();
		mt.buildProbs(mt.settings.totalProbs);
	},
	itemsSet : function(){
		// apply settings to items on the page that require them.
		$('input.js-max-count').val(mt.settings.totalProbs);
		$('.js-problems').removeClass('problems-vertical').removeClass('problems-horizontal').addClass('problems-'+mt.settings.style.toLowerCase());
	},
	setInitialSettings : function(){
		// set initial settings.  If there's info stored client side, use it.  otherwise use defaults.
		if(Modernizr.localstorage){
			if(localStorage['MathPractice.settings']){
				mt.settings = JSON.parse(localStorage['MathPractice.settings']);
			} else {
				localStorage['MathPractice.settings'] = JSON.stringify(mt.settings);
			}
		}
		/*
			TODO: set settings UI to values in mt.settings
		*/
		// assign values to markup
		var $settings = $('#settingsUI'),
			s = mt.settings;
		$settings.find('#operandAddition').prop('checked',s.problemtypes.addition);
		$settings.find('#operandSubtraction').prop('checked',s.problemtypes.subtraction);
		$settings.find('#operandMultiplication').prop('checked',s.problemtypes.multiplication);
		$settings.find('#operandAdditionDivision').prop('checked',s.problemtypes.division);

		$settings.find('#setNumMinMax').prop('checked',s.numbers.setByMinMax).parent().find('.js-setnumber').prop('disabled',!s.numbers.setByMinMax);
		$settings.find('#setNumAnsTotal').prop('checked',s.numbers.setByTotAmt).parent().find('.js-setnumber').prop('disabled',!s.numbers.setByTotAmt);
		$settings.find('#smNumSize').val(s.numbers.minNum);
		$settings.find('#lgNumSize').val(s.numbers.maxNum);
		$settings.find('#totMaxAmt').val(s.numbers.maxAnswerTotal);
		
		$settings.find('.js-probstyle-input[value!='+s.style+']').prop('checked',false);
		$settings.find('.js-probstyle-input[value='+s.style+']').prop('checked',true);

		mt.itemsSet();
	},
	settingsSet : function(){
		// get settings from #settingsUI and save to globals/localStorage.
		var $settings = $('#settingsUI'),
			s = {
				totalProbs : parseInt($('.js-max-count').val()),
				problemtypes : {
					addition : $settings.find('#operandAddition').prop('checked'),
					subtraction : $settings.find('#operandSubtraction').prop('checked'),
					multiplication : $settings.find('#operandMultiplication').prop('checked'),
					division : $settings.find('#operandAdditionDivision').prop('checked')
				},
				numbers : {
					setByMinMax : $settings.find('#setNumMinMax').prop('checked'),
					minNum : parseInt($settings.find('#smNumSize').val()),
					maxNum : parseInt($settings.find('#lgNumSize').val()),
					setByTotAmt : $settings.find('#setNumAnsTotal').prop('checked'),
					maxAnswerTotal : parseInt($settings.find('#totMaxAmt').val())
				},
				style : $('.js-probstyle-input:checked').val()
			};
		mt.settings = s;
		localStorage['MathPractice.settings'] = JSON.stringify(s);

		mt.itemsSet();
	},
	settingsGo : function(){
		// close settings window and get new probs with new settings.
		/*
			TODO: close settings window ...?
		*/
		mt.settingsSet();
		mt.regenerate();
	},
	valSettingsOperands : function(){
		// Run check if there is at least one problem type selected.  If not, prompts error message.
		var $set = $('.operands .validate.types');
		var add = $set.find('.operand-addition').prop('checked'),
			sub = $set.find('.operand-subtraction').prop('checked'),
			mul = $set.find('.operand-multiplication').prop('checked'),
			div = $set.find('.operand-division').prop('checked'),
			validity;
		if(!add && !sub && !mul && !div) {
			$set.parent().find('.error-message').css({'visibility':'visible'});
			validity = false;
		} else {
			$set.parent().find('.error-message').css({'visibility':'hidden'});
			validity = true;
		}
		return validity;
	},
	valSettingsMinMax : function(){
		var $set = $('.numbers .validate.minmax');
		var min = $set.find('#smNumSize').val(),
			max = $set.find('#lgNumSize').val(),
			validity;
		if(min <= max) {
			// valid
			$set.find('.error-message').css({'visibility':'hidden'});
			validity = true;
		} else {
			// invalid
			$set.find('.error-message').css({'visibility':'visible'});
			validity = false;
		}
		return validity;
	},
	settingsSubmit : function(){
		// run validate tests
		var operandValid = mt.valSettingsOperands();
		var minmaxValid = mt.valSettingsMinMax();

		// if pass, set settings
		if(operandValid && minmaxValid) mt.settingsGo();
	},
	buttonBindings : function(){
		// binding custom events to buttons on the page.
		$('.settings-menu-toggle').on('click',function(){
			var $a = $(this).parents('.settings');
			if($a.hasClass('open')) $a.removeClass('open');
			else $a.addClass('open');
		});
		$('.js-setnumbers').on('change',function(){
			var $a = $(this);
			$a.parent().find('.js-setnumber').prop('disabled',false);
			$('.js-setnumbers[id!='+$a.attr('id')+']').parent().find('.js-setnumber').prop('disabled',true);
		});
		$('.js-settings-submit').on('click',mt.settingsSubmit);

		$('.js-checkanswers').on('click',mt.checkanswers);
		$('.js-clearanswers').on('click',mt.clearanswers);
		$('.js-regenerate').on('click',mt.regenerate);
		$('#MathSentences input.answer').bind('input propertychange', mt.simpleValidateOnInput);
		$('.js-modal-continue, .js-modal-overlay').on('click', mt.closeModal);
	},
	addCornify : function(){
		// WHEEEE!!
		for(i=0; i<$('.js-max-count').val(); i++ ){ cornify_add(); }
	},
	init : function(){
		/*
			use localStorage
		*/
		mt.setInitialSettings();

		mt.buildProbs(mt.settings.totalProbs);
		mt.buttonBindings();
	}
};

mt.init();