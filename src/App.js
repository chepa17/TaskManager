import React, { Component } from 'react';
import Input from './Components/Input/Input';
import Task from './Components/Task/Task';
import './App.css';
function getTasks() {
  return JSON.parse(localStorage.getItem('tasks')) || [];
}
function getID() {
  return Number(localStorage.getItem('taskId')) || 1000;
}
function updateStorage(tasklist, id) {
  localStorage.setItem('tasks', JSON.stringify(tasklist));
  localStorage.setItem('taskId', id);
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: [],
      taskId: 1000,
    };

    this.inCompleteCount = 0;
    this.onAddTask = this.onAddTask.bind(this);
    this.onComplete = this.onComplete.bind(this);
    this.onRemove = this.onRemove.bind(this);
  }

  componentDidMount() {
    const inCompletedTasks = getTasks().filter(task => !task.isCompleted);
    const id = getID();
    updateStorage(inCompletedTasks, id);
    this.setState({
      tasks: getTasks().map(task => ({...task, id: +task.id})),
      taskId: getID(),
    })
    this.inCompleteCount = inCompletedTasks.length;
  }

  componentDidUpdate(_, prevState) {
    if (JSON.stringify(prevState.tasks) !== JSON.stringify(this.state.tasks)) {
      updateStorage(this.state.tasks, this.state.taskId);
    }    
  }

  onComplete(id) {
    this.setState(prevState => {
      const index = prevState.tasks.findIndex(item => item.id === id);
      const newTask = {...prevState.tasks[index]};
      newTask.isCompleted = !prevState.tasks[index].isCompleted;
      newTask.completedDate = newTask.isCompleted ? Date.now() : null;
      const newTasks = [...prevState.tasks];
      newTasks.splice(index, 1);
      if (newTask.isCompleted) {
        newTasks.push(newTask);
        this.inCompleteCount--;
      } else {
        newTasks.splice(this.inCompleteCount, 0, newTask);
        this.inCompleteCount++;
      }
      return {
        tasks: newTasks,
      }
    });
  }

  onRemove(id) {
    this.setState(prevState => {
      return ({
        tasks: prevState.tasks.filter(item => item.id !== id),
      })
    })
  }

  onAddTask(task) {
    if (task !== '') {
      this.setState(prevState => {
        const newTasks = [...prevState.tasks];
        newTasks.splice(this.inCompleteCount, 0 , {
          title: task,
          id: prevState.taskId,
          isCompleted: false,
          completedDate: null
        });
        this.inCompleteCount++;
        return ({
          tasks: newTasks,
          taskId: prevState.taskId + 1,
        })
      });      
    }
  }

  render() {
    const { tasks } = this.state; 

    return (
      <div className="app">
        <h1 className="app__main-heading">Task Manager</h1>
        <h2 className="app__heading">Work</h2>
        <Input onAddTask={this.onAddTask}/>
        <div>
          {tasks.map(task => (
            <Task 
              key={task.id} 
              task={task} 
              onComplete={this.onComplete} 
              onRemove={this.onRemove} 
            />
          ))}
        </div>
      </div>
    )
  }
}

export default App;
