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

  // Fetch data
  fetchTasks = async () => {
    const res = await fetch("http://localhost:5000/tasks");
    const data = await res.json();
    return data;
  };

  componentDidMount() {
    const getTasks = async () => {
      const tasksFromSever = await this.fetchTasks();

      // Set the state with data from server
      this.setState({
        tasks: tasksFromSever,
      });
    };

    getTasks();
  }

  render() {
    // Add Task
    const addTask = async (task) => {
      const res = await fetch(`http://localhost:5000/tasks`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(task),
      });

      const newTask = await res.json();

      this.setState({
        tasks: [...this.state.tasks, newTask],
      });
    };

    // Delete a task
    const deleteTask = async (id) => {
      await fetch(`http://localhost:5000/tasks/${id}`, {
        method: "DELETE",
      });

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
