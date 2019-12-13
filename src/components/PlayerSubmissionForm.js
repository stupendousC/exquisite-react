import React, { Component } from 'react';
import './PlayerSubmissionForm.css';
import PropTypes from 'prop-types';

class PlayerSubmissionForm extends Component {

  constructor(props) {
    super(props);
    
    // iterate through fields and separate out into sentenceKeys/Values/Placeholders arrays
    const fields = this.props.fields;
    let sentenceKeys;
    let sentenceValues = [];
    let sentencePlaceholders = [];

    sentenceKeys = fields.map(element => {
      if (typeof(element) === 'string' ) {
        // element is something like "the" or punctuation
        sentenceValues.push(element);
        sentencePlaceholders.push("");
        return element;

      } else { 
        // element is a hash like { key: 'verb', placeholder: 'verb' }
        sentenceValues.push("");
        sentencePlaceholders.push(element.placeholder);
        return element.key;
      }
    });
    
    this.state = {
      sentenceKeys: sentenceKeys,
      sentenceValues: sentenceValues,
      sentencePlaceholders: sentencePlaceholders,

      origKeys: sentenceKeys,
      origValues: sentenceValues,
      origPlaceholders: sentencePlaceholders,
    }
  }

  genInputFields = () => {
    const validBackground = "PlayerSubmissionForm__input--valid";
    const invalidBackground = "PlayerSubmissionForm__input--invalid";

    return (this.state.sentenceKeys.map((key, i) => {
      const currValue = this.state.sentenceValues[i];
      const currPlaceholder = this.state.sentencePlaceholders[i];

      if (currPlaceholder === "") {
        // not an active field for user input
        return currValue;
      } else if ( currValue.length === 0 ) {
        return (<input value={currValue} name={key} onChange={this.onFieldChange} type="text" placeholder={currPlaceholder} className={invalidBackground} key={i}/>);
      } else if ( currValue.length > 0) {
        return (<input value={currValue} name={key} onChange={this.onFieldChange} type="text" placeholder={currPlaceholder} className={validBackground} key={i}/>);
      } else {
        return <h1>Unexpected bug, plz call customer service at 1-800-LOL-OOOPS</h1>
      }
  }))}

  emptyFields = () => {
    // HELPER FCN
    this.setState ({
      sentenceKeys: this.state.origKeys,
      sentenceValues: this.state.origValues,
      sentencePlaceholders: this.state.origPlaceholders,
    })
  }

  onFieldChange = (event) => {
    const currKey = event.target.name;
    const value = event.target.value;
    const index = this.state.sentenceKeys.findIndex(key => key===currKey);

    let updatedSentenceValues = [...this.state.sentenceValues];
    updatedSentenceValues[index] = value;
    this.setState({ sentenceValues: updatedSentenceValues });
  }

  getBadFields = () => {
    let badFields = [];
    for (let i = 0; i<this.state.sentenceKeys.length; i++) {
      if (this.state.sentenceValues[i] === "") {
        badFields.push(this.state.sentenceKeys[i]);
      }
    }
    return ( badFields.length === 0 ? null : badFields );
  }

  joinSentence = () => {
    const values = this.state.sentenceValues;
    const length = values.length;
    const toJoin = values.slice(0, length-1);
    const lastWord = values.slice(length-1);
    let sentence = toJoin.join(" ");
    sentence += lastWord[0];
    
    return sentence;
  }

  onFormSubmit = (event) => {
    event.preventDefault();

    const badFields = this.getBadFields();
    
    if (badFields) {
      console.log("MISSING THESE FIELDS:", badFields);
      return;
    } 

    const sentence = this.joinSentence();
    
    this.emptyFields();

    this.props.lineSubmitCallback(sentence);  
  }

  render() {

    return (
      <div className="PlayerSubmissionForm">
        <h3>Player Submission Form for Player #{ this.props.currPlayer }</h3>

        <form onSubmit={this.onFormSubmit} className="PlayerSubmissionForm__form" >

          <div className="PlayerSubmissionForm__poem-inputs">
            { this.genInputFields() }
          </div>

          <div className="PlayerSubmissionForm__submit">
            <input type="submit" value="Submit Line" className="PlayerSubmissionForm__submit-btn" />
          </div>
        </form>
      </div>
    );
  }
}

PlayerSubmissionForm.propTypes = {
  currPlayer: PropTypes.number.isRequired,
  lineSubmitCallback: PropTypes.func.isRequired,
  fields: PropTypes.array,
}

export default PlayerSubmissionForm;
