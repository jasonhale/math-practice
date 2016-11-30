import React, { Component } from 'react';
import './css/App.css';
import './css/styles.css';
import SettingsUI from './components/SettingsUI';
import Problem from './components/Problem.js';
import Modal from './components/Modal.js';
import {generateProblems} from './tools/utils.js';

class App extends Component {
  constructor(props){
    super(props);

    this.state = {
      isLoaded: false,
      problems: [],
      operations: this.props.operations,
      count: this.props.count,
      operands: this.props.operands,
      probStyle: this.props.probStyle,
      answersOpen: false
    }
  }

  componentWillMount(){
    if(!this.state.isLoaded) {
      const problems = generateProblems(this.state.operations, this.state.count, this.state.operands);
      this.setState({'isLoaded':true, 'problems':problems});
    }
  }

  resetProblems = () => {
    const problems = generateProblems(this.state.operations, this.state.count, this.state.operands);
    this.setState({'problems': problems});
  }

  checkAnswers = () => {
    console.log('Check answers...');
    this.toggleAnswersModal();
  }

  clearAnswers = () => {
    console.log('Clear answers...');
  }

  toggleAnswersModal = () => {
    this.setState({ 'answersOpen': !this.state.answersOpen});
  }


  render() {
    const cY = new Date().getFullYear(); // for current year in footer for copyright declaration.

    return (
      <div id="siteWrap" className="site-wrap">
        <header className="mainColumn mainSection"><h1>Math Practice Time</h1></header>

        <SettingsUI/>

        <section id="pageUI" className="mainColumn mainSection">
          <div className="button-list">
            <button className="button-list-item button checkanswers" onClick={this.checkAnswers}><i className="fa fa-check"/> Check My Answers</button>
            <button className="button-list-item button clearanswers" onClick={this.clearAnswers}><i className="fa fa-eraser"/> Clear My Answers</button>
            
            <label htmlFor="max-count" className="text-small button-list-item inline-input">Total problems: <input name="max-count" className="input input-simple js-max-count" type="number" placeholder="Enter Number of Problems..."/></label>
            
            <button className="button-list-item button js-regenerate" onClick={this.resetProblems}>
              <i className="fa fa-refresh"/> Create New Questions
            </button>
          </div>
        </section>
        <hr className="mainColumn" />

        <section id="pagecontent" className="mainColumn mainSection">
          <form id="MathSentences" name="MathSentences">
            <ul className={`problems js-problems problems-${this.state.probStyle}`}>
              {
                this.state.problems.map((problem, i) => {
                  return (
                    <Problem
                      key={`problem${i}`}
                      index={i}
                      name={`problem${i}`}
                      operator={problem.operator}
                      numA={problem.numA}
                      numB={problem.numB}
                      answer={problem.answer}
                    />
                  )
                })
              }
            </ul>
          </form>
        </section>
        

        <br/>
        <hr/>
        <footer>&copy;{cY} IEatPaint Studio&trade;</footer>

        <Modal show={this.state.answersOpen} toggle={this.toggleAnswersModal}/>

      </div>
    );
  }
}

export default App;
