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
			answer
		} = this.props;

		return (
			<li className="prob template" dataIndex="" dataProblemtype="" dataAnswer={answer}>
				<label className="question" for={name}>
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