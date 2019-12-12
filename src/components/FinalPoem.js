import React from 'react';
import './FinalPoem.css';
import PropTypes from 'prop-types';

const FinalPoem = ({ gameOver, wholePoem, gameOverCallback, newGameCallback }) => {

  const printWholePoem = () => {
    if (wholePoem) {
      return (wholePoem.map((line, i)=> {
        return(<p key={i}>{line}</p>);
      }));
    } else {
      return null;
    }
  }

  const showOrHideWholePoem = () => {
    if (gameOver) {
      return (
        <section className="FinalPoem__poem">
          <h3>Final Poem</h3>
          {printWholePoem()}
        </section>
      );
    } else {
      return null;
    }
  }

  const showCorrectButton = () => {
    if (gameOver) {
      return (<input onClick={newGameCallback} type="button" value="Click for New Game!" className="FinalPoem__reveal-btn new-game" />);
    } else {
      return (<input onClick={gameOverCallback} type="button" value="We are finished: Reveal the Poem" className="FinalPoem__reveal-btn" />);
    }
  }

  return (
    <div className="FinalPoem">
        { showOrHideWholePoem() }

      <div className="FinalPoem__reveal-btn-container">
        { showCorrectButton() }
      </div>
    </div>
  );
}

FinalPoem.propTypes = {
  gameOver: PropTypes.bool.isRequired, 
  wholePoem: PropTypes.array, 
  gameOverCallback: PropTypes.func, 
  newGameCallback: PropTypes.func,
}

export default FinalPoem;
