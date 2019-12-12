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
    
    console.log(`sentenceKeys = ${sentenceKeys}`);
    console.log(`sentenceValues = ${sentenceValues}`);
    console.log(`sentencePlaceholders = ${sentencePlaceholders}`);
    
    this.state = {
      sentenceKeys: sentenceKeys,
      sentenceValues: sentenceValues,
      sentencePlaceholders: sentencePlaceholders,
    }
  }

  emptyFields = () => {
    // HELPER FCN
    this.setState ({
      adj1: '',
      noun1: '',
      adverb: '',
      verb: '',
      adj2: '',
      noun2: '',
    })
  }

  onFieldChange = (event) => {
    // console.log('Player input:', event.target.value, "for", event.target.name);
    const field = event.target.name;
    const value = event.target.value;
    this.setState({ [field]: value });
  }

  getBadFields = () => {
    const entries = Object.entries(this.state);
    const badEntries = entries.filter( field => { return (!field[1]) });
    const badFields = badEntries.map( subarray => { return subarray[0] });
    return ( badFields.length === 0 ? null : badFields );
  }

  onFormSubmit = (event) => {
    event.preventDefault();

    const badFields = this.getBadFields();
    
    if (badFields) {
      console.log("MISSING THESE FIELDS:", badFields);
      return;
    } 

    const { adj1, noun1, adverb, verb, adj2, noun2 } = this.state;
    const line = `The ${adj1} ${noun1} ${adverb} ${verb} the ${adj2} ${noun2}.`;
    this.emptyFields();

    this.props.lineSubmitCallback(line);  
  }

  render() {

    return (
      <div className="PlayerSubmissionForm">
        <h3>Player Submission Form for Player #{ this.props.currPlayer }</h3>

        <form onSubmit={this.onFormSubmit} className="PlayerSubmissionForm__form" >

          <div className="PlayerSubmissionForm__poem-inputs">
            
            The 
            <input value={this.state.adj1} name="adj1" onChange={this.onFieldChange} type="text" placeholder="adjective" className="PlayerSubmissionForm__input--invalid"/>
            <input value={this.state.noun1} name="noun1" onChange={this.onFieldChange} type="text" placeholder="noun" className="PlayerSubmissionForm__input--invalid"/>
            <input value={this.state.adverb} name="adverb" onChange={this.onFieldChange} type="text" placeholder="adverb" className="PlayerSubmissionForm__input--invalid"/>
            <input value={this.state.verb} name="verb" onChange={this.onFieldChange} type="text" placeholder="verb" className="PlayerSubmissionForm__input--invalid"/>
            the 
            <input value={this.state.adj2} name="adj2" onChange={this.onFieldChange} type="text" placeholder="adjective" className="PlayerSubmissionForm__input--invalid" />
            <input value={this.state.noun2} name="noun2" onChange={this.onFieldChange} type="text" placeholder="noun" className="PlayerSubmissionForm__input--invalid" />
            .
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
}

export default PlayerSubmissionForm;
