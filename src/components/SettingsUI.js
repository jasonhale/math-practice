import React, { useState } from 'react';
import isEqual from 'lodash.isequal';
import {operandSymbols} from '../tools/utils';

function SettingsUI({operations, count, operands, probStyle, onSave}) {
	let initialSettings = {
		operations: { ...operations },
		count: count,
		operands: { ...operands },
		probStyle: probStyle
	};

	const [settingsOpen, setSettingsOpen] = useState(false);
	const [settingsUpdated, setSettingsUpdated] = useState(false);
	const [currentSettings, setCurrentSettings] = useState({ ...initialSettings });

  const toggleSettings = () => setSettingsOpen(!settingsOpen);

	// Determine if a change for the type of operations to use.
	const setOperation = (op, cs) => {
		// toggle the operation being set.
		let copySettings = { ...cs };
		copySettings.operations[op] = !copySettings.operations[op];
		// update currentSettings;
		// setSettingsUpdated(true); // <-- duplicate?
		setCurrentSettings(copySettings);
		checkState();
	}

	const checkState = () => {
		const equal = isEqual(currentSettings, initialSettings);
		console.log('currentSettings: %o\n initialSettings: %o', currentSettings, initialSettings);
		console.log('isEqual: ', equal);
		setSettingsUpdated(!equal);
	}

	const setOperand = (op, cs) => {
		let copySettings = { ...currentSettings };
		copySettings.operands.setBy = op;
		setCurrentSettings(copySettings);
		checkState();
	}

	const setByMinChange = (event) => {
		let copySettings = { ...currentSettings };
		const value = event.target.value ? event.target.value : 0;
		copySettings.operands.min = parseInt(value, 10);
		setCurrentSettings(copySettings);
		checkState();
	}

	const setByMaxChange = (event) => {
		let copySettings = { ...currentSettings };
		const value = event.target.value ? event.target.value : 0;
		copySettings.operands.max = parseInt(value, 10);
		setCurrentSettings(copySettings);
		checkState();
	}

	const setStyle = (probStyle) => {
		let copySettings = { ...currentSettings };
		copySettings.probStyle = probStyle;
		setCurrentSettings(copySettings);
		checkState();
	}

	const applySettings = () => {
		initialSettings = { ...currentSettings };
		onSave(currentSettings);
		setSettingsUpdated(false);
	};

	const resetSettings = () => {
		console.log(
`*** reset ***
currentSettings: %o
initialSettings: %o
... these are the same? ::${isEqual(currentSettings, initialSettings)}::
`, currentSettings, initialSettings);
		
		setCurrentSettings(initialSettings);
		setSettingsUpdated(false);
	}

	return(
		<section id="settingsUI" className={`settings mainColumn mainSection ${((settingsOpen)? 'open' : '')}`}>

			<button className="button settings-menu-toggle" onClick={toggleSettings}><i className="fa fa-gear"></i></button>

			<h2 className="section-title"><i className="fa fa-gear"></i> Settings</h2>

			<div className="settings-section operands">
				<h3 className="section-sub-title">Problem Types</h3>

				<ul className="settings-list input-list button-list-grid validate types">
					<OperationSelector
						operation="addition"
						currentSettings={currentSettings}
						clickAction={setOperation}
					/>

					<OperationSelector
						operation="subtraction"
						currentSettings={currentSettings}
						clickAction={setOperation}
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
							currentSettings={currentSettings}
							text="by Min/Max Numbers"
							clickAction={setOperand}
						/>

						<div className="settings-sublist-item radio-section-item">
							<label htmlFor="smNumSize">Smallest Number</label>
							<input
								className="radio-section-item-input"
								type="number"
								min="0"
								value={currentSettings.operands.min}
								id="smNumSize"
								onChange={setByMinChange}
								disabled={(currentSettings.operands.setBy !== 'minmax')}
							/>
						</div>

						<div className="settings-sublist-item radio-section-item">
							<label htmlFor="lgNumSize">Largest Number</label>
							<input
								className="radio-section-item-input"
								type="number"
								value={currentSettings.operands.max}
								min="0"
								id="lgNumSize"
								onChange={setByMaxChange}
								disabled={(currentSettings.operands.setBy !== 'minmax')}
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
						isActive={(currentSettings.probStyle === 'vertical')}
						clickAction={setStyle}
					/>
					<StyleSelector
						probStyle="horizontal"
						isActive={(currentSettings.probStyle === 'horizontal')}
						clickAction={setStyle}
					/>
				</ul>
			</div>

			<hr/>

			<div className="settings-section submit-section">
				<button
					className="button settings-submit js-settings-submit"
					disabled={!settingsUpdated}
					onClick={applySettings}
				><i className="fa fa-play"></i> Apply</button>

				<button
					className="button settings-reset js-settings-reset"
					disabled={!settingsUpdated}
					onClick={resetSettings}
				><i className="fa fa-undo"></i> Reset</button>
			</div>

		</section>
	);
}

const StyleSelector = ({probStyle, isActive, clickAction}) => {
	const toggleStyle = () => {
		clickAction(probStyle);
	};
	const isSelected = (isActive) ? 'selected' : '';
	return(
		<li className="settings-list-item button-grid-item">
			<button
				className={`probstyle-button button ${isSelected}`}
				onClick={toggleStyle}
			>
				<i className={`fa fa-arrows-${probStyle.charAt(0)}`}></i>
				<span className="hide">{probStyle}</span>
			</button>
		</li>
	);
};

const OperationSelector = ({operation, currentSettings, clickAction}) => {
	const setOperation = () => {
		clickAction(operation, currentSettings);
	}
	const isSelected = (currentSettings.operations[operation]) ? 'selected' : '';
	return (
		<li className="settings-list-item button-grid-item">
			
			<button
				className={`operand-select button ${isSelected}`}
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
	const isSelected = (currentSettings.operands.setBy === operand) ? ' selected' : '';
	return (
		<button className={`settings-sub-subtitle button ${isSelected}`} onClick={setOperand}>{text}</button>
	)
}

export default SettingsUI;