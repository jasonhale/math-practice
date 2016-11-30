import React from 'react';

const Modal = ({show, toggle, totalAnswered, totalCorrect, totalIncorrect}) => {
    return(
      <div className={'modal js-modal' + ((show)? ' open' : '')}>
        <div className="modal-overlay js-modal-overlay"/>
        <div className="modal-box modal-answer js-modal-box js-modal-answers">
          <h2>Totals!</h2>
          <p>
            <span className="answer-label">Total answered: </span><span className="answer-total total-answered">{totalAnswered}</span><br/>
            <span className="answer-label">Total correct: </span><span className="answer-total total-correct">{totalCorrect}</span><br/>
            <span className="answer-label">Total incorrect: </span><span className="answer-total total-incorrect">{totalIncorrect}</span>
          </p>
          <p>
            <button className="button modal-continue js-modal-continue" onClick={toggle}>&raquo; CONTINUE &laquo;</button>
          </p>
        </div>
      </div>
    );
};

export default Modal;