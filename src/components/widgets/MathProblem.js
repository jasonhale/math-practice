import React from 'react';
import { Col } from 'react-bootstrap';

class MathProblem extends React.Component {
  constructor(props){
    super(props);
  }

  render() {
    const {
      id,
      numeratorA,
      numeratorB,
      operation,
    } = this.props;

    const getProb = (A, B, op) => {
      switch (op) {
        case 'add':
          return {
            operand: '+',
            answer: A+B
          };

        case 'sub':
          return {
            operand: '-',
            answer: A-B
          };

        case 'mul':
          return {
            operand: 'x',
            answer: A*B
          };

        case 'div':
          return {
            operand: '/',
            answer: A/B
          };

        default:
          return {
            operand: '',
            answer: 0
          };
      }
    };

    const prob = getProb(numeratorA, numeratorB, operation);

    return(
      <Col id={id} className="prob template" data-index="" data-problemtype="" lg={1} md={1} sm={1} xs={2}>
				<label className="question" htmlFor={'prob'+id}>
					<span className="num-a">{numeratorA}</span>
					<span className="operator">{prob.operand}</span>
					<span className="num-b">{numeratorB}</span>
					<span className="equals">=</span>
				</label>
				<input id={'prob'+id} className="answer" type="text" form="MathSentences"/>
			</Col>
    );
  }
}

MathProblem.propTypes = {
  id: React.PropTypes.oneOfType([
    React.PropTypes.number,
    React.PropTypes.string
  ]),
  numeratorA: React.PropTypes.number,
  numeratorB: React.PropTypes.number,
  operation: React.PropTypes.string
};

export default MathProblem;
