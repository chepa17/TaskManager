import React, { Component } from 'react';
import './Input.css'

class Input extends Component {
  constructor({ props }) {
    super(props);
    this.state = {
      inputValue: '',
      isFocused: false
    }

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onFocus = this.onFocus.bind(this);
    this.onBlur = this.onBlur.bind(this);
  }

  onChange(event) {
    this.setState({
      inputValue: event.target.value,
    });
  }

  onSubmit(event) {
    event.preventDefault();
    this.props.onAddTask(this.state.inputValue);
    this.setState({
      inputValue: '',
    });
  }

  onFocus() {
    this.setState({isFocused: true});
  }

  onBlur() {
    this.setState({isFocused: false});
  }

  render() {
    return (
      <div className="app__input-wrapper input-wrapper">
        <form 
          className="input-wrapper__form"
          onSubmit={this.onSubmit}>
          <input 
            type="text"
            placeholder="Add new task"
            className="input-wrapper__input"
            value={this.state.inputValue}
            onChange={this.onChange}
            onFocus={this.onFocus}
            onBlur={this.onBlur}
          />
        </form>
        {this.state.isFocused && <button 
          className={`input-wrapper__button button
          ${this.state.isFocused && this.state.inputValue !== '' ? 'input-wrapper__active' : ''}
          ${this.state.isFocused ? ' input-wrapper__focused' : ''}
          `}
          onClick={this.onSubmit}
        >
          Add
        </button>}
      </div>
    )
  } 
}

export default Input;