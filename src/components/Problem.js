import React from 'react';
import './Problem.css';

function Problem({ name, operator, numA, numB, answer, index, input, onChange }) {
	const inputChange = (e) => onChange(index, e.target.value);
	const parsedInput = parseInt(input, 10);
	const isCorrect = (parsedInput === answer);
	let status = '';
	if (parsedInput && parsedInput !== 0) {
		status = isCorrect ? 'prob--correct' : 'prob-incorrect';
	}
	return (
		<li
			className={`prob ${status}`}
			// data-index={index}
			// data-problemtype="addition"
			// data-answer={answer}
		>
			<label className="question" htmlFor={name}>
				<span className="num-a">{numA}</span>
				<span className="operator">{operator}</span>
				<span className="num-b">{numB}</span>
				<span className="equals">=</span>
				<input
					id={name}
					name={name}
					className="answer"
					type="text"
					value={input}
					onChange={inputChange}
				/>
			</label>
		</li>
	);
}

export default Problem;