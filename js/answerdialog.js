class AnswerDialog extends HTMLElement {
	constructor() {
		super();

		this.attachShadow({ mode: 'open'});
		this.wrapper = document.createElement('dialog');
		this.wrapper.setAttribute('class', 'mpd');
		this.wrapper.innerHTML = `
			<h2>Totals!</h2>
			<p>
				<span>Total answered: </span><span class="mpd_total"></span><br/>
				<span>Total correct: </span><span class="mpd_total"></span><br/>
				<span>Total incorrect: </span><span class="mpd_total"></span>
			</p>
			<form method="dialog">
				<p>
					<button class="button">&raquo; CONTINUE &laquo;</button>
				</p>
			</form>

			<style>
				@import '/css/main.css';
				.mpd {
					width: 50%;
					min-width: 300px;
					max-width: fit-content;
					text-align: center;
					border-radius: 1em;
					box-shadow: 5px 5px 10px rgba(0, 0, 0, .3),
						-5px 5px 10px rgba(0, 0, 0, .3),
						0 10px 30px rgba(0,0,0,.2);
				}
				.mpd::backdrop {
					background: none rgba(0, 0, 0, .5);
					backdrop-filter: blur(6px);
				}
				.mpd-total {
					font-weight: bold;
				}
			</style>
		`;

		this.shadowRoot.append(this.wrapper);
	}

	connectedCallback() {
		this.dialog = this.shadowRoot.querySelector('.mpd');
	}

	showScore({ answered, correct }) {
		const totals = this.dialog.querySelectorAll('.mpd_total');
		totals[0].innerText = answered;
		totals[1].innerText = correct;
		totals[2].innerText = answered - correct;

		this.show();
	}

	show() {
		this.dialog.showModal();
	}

	close() {
		this.dialog.close();
	}

}

window.customElements.define('mp-dialog', AnswerDialog);
