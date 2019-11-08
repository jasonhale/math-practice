import React from 'react';

export default function StyleSelector({probStyle, isActive, clickAction}) {
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
}
