import React, { Component } from 'react';
import './Input.css'

class Input extends Component {
  state = {
    inputValue: '',
    isFocused: false
  }

  inputRef = React.createRef();

  onChange = event => {
    this.setState({
      inputValue: event.target.value,
    });
  }

  onSubmit = event => {
    event.preventDefault();
    this.props.onAddTask(this.state.inputValue);
    this.setState({
      inputValue: '',
    });
    this.inputRef.current.focus();
  }

  onFocus = () => {
    this.setState({isFocused: true});
  }

  onBlur = () => {
    this.setState({isFocused: false});
  }

  render() {
    return (
      <>
        <div className="app__input-wrapper input-wrapper">
          <form 
            className="input-wrapper__form"
            onSubmit={this.onSubmit}>
            <input 
              ref={this.inputRef}
              type="text"
              placeholder="Add new task"
              className="input-wrapper__input"
              value={this.state.inputValue}
              onChange={this.onChange}
              onFocus={this.onFocus}
              onBlur={this.onBlur}
            />
          </form>
          {(this.state.isFocused || this.state.inputValue !== '') && <button 
            className={`input-wrapper__button button
            ${this.state.isFocused && this.state.inputValue !== '' ? 'input-wrapper__active' : ''}
            ${this.state.isFocused ? ' input-wrapper__focused' : ''}
            `}
            onClick={this.onSubmit}
          >
            Add
          </button>}
        </div>
        <div className={`underline ${this.state.isFocused ? 'underline__focused' : 'underline__unfocused'}`}></div>
      </>
    )
  } 
}

export default Input;