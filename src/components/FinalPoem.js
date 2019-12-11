import React from 'react';
import './FinalPoem.css';

const FinalPoem = ({ wholePoem, gameOverCallback }) => {

  const printWholePoem = () => {
    if (wholePoem) {
      return (wholePoem.map((line, i)=> {
        return(<p key={i}>{line}</p>);
      }));
    } else {
      return <p>You ain't got nuthin'</p>
    }
  }

  return (
    <div className="FinalPoem">
      <section className="FinalPoem__poem">
        <h3>Final Poem</h3>
        {printWholePoem()}
      </section>

      <div className="FinalPoem__reveal-btn-container">
        <input onClick={gameOverCallback} type="button" value="We are finished: Reveal the Poem" className="FinalPoem__reveal-btn" />
      </div>
    </div>
  );
}

export default FinalPoem;
