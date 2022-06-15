class ProblemTemplate extends HTMLElement { 
	constructor() {
		super();
		this.problemTypes = {
			addition : '+',
			subtraction : '-',
			multiplication : 'x',
			division : '/'
		};	
		this.attachShadow({ mode: 'open'});

		this.wrapper = document.createElement('li');
		this.wrapper.setAttribute('class', 'prob');
		

		this.label = document.createElement('label');
		this.label.setAttribute('class', 'question');
		
		this.wrapper.appendChild(this.label);
		
		this.numA = document.createElement('span');
		this.numA.setAttribute('class', 'num-a');
		this.label.appendChild(this.numA);

		this.op = document.createElement('span');
		this.op.setAttribute('class', 'operator');
		
		// set svg
		this.label.appendChild(this.op);

		this.numB = document.createElement('span');
		this.numB.setAttribute('class', 'num-b');
		
		this.label.appendChild(this.numB);

		this.equals = document.createElement('span');
		this.equals.setAttribute('class', 'equals');
		this.equals.innerText = '=';
		this.label.appendChild(this.equals);

		this.answer = document.createElement('input');
		this.answer.setAttribute('class', 'answer');
		this.answer.setAttribute('type', 'text');
		
		this.wrapper.appendChild(this.answer);

		const style = document.createElement('style');
		style.textContent = `.prob {
				font-weight: bold;
				position: relative;
			}
			.question {
				display: block;
			}
				.question span { display: inline-block; }
				.question .num-a,
				.question .num-b {
					display: block;
					text-align: right; 
				}
				.question .operator { position:absolute; }
				.question .operator__svg {
					width: var(--operandSize);
					height: var(--operandSize);
				}
				.question .equals {
					display: block;
					height:0;
					text-indent:-9999px;
					border-bottom: solid 1px;
				}
			
			.answer {
				display: block;
				width: 100%;
				margin: 0;
				padding: .2em 0;
				font-size: 1em;
				text-align: right;
				border: 0 none;
			}
				.answer[data-solve*='0'],
				.answer[data-solve*='1'],
				.answer[data-solve*='2'],
				.answer[data-solve*='3'],
				.answer[data-solve*='4'],
				.answer[data-solve*='5'],
				.answer[data-solve*='6'],
				.answer[data-solve*='7'],
				.answer[data-solve*='8'],
				.answer[data-solve*='9'] {
					background-color: hsla(200,100%,5q0q%,.1);
				}
			
				.answer.correct {
					background-color: rgba(0,255,0,.3);
				}
				.answer.incorrect {
					background-color: rgba(255,0,0,.3);
				}
				.answer.incorrect-fixed {
					background-color: rgba(255,255,0,.5);
				}
		`;

		this.shadowRoot.append(style, this.wrapper);
	}

	getAtts = () => {
		const index = parseInt(this.getAttribute('i'), 10);
		return {
			numerator: this.getAttribute('num-a'),
			denomenator: this.getAttribute('num-b'),
			index,
			problemtype: this.getAttribute('problem-type'),
			labelFor: `problem${index}`,
			answer: this.getAttribute('answer')
		};
	}

	connectedCallback() {
		const { numerator, denomenator, index, problemtype, labelFor, answer } = this.getAtts();
		const wrapper = this.shadowRoot.querySelector('.prob');
		wrapper.setAttribute('data-index', index + 1);
		wrapper.setAttribute('data-problemtype', problemtype);
		this.label.setAttribute('for', labelFor);
		this.op.innerText = this.problemTypes[problemtype];
		this.numA.innerText = numerator;
		this.numB.innerText = denomenator;
		this.answer.id = labelFor;
		this.answer['tab-index'] = index;
		this.answer.name = `answer${index}`;
		this.answer['data-answer'] = answer;
	}

	attributeChangedCallback(e) {
		console.log('attribute changed', e);
	}
}

window.customElements.define('problem-li', ProblemTemplate);
