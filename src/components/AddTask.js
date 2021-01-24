import React, { Component } from "react";

class AddTask extends Component {
  constructor(props) {
    super(props);

    this.state = {
      text: "",
      day: "",
      reminder: "",
    };
  }

  render() {
    // console.log(this.props.onAdd());

    const onSubmit = (e) => {
      e.preventDefault();

      // Check if you are submiting without a task
      if (!this.state.text) {
        alert("Please add a task");
        return;
      }

      //   Pass the task as an object to the onAdd function
      const { text, day, reminder } = this.state;
      this.props.onAdd({ text, day, reminder });

      //   After submiting, empty the current state
      this.setState({
        text: "",
        day: "",
        reminder: false,
      });
    };

    return (
      <form className="add-form" onSubmit={onSubmit}>
        <div className="form-control">
          <label>Task</label>
          <input
            type="text"
            placeholder="Add Task"
            value={this.state.text}
            onChange={(e) =>
              this.setState({
                text: e.target.value,
              })
            }
          />
        </div>

        <div className="form-control">
          <label>Day & Time</label>
          <input
            type="text"
            placeholder="Add Day & Time"
            value={this.state.day}
            onChange={(e) =>
              this.setState({
                day: e.target.value,
              })
            }
          />
        </div>

        <div className="form-control form-control-check">
          <label>Set Reminder</label>
          <input
            type="checkbox"
            checked={this.state.reminder}
            value={this.state.reminder}
            onChange={(e) =>
              this.setState({
                reminder: e.currentTarget.checked,
              })
            }
          />
        </div>

        <input type="submit" value="Save Task" className="btn btn-block" />
      </form>
    );
  }
}

export default AddTask;
