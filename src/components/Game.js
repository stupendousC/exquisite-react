import React, { Component } from 'react';
import './Game.css';
import PlayerSubmissionForm from './PlayerSubmissionForm';
import FinalPoem from './FinalPoem';
import RecentSubmission from './RecentSubmission';

class Game extends Component {

  constructor(props) {
    super(props);

    this.state = {
      prevLine: '',
      wholePoem: [],
      currPlayer: 1,
      totalPlayerCount: 3,
      gameOver: false,
    }
  }

  rotatePlayer = () => {
    // HELPER FCN
    if (this.state.currPlayer === this.state.totalPlayerCount) {
      this.setState({ currPlayer: 1 });
    } else {
      this.setState({ currPlayer: this.state.currPlayer + 1 });
    }
  }

  submitLine = (line) => {
    let currWholePoem = [...this.state.wholePoem];
    currWholePoem.push(line);
    this.setState({ prevLine: line, wholePoem: currWholePoem });
    this.rotatePlayer();
  }

  gameOver = () => {
    this.setState({ gameOver: true });
  }
  
  showOrHideRecentSubmission = () => {
    if (this.state.gameOver) {
      return null;
    } else if (this.state.prevLine) {
      return <RecentSubmission prevLine={this.state.prevLine}/>
    }
  }

  render() {

    const exampleFormat = FIELDS.map((field) => {
      if (field.key) {
        return field.placeholder;
      } else {
        return field;
      }
    }).join(" ");

    return (
      <div className="Game">
        <h2>Game</h2>

        <p>Each player should take turns filling out and submitting the form below. Each turn should be done individually and <em>in secret!</em> Take inspiration from the revealed recent submission. When all players are finished, click the final button on the bottom to reveal the entire poem.</p>

        <p>Please follow the following format for your poetry submission:</p>

        <p className="Game__format-example">
          { exampleFormat }
        </p>

        { this.showOrHideRecentSubmission() }

        <PlayerSubmissionForm currPlayer={this.state.currPlayer} lineSubmitCallback={this.submitLine}/>

        { this.state.gameOver? <FinalPoem wholePoem={this.state.wholePoem}/>:<FinalPoem wholePoem={null} gameOverCallback={this.gameOver}/>}

      </div>
    );
  }
}

const FIELDS = [
  "The",
  {
    key: 'adj1',
    placeholder: 'adjective',
  },
  {
    key: 'noun1',
    placeholder: 'noun',
  },
  {
    key: 'adv',
    placeholder: 'adverb',
  },
  {
    key: 'verb',
    placeholder: 'verb',
  },
  "the",
  {
    key: 'adj2',
    placeholder: 'adjective',
  },
  {
    key: 'noun2',
    placeholder: 'noun',
  },
  ".",
];

export default Game;
