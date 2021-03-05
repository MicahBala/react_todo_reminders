import React, { Component } from "react";
import Header from "./components/Header";
import Tasks from "./components/Tasks";
import AddTask from "./components/AddTask";
import tasks from "./shared/tasks";

class App extends Component {
  constructor() {
    super();

    this.state = {
      tasks,
      showForm: false,
    };
  }

  render() {
    // Add Task
    const addTask = (task) => {
      // console.log(task);
      const id = Math.floor(Math.random() * 1000) + 1;
      const newTask = { id, ...task };

      this.setState({
        tasks: [...tasks, newTask],
      });
    };

    // Delete a task
    const deleteTask = (id) => {
      // console.log("delete task ", id);
      this.setState({
        tasks: this.state.tasks.filter((task) => task.id !== id),
      });
    };

    // Toggle reminder
    const toggleReminder = (id) => {
      // console.log("task ", id);
      this.setState({
        tasks: this.state.tasks.map((task) => {
          return task.id === id ? { ...task, reminder: !task.reminder } : task;
        }),
      });
    };

    // Toggle add task form

    return (
      <div className="container">
        <Header
          title="Task Tracker"
          showAdd={this.state.showForm}
          onAdd={() =>
            this.setState({
              showForm: !this.state.showForm,
            })
          }
        />
        {this.state.showForm && <AddTask onAdd={addTask} />}
        {this.state.tasks.length > 0 ? (
          <Tasks
            tasks={this.state.tasks}
            onDelete={deleteTask}
            onToggle={toggleReminder}
          />
        ) : (
          <h3>No task to display</h3>
        )}
      </div>
    );
  }
}

export default App;
