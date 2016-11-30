import React from 'react';

class SettingsUI extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      settingsOpen: false
    }
  }

  toggleSettings = () => {
    this.setState({ 'settingsOpen': (!this.state.settingsOpen) });
  }

  render(){
    return(
      <section id="settingsUI" className={'settings mainColumn mainSection' + ((this.state.settingsOpen)? ' open' : '')}>

				<button className="button settings-menu-toggle" onClick={this.toggleSettings}><i className="fa fa-gear"></i></button>

				<h2 className="section-title"><i className="fa fa-gear"></i> Settings</h2>

				<div className="settings-section operands">
					<h3 className="section-sub-title">Problem Types</h3>

					<ul className="settings-list input-list button-list-grid validate types">
						<li className="settings-list-item button-grid-item">
							<input className="operand-input operand-addition button-grid-input js-settings-input js-settings-operand" type="checkbox" id="operandAddition" value="addition" checked/>
							<label className="operand-label button" for="operandAddition">+</label>
						</li>

            <li className="settings-list-item button-grid-item">
							<input className="operand-input operand-subtraction button-grid-input js-settings-input js-settings-operand" type="checkbox" id="operandSubtraction"/>
							<label className="operand-label button" for="operandSubtraction">&minus;</label>
						</li>

						{/*
						<li className="settings-list-item button-grid-item">
							<input className="operand-input operand-multiplication button-grid-input js-settings-input js-settings-operand" type="checkbox" id="operandMultiplication">
							<label className="operand-label button" for="operandMultiplication">x</label>
						</li><li className="settings-list-item button-grid-item">
							<input className="operand-input operand-division button-grid-input js-settings-input js-settings-operand" type="checkbox" id="operandAdditionDivision">
							<label className="operand-label button" for="operandAdditionDivision">&frasl;</label>
						</li>
						*/}
					</ul>

					<div className="error-message">
						<span>You must select at least one Problem Type</span>
					</div>

				</div>

				<div className="settings-section numbers">
					<h3 className="section-sub-title">Numbers</h3>

					<ul className="settings-list radio-section">
						<li className="settings-list-item validate minmax">
							<input className="js-setnumbers radio-section-input" type="radio" value="" name="setnumbers" id="setNumMinMax" checked/>
							<label className="settings-sub-subtitle button radio-section-label" for="setNumMinMax">by Min/Max Numbers</label>
							<div className="settings-sublist-item radio-section-item">
								<label for="smNumSize">Smallest Number</label>
								<input className="js-setnumber js-numsize radio-section-item-input" type="number" value="0" min="0" id="smNumSize"/>
							</div>
							<div className="settings-sublist-item radio-section-item">
								<label for="lgNumSize">Largest Number</label>
								<input className="js-setnumber js-numsize radio-section-item-input" type="number" value="9" min="0" id="lgNumSize"/>
							</div>
							<div className="error-message">
								<span>Smallest Number must be smaller than Largest Number</span>
							</div>
						</li>

						<li className="settings-list-item maxamt">
							<input className="js-setnumbers radio-section-input" type="radio" value="" name="setnumbers" id="setNumAnsTotal"/>
							<label className="settings-sub-subtitle button radio-section-label" for="setNumAnsTotal">by Answer Total</label>
							<div className="settings-sublist-item radio-section-item">
								<label for="totMaxAmt">Total Max Amount</label>
								<input className="js-setnumber js-totmaxamt radio-section-item-input" type="number" value="20" min="0" id="totMaxAmt" disabled/>
							</div>
						</li>
					</ul>
				</div>

				<div className="settings-section probstyle">
					<h3 className="section-sub-title">Style</h3>
					<ul className="settings-list input-list input-radio button-list-grid">
						<li className="settings-list-item button-grid-item">
							<input className="probstyle-input probstyle-vertical js-probstyle-input button-grid-input" type="radio" id="probstyleVertical" name="probstyle" value="vertical" checked/>
							<label className="probstyle-label button" for="probstyleVertical"><i className="fa fa-arrows-v"></i><span className="hide">Vertical</span></label>
						</li><li className="settings-list-item button-grid-item">
							<input className="probstyle-input probstyle-horizontal js-probstyle-input button-grid-input" type="radio" id="probstyleHorizontal" name="probstyle" value="horizontal"/>
							<label className="probstyle-label button" for="probstyleHorizontal"><i className="fa fa-arrows-h"></i><span className="hide">Horizontal</span></label>
						</li>
					</ul>
				</div>

				<hr/>

				<div className="settings-section submit-section">
					<button className="button settings-submit js-settings-submit"><i className="fa fa-play"></i> Apply</button>
					<button className="button settings-reset js-settings-reset"><i className="fa fa-undo"></i> Reset</button>
				</div>

			</section>
    );
  }
}

export default SettingsUI;