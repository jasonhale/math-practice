import React from 'react';
import {operandSymbols} from '../../tools/utils';

export default function OperationSelector({operation, currentSettings, clickAction}) {
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
}
