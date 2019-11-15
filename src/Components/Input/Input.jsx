import React, { Component } from 'react';
import './Input.css'

class Input extends Component {
  constructor({ props }) {
    super(props);
    this.state = {
      inputValue: '',
    }

    // this.getNewTask = this.props.getNewTask.bind();
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
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
          />
        </form>
        <button 
          className={`input-wrapper__button button
          ${this.state.inputValue === '' ? ' input-wrapper__disactive' : ' input-wrapper__active'}`}
          onClick={this.onSubmit}
        >
          Add
        </button>
      </div>
    )
  } 
}

export default Input;