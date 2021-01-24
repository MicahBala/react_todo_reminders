import React, { Component } from "react";
import "./App.css";
import Header from "./components/Header";
import Tasks from "./components/Tasks";
import TASKS from "./shared/tasks";
import AddTask from "./components/AddTask";

class App extends Component {
  constructor() {
    super();

    this.state = {
      tasks: TASKS,
    };
  }

  render() {
    // Add Task
    const addTask = (task) => {
      const id = Math.floor(Math.random() * 1000) + 1;
      // console.log(id);

      const newTask = { id, ...task };
      // console.log(newTask);

      this.setState({
        tasks: [...this.state.tasks, newTask],
      });
    };

    // Delete task
    const deleteTask = (id) => {
      this.setState({
        tasks: this.state.tasks.filter((task) => task.id !== id),
      });
    };

    // Toggle reminder
    const toggleReminder = (id) => {
      this.setState({
        tasks: this.state.tasks.map((task) =>
          task.id === id ? { ...task, reminder: !task.reminder } : task
        ),
      });
    };

    return (
      <div className="container">
        <Header />
        <AddTask onAdd={addTask} />
        {this.state.tasks.length > 0 ? (
          <Tasks
            tasks={this.state.tasks}
            onDelete={deleteTask}
            onToggle={toggleReminder}
          />
        ) : (
          "No Tasks to show"
        )}
      </div>
    );
  }
}

export default App;
