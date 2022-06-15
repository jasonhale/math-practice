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
	problemtypesmap: {
		addition : '/icons/operands.svg#op-add',
		subtraction : '/icons/operands.svg#op-sub',
		multiplication : '/icons/operands.svg#op-mul',
		division : '/icons/operands.svg#op-div'
	},
	getRandomInt : function(min, max){
		return Math.floor(Math.random() * (max - min)) + min;
	},
	simpleValidateOnInput : function(e){
		var el = this;
		var inp = e.target.value;
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
	answerModal: (totals) => _q('#newd').showScore(totals),
	buildProbs : function(total){
		// create and show problem.  Loops as many times as the current problem count is set.

		// more than one type of problem?
		// If so, set a global setting and store a local array of only those problem types that are chosen/set.
		var probtypes = Object.keys(mt.settings.problemtypes);
		const multProb = probtypes.filter(t => (mt.settings.problemtypes[t].toString() === 'true'));
		mt.settings.multProbTypes = !!(multProb.length > 1);

		for (var i = 0; i < total; i++) {
			var numA = mt.getRandomInt(mt.settings.numbers.minNum, mt.settings.numbers.maxNum),
				numB = mt.getRandomInt(mt.settings.numbers.minNum, mt.settings.numbers.maxNum),
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

			var template = _q('#problemTemplate').content.cloneNode(true);
			template.querySelector('.prob').dataset.index = i + 1;
			template.querySelector('.prob').dataset.problemtype = probtype;
			template.querySelector('.question').setAttribute('for', 'problem'+i);
			template.querySelector('.num-a').innerText = ''+numA;
			template.querySelector('.num-b').innerText = ''+numB;
			template.querySelector('.operator__svg use').setAttribute('href', mt.problemtypesmap[probtype]);
			var answerNode = template.querySelector('.answer');
			answerNode.setAttribute('id', 'problem'+i);
			answerNode.setAttribute('tab-index', i);
			answerNode.setAttribute('name', 'answer'+i);
			answerNode.dataset.answer = answer;

			// const template = document.createElement('problem-li');
			// console.log('template', template);
			// template.setAttribute('num-a', numA);
			// template.setAttribute('num-b', numB);
			// template.setAttribute('i', i);
			// template.setAttribute('problem-type', probtype);
			// template.setAttribute('answer', answer);
			_q('.problems').appendChild(template);
		};
	},
	checkanswers : function() {
		// goes through each problem and checks whether it is correct/incorrect.
		var totals = {
			'problems'	: 0,
			'answered'	: 0,
			'correct'	: 0
		};
		_qall('.problems .prob').forEach((prob) => {
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
	clearanswers : function() {
		// clears answers without creating new problems.
		_qall('.prob .answer').forEach((ans) => {
			ans.value = '';
			ans.dataset.solve = 0;
			ans.classList.remove('incorrect', 'incorrect-fixed', 'correct');
			ans.removeAttribute('disabled');
		});
	},
	regenerate : function() {
		// remove all current problems and generate new ones.
		mt.settingsSet();
		_qall('.problems .prob').forEach((prob) => prob.parentNode.removeChild(prob))
		mt.buildProbs(mt.settings.totalProbs);
	},
	itemsSet : function() {
		// apply settings to items on the page that require them.
		_q('input.js-max-count').value = mt.settings.totalProbs;
		_q('.js-problems').classList.remove('problems-vertical', 'problems-horizontal');
		_q('.js-problems').classList.add(`problems-${mt.settings.style.toLowerCase()}`);
	},
	setInitialSettings : function() {
		// set initial settings.  If there's info stored client side, use it.  otherwise use defaults.
		if(window.localStorage) {
			const storedSettings = localStorage.getItem('MathPractice.settings');
			if (storedSettings) { 
				mt.settings = JSON.parse(storedSettings);
			} else {
				localStorage.setItem('MathPractice.settings', JSON.stringify(mt.settings));
			}
		}

		console.log('setInitialSettings', mt.settings);
		
		// assign values to markup
		const s = mt.settings;
		_q('#operandAddition').checked = s.problemtypes.addition;
		_q('#operandSubtraction').checked = s.problemtypes.subtraction;
		_q('#operandMultiplication').checked = s.problemtypes.multiplication;
		_q('#operandDivision').checked = s.problemtypes.division;
		_q('#setNumMinMax').checked = s.numbers.setByMinMax;
		_q('#setNumMinMax').parentNode.querySelector('.js-setnumber').disabled = !s.numbers.setByMinMax;
		_q('#setNumAnsTotal').checked = s.numbers.setByTotAmt;
		_q('#setNumAnsTotal').parentNode.querySelector('.js-setnumber').disabled = !s.numbers.setByTotAmt;
		_q('#smNumSize').value = s.numbers.minNum;
		_q('#lgNumSize').value = s.numbers.maxNum;
		_q('#totMaxAmt').value = s.numbers.maxAnswerTotal;
		
		_q('#settingsUI').querySelectorAll('.js-probstyle-input').forEach(inp => inp.checked = (inp.value === s.style));

		mt.itemsSet();
	},
	settingsSet : function() {
		// get settings from #settingsUI and save to globals/localStorage.
		var settings = _q('#settingsUI');
		var s = {
			totalProbs : parseInt(_q('.js-max-count').value),
			problemtypes : {
				addition : settings.querySelector('#operandAddition').checked,
				subtraction : settings.querySelector('#operandSubtraction').checked,
				multiplication : settings.querySelector('#operandMultiplication').checked,
				division : settings.querySelector('#operandDivision').checked
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
		console.log('s', s);
		mt.settings = s;
		localStorage.setItem('MathPractice.settings', JSON.stringify(s));

		mt.itemsSet();
	},
	settingsGo : function() {
		// close settings window and get new probs with new settings.
		mt.closeSettings();
		mt.regenerate();
	},
	valSettingsOperands : function() {
		// Run check if there is at least one problem type selected.  If not, prompts error message.
		var set = _q('.operands .validate.types');
		var add = set.querySelector('.operand-addition').checked,
			sub = set.querySelector('.operand-subtraction').checked,
			mul = set.querySelector('.operand-multiplication').checked,
			div = set.querySelector('.operand-division').checked,
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
	valSettingsMinMax : function() {
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
	settingsSubmit : function() {
		// run validate tests
		var operandValid = mt.valSettingsOperands();
		var minmaxValid = mt.valSettingsMinMax();

		// if pass, set settings
		if(operandValid && minmaxValid) mt.settingsGo();
	},
	buttonBindings : function() {
		// binding custom events to buttons on the page.
		_q('.settings-menu-toggle').onclick = function() {
			const a = _q('.js-settings');
			a.classList.toggle('open');
		};
		
		_q('.js-setnumbers').onclick = function() {
			const a = this;
			a.parentNode.querySelector('.js-setnumber').setAttribute('disabled', false);
			_qall('.js-setnumbers').forEach(function(setnum) {
				if (setnum.getAttribute('id') !== a.getAttribute('id'))
					setnum.parentNode.querySelector('.js-setnumber').setAttribute('disabled', true);
			});
		};
		
		_q('.js-settings-submit').onclick = mt.settingsSubmit;
		_q('.js-checkanswers').onclick = mt.checkanswers;
		_q('.js-clearanswers').onclick = mt.clearanswers;
		_q('.js-regenerate').onclick = mt.regenerate;

		_qall('.problems input.answer').forEach(function(ans) {
			const validation = mt.simpleValidateOnInput.bind(ans);
			ans.addEventListener('change', validation);
		});
	},
	openSettings: function() {
		_q('.js-settings').classList.add('open');
	},
	closeSettings: function() {
		_q('.js-settings').classList.remove('open');
	},
	addCornify : function() {
		// WHEEEE!!
		for(i = 0; i < _q('.js-max-count').value; i++ ){ cornify_add(); }
	},
	init : function() {
		/*
			use localStorage
		*/
		mt.setInitialSettings();

		mt.buildProbs(mt.settings.totalProbs);
		mt.buttonBindings();
	}
};

mt.init();
