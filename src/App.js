import React, { Component } from 'react';
import './css/App.css';
import './css/styles.css';
import Header from './components/Header';
import SettingsUI from './components/SettingsUI';
import Problem from './components/Problem.js';
import Modal from './components/Modal.js';
import {generateProblems} from './tools/utils.js';
import { setSettings } from './tools/api';

class App extends Component {

  state = {
    isProblemsGenerated: false,
    problems: [],
    answersOpen: false,
    operations: this.props.operations,
    count: this.props.count,
    operands: this.props.operands,
    probStyle: this.props.probStyle
  }

  componentWillMount(){
    if(!this.state.isProblemsGenerated) {
      const problems = generateProblems(this.state.operations, this.state.count, this.state.operands);
      this.setState({'isProblemsGenerated':true, 'problems':problems});
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
    this.setState( prevState => ({ 'answersOpen' : !prevState.answersOpen }));
  }

  updateCount = (event) => {
    const settingsToSave = {
      'operations': {...this.state.operations},
      'count': parseInt(event.target.value, 10),
      'operands': {...this.state.operands},
      'probStyle': this.state.probStyle
    }
    this.saveSettings(settingsToSave);
    this.setState({'count': parseInt(event.target.value, 10)});
  }

  updateSettings = (settings) => {
    const {operations, count, operands, probStyle} = settings;
    this.saveSettings(settings);
    this.setState({
      'operations': operations,
      'count': count,
      'operands': operands,
      'probStyle': probStyle
    });
  }

  saveSettings = (settings) => {
    console.log('saving...');
    // TODO : message savinge
    const {operations, count, operands, probStyle} = settings;
    let settingsToSave = {
      'operations': operations,
      'count': count,
      'operands': operands,
      'probStyle': probStyle
    };

    setSettings(JSON.stringify(settingsToSave));
  }

  render() {
    const Y = new Date().getFullYear(); // for current year in footer for copyright declaration.

    return (
      <div id="siteWrap" className="site-wrap">
        <SettingsUI
          operations={this.state.operations}
          count={this.state.count}
          operands={this.state.operands}
          probStyle={this.state.probStyle}
          onSave={this.updateSettings}
        />

        <Header
          checkAnswers={this.checkAnswers}
          clearAnswers={this.clearAnswers}
          resetProblems={this.resetProblems}
          count={this.state.count}
          updateCount={this.updateCount}
        />

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
        <footer>&copy;{Y} IEatPaint Studio&trade;</footer>

        <Modal show={this.state.answersOpen} toggle={this.toggleAnswersModal}/>

      </div>
    );
  }
}

export default App;
