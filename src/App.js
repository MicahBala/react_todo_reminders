import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import Tasks from "./components/Tasks";
// import TASKS from "./shared/tasks";
import AddTask from "./components/AddTask";
import Footer from "./components/Footer";
import About from "./components/About";

class App extends Component {
  constructor() {
    super();

    this.state = {
      tasks: "",
      showAddTask: false,
    };
  }

  componentDidMount() {
    const getTasks = async () => {
      const taskFromServer = await this.fetchTasks();
      this.setState({ tasks: taskFromServer });
    };

    getTasks();
  }

  // Fetch Tasks
  fetchTasks = async () => {
    const res = await fetch("http://localhost:5000/tasks");

    const data = await res.json();

    return data;
  };

  // Fetch a single Task
  fetchSingleTask = async (id) => {
    const res = await fetch(`http://localhost:5000/tasks/${id}`);

    const data = await res.json();

    return data;
  };

  render() {
    // Add Task
    const addTask = async (task) => {
      const res = await fetch("http://localhost:5000/tasks", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(task),
      });

      const data = await res.json();

      this.setState({
        tasks: [...this.state.tasks, data],
      });

      // const id = Math.floor(Math.random() * 1000) + 1;

      // const newTask = { id, ...task };

      // this.setState({
      //   tasks: [...this.state.tasks, newTask],
      // });
    };

    // Delete task
    const deleteTask = async (id) => {
      await fetch(`http://localhost:5000/tasks/${id}`, {
        method: "DELETE",
      });

      this.setState({
        tasks: this.state.tasks.filter((task) => task.id !== id),
      });
    };

    // Toggle reminder
    const toggleReminder = async (id) => {
      // Get the task, update it and put it in a variable
      const taskToToggle = await this.fetchSingleTask(id);
      const updatedTask = {
        ...taskToToggle,
        reminder: !taskToToggle.reminder,
      };

      // Update task on the database
      const res = await fetch(`http://localhost:5000/tasks/${id}`, {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(updatedTask),
      });

      const data = await res.json();

      // Update task on the user interface
      this.setState({
        tasks: this.state.tasks.map((task) =>
          task.id === id ? { ...task, reminder: data.reminder } : task
        ),
      });
    };

    return (
      <BrowserRouter>
        <div className="container">
          <Header
            onAdd={() =>
              this.setState({ showAddTask: !this.state.showAddTask })
            }
            showAdd={this.state.showAddTask}
          />

          {this.state.showAddTask && <AddTask onAdd={addTask} />}

          <Route
            exact
            path="/"
            render={() => (
              <>
                {this.state.tasks.length > 0 ? (
                  <Tasks
                    tasks={this.state.tasks}
                    onDelete={deleteTask}
                    onToggle={toggleReminder}
                  />
                ) : (
                  "No Tasks to show"
                )}
              </>
            )}
          />
          <Route exact path="/about" component={About} />

          <Footer />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
