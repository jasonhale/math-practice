import React, { Component } from 'react';
import './App.css';
import SettingsUI from './SettingsUI';
import Problem from './Problem.js';
import {generateProblems} from './utils.js';

function generateProblems(){
  return [
    {
      numA: 0,
      numB: 0,
      operator: '+',
      answer: 0
    },
    {
      numA: 0,
      numB: 1,
      operator: '+',
      answer: 1
    },
    {
      numA: 0,
      numB: 2,
      operator: '+',
      answer: 2
    },
    {
      numA: 1,
      numB: 1,
      operator: '+',
      answer: 2
    },
    {
      numA: 2,
      numB: 3,
      operator: '+',
      answer: 5
    }
  ];
}

class App extends Component {
  constructor(props){
    super(props);

    this.state = {
      isLoaded: false,
      problems: [],
      operations: this.props.operations,
      count: this.props.count,
      minmax: this.props.minmax,
      probStyle: this.props.probStyle
    }
  }

  componentWillMount(){
    if(!this.state.isLoaded) {
      const problems = generateProblems();
      this.setState({'isLoaded':true, 'problems':problems});
    }
  }

  render() {
    const problems = this.state.problems;

    return (
      <div id="siteWrap" className="site-wrap">
        <header className="mainColumn mainSection"><h1>Math Practice Time</h1></header>

        <SettingsUI/>

        <section id="pageUI" className="mainColumn mainSection">
          <div className="button-list">
            <button className="button-list-item button checkanswers" onClick={this.checkAnswers}><i className="fa fa-check"/> Check My Answers</button>
            <button className="button-list-item button clearanswers" onClick={this.clearAnswers}><i className="fa fa-eraser"/> Clear My Answers</button>
            
            <span className="button-list-item inline-input">
              <label htmlFor="max-count" className="text-small">Total problems: </label>
              <input name="max-count" className="input input-simple js-max-count" type="number" placeholder="Enter Number of Problems..."/>
              <button className="button-list-item button js-regenerate">
                <i className="fa fa-refresh"/> Create New Questions
              </button>
            </span>
          </div>
        </section>
        <hr className="mainColumn" />

        <section id="pagecontent" className="mainColumn mainSection">
          <form id="MathSentences" name="MathSentences">
            <ul className="problems js-problems problems-vertical">
              {
                problems.map((problem, i) => {
                  return (
                    <Problem
                      key={`problem${i}`}
                      iteration={i}
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
      
      </div>
    );
  }
}

export default App;
