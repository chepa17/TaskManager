import React, { Component } from 'react';
import Input from './Components/Input/Input';
import Task from './Components/Task/Task';
import './App.css';
import dayjs from 'dayjs'
const { uuid } = require('uuidv4');

function getTasks() {
  return JSON.parse(localStorage.getItem('tasks')) || [];
}

function updateStorage(tasklist = []) {
  localStorage.setItem('tasks', JSON.stringify(tasklist.filter(task => !task.completedAt)));
}

class App extends Component {  
  state = {
    tasks: [],
  };

  componentDidMount() {
    this.setState({
      tasks: getTasks(),
    })
  }

  componentDidUpdate(_, prevState) {
    if (JSON.stringify(prevState.tasks) !== JSON.stringify(this.state.tasks)) {
      updateStorage(this.state.tasks);
    }    
  }

  onToggle = id => {
    this.setState(prevState => {
      const index = prevState.tasks.findIndex(item => item.id === id);
      const newTask = {...prevState.tasks[index]};
      newTask.completedAt = !newTask.completedAt ? dayjs() : null;
      const newTasks = [...prevState.tasks];
      newTasks[index] = newTask;

      return {
        tasks: newTasks,
      }
    });
  }

  onRemove = id => {
    this.setState(prevState => {
      return ({
        tasks: prevState.tasks.filter(item => item.id !== id),
      })
    })
  }

  onAddTask = task => {
    if (task !== '') {
      this.setState(prevState => ({
          tasks: [
          ...prevState.tasks, 
          {
            title: task,
            id: uuid(),
            completedAt: null
          }],
        }));      
  }}

  render() {
    const { tasks } = this.state; 
    const sortedTask = [...tasks].sort((a,b)=> a.completedAt - b.completedAt);

    return (
      <div className="app">
        <h1 className="app__main-heading">Task Manager</h1>
        <h2 className="app__heading">Work</h2>
        <Input onAddTask={this.onAddTask}/>
        <div>
          {sortedTask.map(task => (
            <Task 
              key={task.id} 
              task={task} 
              onToggle={this.onToggle} 
              onRemove={this.onRemove} 
            />
          ))}
        </div>
      </div>
    )
  }
}

export default App;
