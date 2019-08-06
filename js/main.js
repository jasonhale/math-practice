const _q = (q) => document.querySelector(q);
const _qall = (q) => document.querySelectorAll(q);

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
	simpleValidateOnInput : function(e){
		var el = this;
		var inp = e.target.value;
		//var lastVal = inp % 10;
		if(isNaN(inp)){
			// if input is a string (aka 'not-a-number'), don't allow that input in the input field
			if(inp.length > 1) { // if there was already part of an answer given...
				var lastVal = inp.charAt(inp.length-1), // get the very last item in the list
					initVal = inp.substr(0,inp.length-1); // get the typed answer minus this last addition
				el.value = initVal;
				el.dataset.solve = lastVal;
			} else {
				el.value = '';
				el.dataset.solve = '';
			}
		} else {
			// hey, it's a number.  update the value and data-solve attribute.
			el.dataset.solve = inp;
			if (el.classList.contains('incorrect')) {
				el.classList.add('incorrect-fixed');
			}
		}
	},
	answerModal : function(totals){
		// assigns values to modal and shows modal.
		totals = totals || {};
		const mod = _q('.js-modal-answers');
		_q('.js-modal-answers .total-answered').innerText = `${totals.answered}/${totals.problems}`; //.text(totals.answered+'/'+totals.problems);
		_q('.js-modal-answers .total-correct').innerText = `${totals.correct}/${totals.answered}`; //.text(totals.correct+'/'+totals.answered);
		_q('.js-modal-answers .total-incorrect').innerText = `${totals.answered - totals.correct}/${totals.answered}`; //.text((totals.answered-totals.correct)+'/'+totals.answered);
		_q('.js-modal').style.display = 'flex';
		_q('.js-modal-overlay').style.display = 'block';
		_q('.js-modal-answers').style.display = 'block';
	},
	closeModal : function(){
		// closes modal.
		// $('.js-modal, .js-modal-overlay, .js-modal-box').hide();

		_q('.js-modal').style.display = 'none';
		_q('.js-modal-overlay').style.display = 'none';
		_q('.js-modal-answers').style.display = 'none';
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

			var template = _q('.prob.template').cloneNode(true);
			template.classList.remove('template');
			template.dataset.index = i + 1;
			template.dataset.problemtype = probtype;
			template.querySelector('.question').setAttribute('for', 'problem'+i);
			template.querySelector('.num-a').innerText = ''+numA;
			template.querySelector('.num-b').innerText = ''+numB;
			template.querySelector('.operator').innerText = mt.problemtypes[probtype];
			var answerNode = template.querySelector('.answer');
			answerNode.setAttribute('id', 'problem'+i);
			answerNode.setAttribute('tab-index', i);
			answerNode.setAttribute('name', 'answer'+i);
			answerNode.dataset.answer = answer;
			_q('.problems').appendChild(template);
		};
	},
	checkanswers : function(){
		// goes through each problem and checks whether it is correct/incorrect.
		var totals = {
			'problems'	: 0,
			'answered'	: 0,
			'correct'	: 0
		};
		_qall('.problems .prob').forEach(function(prob){
			var answer = prob.querySelector('.answer');
			var answerNum = parseInt(answer.dataset.answer);
			var solvedNum = answer.value;

			++totals.problems;

			if(solvedNum != ''){
				++totals.answered;
				if(answerNum == solvedNum){
					// correct answer
					answer.classList.remove('incorrect-fixed', 'incorrect');
					answer.classList.add('correct');
					answer.setAttribute('disabled', true);
					++totals.correct;
				} else {
					// incorrect answer
					answer.classList.remove('incorrect-fixed');
					answer.classList.add('incorrect');
				}
			}
		});
		mt.answerModal(totals);
	},
	clearanswers : function(){
		// clears answers without creating new problems.
		_qall('.prob .answer').forEach(function(ans) {
			ans.value = '';
			ans.dataset.solve = 0;
			ans.classList.remove('incorrect', 'incorrect-fixed', 'correct');
			ans.removeAttribute('disabled');
		});
	},
	regenerate : function(){
		// remove all current problems and generate new ones.
		mt.settingsSet();
		_qall('.problems .prob').forEach(function(prob) {
			prob.parentNode.removeChild(prob);
		});
		mt.buildProbs(mt.settings.totalProbs);
	},
	itemsSet : function(){
		// apply settings to items on the page that require them.
		_q('input.js-max-count').value = mt.settings.totalProbs;
		_q('.js-problems').classList.remove('problems-vertical', 'problems-horizontal');
		_q('.js-problems').classList.add(`problems-${mt.settings.style.toLowerCase()}`);
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
		const settings = _q('#settingsUI'),
			s = mt.settings;
		settings.querySelector('#operandAddition').setAttribute('checked', s.problemtypes.addition);
		settings.querySelector('#operandSubtraction').setAttribute('checked', s.problemtypes.subtraction);
		settings.querySelector('#operandMultiplication').setAttribute('checked', s.problemtypes.multiplication);
		settings.querySelector('#operandDivision').setAttribute('checked', s.problemtypes.division);

		settings.querySelector('#setNumMinMax').setAttribute('checked', s.numbers.setByMinMax)
		settings.querySelector('#setNumMinMax').parentNode.querySelector('.js-setnumber').setAttribute('disabled', !s.numbers.setByMinMax);
		settings.querySelector('#setNumAnsTotal').setAttribute('checked',s.numbers.setByTotAmt);
		settings.querySelector('#setNumAnsTotal').parentNode.querySelector('.js-setnumber').setAttribute('disabled',!s.numbers.setByTotAmt);
		settings.querySelector('#smNumSize').value = s.numbers.minNum;
		settings.querySelector('#lgNumSize').value = s.numbers.maxNum;
		settings.querySelector('#totMaxAmt').value = s.numbers.maxAnswerTotal;
		
		settings.querySelectorAll('.js-probstyle-input').forEach(function(inp) {
			if (inp.value === s.style)
				inp.setAttribute('checked', true);
			else
				inp.setAttribute('checked', false);
		});
		mt.itemsSet();
	},
	settingsSet : function(){
		// get settings from #settingsUI and save to globals/localStorage.
		var settings = _q('#settingsUI'),
			s = {
				totalProbs : parseInt(_q('.js-max-count').value),
				problemtypes : {
					addition : settings.querySelector('#operandAddition').getAttribute('checked'),
					subtraction : settings.querySelector('#operandSubtraction').getAttribute('checked'),
					multiplication : settings.querySelector('#operandMultiplication').getAttribute('checked'),
					division : settings.querySelector('#operandDivision').getAttribute('checked')
				},
				numbers : {
					setByMinMax : settings.querySelector('#setNumMinMax').getAttribute('checked'),
					minNum : parseInt(settings.querySelector('#smNumSize').value),
					maxNum : parseInt(settings.querySelector('#lgNumSize').value),
					setByTotAmt : settings.querySelector('#setNumAnsTotal').getAttribute('checked'),
					maxAnswerTotal : parseInt(settings.querySelector('#totMaxAmt').value)
				},
				style : _q('.js-probstyle-input:checked').value
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
		var set = _q('.operands .validate.types');
		var add = set.querySelector('.operand-addition').getAttribute('checked'),
			sub = set.querySelector('.operand-subtraction').getAttribute('checked'),
			mul = set.querySelector('.operand-multiplication').getAttribute('checked'),
			div = set.querySelector('.operand-division').getAttribute('checked'),
			validity;
		if(!add && !sub && !mul && !div) {
			set.parentNode.querySelector('.error-message').style.visibility = 'visible';
			validity = false;
		} else {
			set.parentNode.querySelector('.error-message').style.visibility = 'hidden';
			validity = true;
		}
		return validity;
	},
	valSettingsMinMax : function(){
		var set = _q('.numbers .validate.minmax');
		var min = set.querySelector('#smNumSize').value,
			max = set.querySelector('#lgNumSize').value,
			validity;
		if(min <= max) {
			// valid
			set.parentNode.querySelector('.error-message').style.visibility = 'hidden';
			validity = true;
		} else {
			// invalid
			set.parentNode.querySelector('.error-message').style.visibility = 'visible';
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
		_q('.settings-menu-toggle').onclick = function() {
			const a = this.parentNode;
			a.classList.toggle('open');
		};
		// $('.js-setnumbers').on('change',function(){
		// 	var $a = $(this);
		// 	$a.parent().find('.js-setnumber').prop('disabled',false);
		// 	$('.js-setnumbers[id!='+$a.attr('id')+']').parent().find('.js-setnumber').prop('disabled',true);
		// }); 
		_q('.js-setnumbers').onclick = function() {
			const a = this;
			a.parentNode.querySelector('.js-setnumber').setAttribute('disabled', false);
			_q(`.js-setnumbers[id!='${a.getAttribute('id')}']`)
			_qall('.js-setnumbers').forEach(function(setnum) {
				if (setnum.getAttribute('id') !== a.getAttribute('id'))
					setnum.parentNode.querySelector('.js-setnumber').setAttribute('disabled', true);
			});
		};
		// $('.js-settings-submit').on('click',mt.settingsSubmit);
		_q('.js-settings-submit').onclick = () => mt.settingsSubmit();

		// $('.js-checkanswers').on('click',mt.checkanswers);
		_q('.js-checkanswers').onclick = () => mt.checkanswers();

		// $('.js-clearanswers').on('click',mt.clearanswers);
		_q('.js-clearanswers').onclick = mt.clearanswers;

		// $('.js-regenerate').on('click',mt.regenerate);
		_q('.js-regenerate').onclick = () => mt.regenerate();

		// $('#MathSentences input.answer').bind('input propertychange', mt.simpleValidateOnInput);
		// _qall('#MathSentences input.answer').onchange = (this) => mt.simpleValidateOnInput(this);
		// _qall('#MathSentences input.answer').onchange = mt.simpleValidateOnInput();
		_qall('#MathSentences input.answer').forEach(function(ans) {
			// ans.onchange = mt.simpleValidateOnInput();
			const validation = mt.simpleValidateOnInput.bind(ans);
			ans.addEventListener('change', validation);
		});

		// $('.js-modal-continue, .js-modal-overlay').on('click', mt.closeModal);
		_q('.js-modal-continue').onclick = () => mt.closeModal();
		_q('.js-modal-overlay').onclick = () => mt.closeModal();
	},
	addCornify : function(){
		// WHEEEE!!
		for(i = 0; i < _q('.js-max-count').value; i++ ){ cornify_add(); }
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