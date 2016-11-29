import React, { Component } from 'react';

class Problem extends Component {
	// constructor(props){
	// 	super(props);
	// }

	render(){
		const {
			name,
			operator,
			numA,
			numB,
			answer,
			iteration
		} = this.props;

		return (
			<li className="prob template" data-index={iteration} data-Problemtype="addition" data-Answer={answer}>
				<label className="question" htmlFor={name}>
					<span className="num-a">{numA}</span>
					<span className="operator">{operator}</span>
					<span className="num-b">{numB}</span>
					<span className="equals">=</span>
					<input id={name} name={name} className="answer" type="text" form="MathSentences"/>
				</label>
				
			</li>
		)
	}
}

export default Problem;