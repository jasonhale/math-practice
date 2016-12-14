import React from 'react';
import {operandSymbols} from '../tools/utils';

class SettingsUI extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      'settingsOpen': false,
			'settingsUpdated': false,
			'currentSettings': {
				'operations':  props.operations,
				'count': props.count,
				'operands': props.operands,
				'probStyle': props.probStyle
			}
		}
  }

	initialSettings = {
		'operations': this.props.operations,
		'count': this.props.count,
		'operands': this.props.operands,
		'probStyle': this.props.probStyle
	};

  toggleSettings = () => {
    this.setState({ 'settingsOpen': (!this.state.settingsOpen) });
  }

	// Determine if a change for the type of operations to use.
	setOperation = (op, cs) => {
		// toggle the operation being set.
		let copySettings = Object.assign({}, cs);
		copySettings.operations[op] = !copySettings.operations[op];
		// update currentSettings;
		this.setState({
			'currentSettings': copySettings,
			'settingsUpdated': true
		});
		this.checkState();
	}

	checkState = () => {
		this.setState({
			'settingsUpdated': (this.state.currentSettings !== this.initialSettings),
			'settingsUpdated': true
		});
	}

	setOperand = (op, cs) => {
		let copySettings = Object.assign({}, this.state.currentSettings);
		copySettings.operands.setBy = op;
		this.setState({'currentSettings' : copySettings});
		this.checkState();
	}

	setByMinChange = (event) => {
		let copySettings = Object.assign({}, this.state.currentSettings);
		const value = event.target.value ? event.target.value : 0;
		copySettings.operands.min = parseInt(value, 10);
		this.setState({'currentSettings': copySettings});
		this.checkState();
	}

	setByMaxChange = (event) => {
		let copySettings = Object.assign({}, this.state.currentSettings);
		const value = event.target.value ? event.target.value : 0;
		copySettings.operands.max = parseInt(value, 10);
		this.setState({'currentSettings':copySettings});
		this.checkState();
	}

	setStyle = (probStyle, currentSettings) => {
		let copySettings = Object.assign({}, this.state.currentSettings);
		copySettings.probStyle = probStyle;
		this.setState({'currentSettings': copySettings});
		this.checkState();
	}

	applySettings = () => {
		this.initialSettings = this.state.currentSettings;
		this.props.onSave(this.state.currentSettings);
		this.setState({settingsUpdated: false});
	};

	resetSettings = () => {
		console.log('*** reset ***\n currentSettings: ' + JSON.stringify(this.state.currentSettings) + '\n initialSettings: ' + JSON.stringify(this.initialSettings) + '\n ... these are the same? ::'+ (JSON.stringify(this.state.currentSettings) === JSON.stringify(this.initialSettings)) + '::');
		console.log(this.state.currentSettings);
		console.log(this.initialSettings);
				
		this.setState({
			'currentSettings': this.initialSettings,
			'settingsUpdated': false
		});
	}

  render(){
    return(
      <section id="settingsUI" className={'settings mainColumn mainSection' + ((this.state.settingsOpen)? ' open' : '')}>

				<button className="button settings-menu-toggle" onClick={this.toggleSettings}><i className="fa fa-gear"></i></button>

				<h2 className="section-title"><i className="fa fa-gear"></i> Settings</h2>

				<div className="settings-section operands">
					<h3 className="section-sub-title">Problem Types</h3>

					<ul className="settings-list input-list button-list-grid validate types">
						<OperationSelector
							operation="addition"
							currentSettings={this.state.currentSettings}
							clickAction={this.setOperation}
						/>

            <OperationSelector
							operation="subtraction"
							currentSettings={this.state.currentSettings}
							clickAction={this.setOperation}
						/>
						
						{/*
						<OperationSelector
							operation="multiplication"
							currentSettings={this.currentSettings}
							clickAction={this.setOperation}
						/>

            <OperationSelector
							operation="division"
							currentSettings={this.currentSettings}
							clickAction={this.setOperation}
						/>
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

							<SetBySelector
								operand="minmax"
								currentSettings={this.state.currentSettings}
								text="by Min/Max Numbers"
								clickAction={this.setOperand}
							/>

							<div className="settings-sublist-item radio-section-item">
								<label htmlFor="smNumSize">Smallest Number</label>
								<input
									className="radio-section-item-input"
									type="number"
									min="0"
									value={this.state.currentSettings.operands.min}
									id="smNumSize"
									onChange={this.setByMinChange}
									disabled={(this.state.currentSettings.operands.setBy !== 'minmax')}
								/>
							</div>

							<div className="settings-sublist-item radio-section-item">
								<label htmlFor="lgNumSize">Largest Number</label>
								<input
									className="radio-section-item-input"
									type="number"
									value={this.state.currentSettings.operands.max}
									min="0"
									id="lgNumSize"
									onChange={this.setByMaxChange}
									disabled={(this.state.currentSettings.operands.setBy !== 'minmax')}
								/>
							</div>

							<div className="error-message">
								<span>Smallest Number must be smaller than Largest Number</span>
							</div>
						</li>

						{/*
						<li className="settings-list-item maxamt">
							<SetBySelector
								operand="minmax"
								currentSettings={currentSettings}
								text="by Answer Total"
								clickAction={setOperand}
							/>
							<div className="settings-sublist-item radio-section-item">
								<label htmlFor="totMaxAmt">Total Max Amount</label>
								<input className="js-setnumber js-totmaxamt radio-section-item-input" type="number" value="20" min="0" id="totMaxAmt" disabled/>
							</div>
						</li>
						*/}
					</ul>
				</div>

				<div className="settings-section probstyle">
					<h3 className="section-sub-title">Style</h3>
					<ul className="settings-list input-list input-radio button-list-grid">
						<StyleSelector
							probStyle="vertical"
							currentSettings={this.state.currentSettings}
							clickAction={this.setStyle}
						/>
						<StyleSelector
							probStyle="horizontal"
							currentSettings={this.state.currentSettings}
							clickAction={this.setStyle}
						/>
					</ul>
				</div>

				<hr/>

				<div className="settings-section submit-section">
					<button
						className="button settings-submit js-settings-submit"
						disabled={!this.state.settingsUpdated}
						onClick={this.applySettings}
					><i className="fa fa-play"></i> Apply</button>

					<button
						className="button settings-reset js-settings-reset"
						disabled={!this.state.settingsUpdated}
						onClick={this.resetSettings}
					><i className="fa fa-undo"></i> Reset</button>
				</div>

			</section>
    );
  }
}

