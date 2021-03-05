import React, { Component } from "react";

class AddTask extends Component {
  constructor(props) {
    super(props);

    this.state = {
      text: "",
      day: "",
      reminder: false,
    };
  }
  render() {
    const onSubmit = (e) => {
      e.preventDefault();

      if (!this.state.text) {
        alert("Please add a task!");
        return;
      }

      const { text, day, reminder } = this.state;
      this.props.onAdd({ text, day, reminder });

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
            placeholder="Add task"
            value={this.state.text}
            onChange={(e) => {
              this.setState({ text: e.target.value });
            }}
          />
        </div>

        <div className="form-control">
          <label>Day & Time</label>
          <input
            type="text"
            placeholder="Add day & time"
            value={this.state.day}
            onChange={(e) => {
              this.setState({ day: e.target.value });
            }}
          />
        </div>

        <div className="form-control form-control-check">
          <label>Set Reminder</label>
          <input
            type="checkbox"
            checked={this.state.reminder}
            value={this.state.reminder}
            onChange={(e) => {
              this.setState({ reminder: e.currentTarget.checked });
            }}
          />
        </div>

        <input type="submit" value="Save Task" className="btn btn-block" />
      </form>
    );
  }
}

export default AddTask;
