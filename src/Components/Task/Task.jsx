import React, { Component }  from 'react';
import PropTypes from 'prop-types';
import './Task.css'

class Task extends Component {
  id = this.props.task.id;
  timeoutId = 0;

  componentDidUpdate(prevProps) {
    if (!!prevProps.task.completedAt === !this.props.task.completedAt) {
      if (!this.props.task.completedAt) {
        clearTimeout(this.timeoutId);
      }
      
      if (!!this.props.task.completedAt) {
        this.timeoutId = setTimeout(() => {
          this.props.onRemove(this.id)
        }, 60000);
      }
    }
  }

  render() {
    const { task } = this.props;

    return (
      <div className="tasklist__task task">
        <div className="task__body">
          <div 
            onClick={this.onComplete}
            className={`roundedCheckbox${!!task.completedAt ? ' checked' : ''}`}>
            <input 
              type="checkbox"
              name="isComplited"
              className="task__checkbox roundedCheckbox"
              id={`roundedCheckbox${task.id}`}
              checked={task.isCompleted}
              onChange={() => this.props.onToggle(this.id)}
            />
            <label htmlFor={`roundedCheckbox${task.id}`}></label>
          </div>
          <p className={`task__title${!!task.completedAt ? ' task__completed' : ''}`}>{task.title}</p>
        </div>
        {
          !!task.completedAt && 
            (<p className="task__date">
              {task.completedAt.format('MMM D, YYYY')}
            </p>)
        }       
      </div>
    )
  }

}

Task.propTypes = {
  task: PropTypes.shape({
    title: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
  }).isRequired,
  onToggle: PropTypes.func.isRequired,
  onRemove: PropTypes.func.isRequired,
};

export default Task;