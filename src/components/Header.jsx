import React from 'react';
import Button from './Button';
import './Header.css';

export default function Header({ checkAnswers, clearAnswers, resetProblems, count, updateCount }) {

  return (
    <header className="header">
      <div className="header__content">
        <h1 className="header__title">Math Practice Time</h1>
      
        <div className="header__buttons">          
          <Button className="header__button" icon="fa-check" onClick={checkAnswers}>Check my answers</Button>
          <Button className="header__button" icon="fa-eraser" onClick={clearAnswers}>Clear my answers</Button>
          
          <label htmlFor="max-count" className="header__button header__input-label">
            Total problems: <input name="max-count" className="headr__input" type="number" placeholder="Enter Number of Problems..." value={count} onChange={updateCount}/>
          </label>
          
          <Button className="header__button" icon="fa-refresh" onClick={resetProblems}>Create New Questions</Button>
        </div>
      </div>
    </header>
  );
}