const StyleSelector = ({probStyle, currentSettings, clickAction}) => {
	const setStyle = () => {
		clickAction(probStyle, currentSettings);
	};
	const isSelected = (probStyle === currentSettings.probStyle) ? 'selected' : '';
	return(
		<li className="settings-list-item button-grid-item">
			<button
				className={`probstyle-button button ${isSelected}`}
				onClick={setStyle}
			>
				<i className={"fa fa-arrows-"+probStyle.charAt(0)}></i>
				<span className="hide">{probStyle}</span>
			</button>
		</li>
	);
};

const OperationSelector = ({operation, currentSettings, clickAction}) => {
	const setOperation = () => {
		// console.log(operation, currentSettings);
		clickAction(operation, currentSettings);
	}
	return (
		<li className="settings-list-item button-grid-item">
			
			<button
				className={"operand-select button" + ((currentSettings.operations[operation]) ? ' selected' : '')}
				onClick={setOperation}
			>{operandSymbols[operation]}</button>

			{/*
			<input
				className={`operand-input operand-${operation} button-grid-input`}
				type="checkbox"
				id={`operand${operation}`}
				value={operation}
				checked={currentSettings.operations[operation]}
				onChange={setOperation}
			/>
			<label
				className="operand-label button"
				htmlFor={`operand${operation}`}
			>{operandSymbols[operation]}</label>
			*/}
		</li>
	);
};

const SetBySelector = ({operand, currentSettings, text, clickAction}) => {
	const setOperand = () => {
		clickAction(operand, currentSettings);
	}
	return (
		<button className={'settings-sub-subtitle button'+ ((currentSettings.operands.setBy === operand) ? ' selected' : '')} onClick={setOperand}>{text}</button>
	)
}

export default SettingsUI;