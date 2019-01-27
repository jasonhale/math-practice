import React from 'react';

function Header ({ checkAnswers, clearAnswers, resetProblems, count, updateCount }) {
  return (
    <header className="mainColumn mainSection">
      <h1>Math Practice Time</h1>

      <section id="pageUI" className="">
        <div className="button-list">

          <button className="button-list-item button checkanswers" onClick={checkAnswers}><i className="fa fa-check"/> Check My Answers</button>
          <button className="button-list-item button clearanswers" onClick={clearAnswers}><i className="fa fa-eraser"/> Clear My Answers</button>
          
          <label htmlFor="max-count" className="text-small button-list-item inline-input">
              Total problems: <input name="max-count" className="input input-simple js-max-count" type="number" placeholder="Enter Number of Problems..." value={count} onChange={updateCount}/></label>
          
          <button className="button-list-item button js-regenerate" onClick={resetProblems}>
            <i className="fa fa-refresh"/> Create New Questions
          </button>

        </div>
      </section>
    </header>
  );
}

export default Header;