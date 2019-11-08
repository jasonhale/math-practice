import React from 'react';

export default function SetBySelector({operand, currentSettings, text, clickAction}) {
	const setOperand = () => {
		clickAction(operand, currentSettings);
	}
	const isSelected = (currentSettings.operands.setBy === operand) ? ' selected' : '';
	return (
		<button className={`settings-sub-subtitle button ${isSelected}`} onClick={setOperand}>{text}</button>
	)
}
