import React, { Component } from 'react';
import './App.css';
// import './css/styles.css';
import Header from './components/Header';
import SettingsUI from './components/Settings/SettingsUI';
import Problem from './components/Problem';
import Modal from './components/Modal';
import Footer from './components/Footer';
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
    probStyle: this.props.probStyle,
    reveal: false,
    answers: {
      totalAnswered: 0,
      totalCorrect: 0,
      totalIncorrect: 0
    }
  }

  componentDidMount(){
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
    let totalAnswered = 0, totalCorrect = 0, totalIncorrect = 0;
    this.state.problems.forEach((p) => {
      const inp = parseInt(p.input, 10);
      if (inp && inp !== 0) {
        totalAnswered += 1;
        if (p.answer === parseInt(p.input, 10)) totalCorrect += 1;
          else totalIncorrect += 1;
      }
    });
    this.setState({
      reveal: true,
      answers: {
        totalAnswered,
        totalCorrect,
        totalIncorrect
      }
    });
    this.toggleAnswersModal();
  }

  clearAnswers = () => {
    const resetProbs = this.state.problems.map(p => {
      p.input = '';
      return p;
    });
    this.setState({
      problems: resetProbs,
      reveal: false
    });
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

  onChange = (idx, val) => {
    const problems = [ ...this.state.problems ];
    problems[idx].input = val;
    console.log(`idx: ${idx} || val: ${val}`);
    this.setState({ problems });
  };

  renderProblems = () => {
    const { problems } = this.state;

    return problems.map((problem, i) => 
      (
        <Problem
          key={`problem${i}`}
          index={i}
          name={`problem${i}`}
          operator={problem.operator}
          numA={problem.numA}
          numB={problem.numB}
          answer={problem.answer}
          input={problem.input}
          onChange={this.onChange}
        />
      )
    );
  }

  render() {

    return (
      <>
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

        <main>
          <ul className={`problems problems--${this.state.probStyle} ${this.state.reveal && 'problems--reveal'}`}>
            { this.renderProblems() }
          </ul>
        </main>
        
        <Footer />

        <Modal
          show={this.state.answersOpen}
          toggle={this.toggleAnswersModal}
          totalAnswered={this.state.answers.totalAnswered}
          totalCorrect={this.state.answers.totalCorrect}
          totalIncorrect={this.state.answers.totalIncorrect}
        />
      </>
    );
  }
}

export default App;
