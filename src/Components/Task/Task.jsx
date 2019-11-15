import React, { Component }  from 'react';
import PropTypes from 'prop-types';
import './Task.css'

class Task extends Component {
  constructor(props) {
    super(props);

    this.onComplete = this.onComplete.bind(this);
    this.timeoutId = 0;
    this.id = this.props.task.id;
  }

  componentDidUpdate(prevProps) {
    if (prevProps.task.isCompleted !== this.props.task.isCompleted) {
      if (!this.props.task.isCompleted) {
        clearTimeout(this.timeoutId);
      }
      
      if (this.props.task.isCompleted) {
        this.timeoutId = setTimeout(() => {
          this.props.onRemove(this.id)
        }, 60000);
      }
    }
  }

  onComplete() {
    this.props.onComplete(this.id);
  }

  render() {
    const { task } = this.props;
    const date = new Date(task.completedDate);
    const monthNames = [
      "Jan", "Feb", "Mar", "Apr", "May", "Jun",
      "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];
    return (
      <div className="tasklist__task task">
        <div className="task__body">
          <div className={`roundedCheckbox${task.isCompleted ? ' checked' : ''}`}>
            <input 
              type="checkbox"
              name="isComplited"
              className="task__checkbox roundedCheckbox"
              id={`roundedCheckbox${task.id}`}
              checked={task.isCompleted}
              onChange={this.onComplete}
            />
            <label htmlFor={`roundedCheckbox${task.id}`}></label>
          </div>
          <p className={`task__title${task.isCompleted ? ' task__completed' : ''}`}>{task.title}</p>
        </div>
        {
          task.isCompleted && 
            (<p className="task__date">
              {`${monthNames[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`}
            </p>)
        }       
      </div>
    )
  }

}

Task.propTypes = {
  task: PropTypes.shape({
    title: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
    isCompleted: PropTypes.bool.isRequired,
    completedDate: PropTypes.number,
  }).isRequired,
  onComplete: PropTypes.func.isRequired,
  onRemove: PropTypes.func.isRequired,
};

export default Task;