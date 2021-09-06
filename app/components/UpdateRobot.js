import React, { Component } from 'react';
import { updateRobot } from '../redux/robots';
import { fetchSingleRobot } from '../redux/singleRobot';
import { connect } from 'react-redux';

class UpdateRobot extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: this.props.singleRobot.name,
      fuelLevel: this.props.singleRobot.fuelLevel,
      error: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(evt) {
    this.setState({
      [evt.target.name]: evt.target.value,
    });
  }

  async handleSubmit(evt) {
    evt.preventDefault();
    const changeName = this.props.singleRobot.name !== this.state.name;
    const changeFuelLevel = this.props.singleRobot.fuelLevel !== this.state.fuelLevel;
    try {
      if (changeName && changeFuelLevel) {
        await this.props.updateSingleRobot({
          ...this.props.singleRobot,
          name: this.state.name,
          fuelLevel: this.state.fuelLevel
        });
      } else if (changeName) {
        await this.props.updateSingleRobot({
          ...this.props.singleRobot,
          name: this.state.name,
        });
      } else if (changeFuelLevel) {
        await this.props.updateSingleRobot({
          ...this.props.singleRobot,
          fuelLevel: this.state.fuelLevel,
        });
      }
      await this.props.fetchRobot(this.props.singleRobot.id);
      if (this.state.error !== '') {this.setState({
        error: ''
      })}
    } catch (err) {
      this.setState({
        error: 'Please provide all fields. Note, Fuel Level cannot be greater than 100. '
      });
    }
  }

  render() {
    const { name, fuelLevel } = this.state;
    const { handleSubmit, handleChange } = this;

    return (
      <div>
        <h4>Make updates?</h4>
        <form onSubmit={handleSubmit}>
          <label htmlFor="name">Robot Name:</label>
          <input name="name" onChange={handleChange} value={name} />
          <div>
          <label htmlFor="fuelLevel"> Fuel Level:</label>
          <input name="fuelLevel" onChange={handleChange} value={fuelLevel} />
          </div>
          <button type="submit">Submit</button>
        </form>
        {(this.state.error !== '') ?
          <div>{this.state.error}</div>
          : null }
      </div>
    );
  }
}

const mapStateToProps = ({ singleRobot }) => ({
  singleRobot,
});

const mapDispatchToProps = (dispatch, { history }) => ({
  updateSingleRobot: (robot) => dispatch(updateRobot(robot, history)),
  fetchRobot: (id) => dispatch(fetchSingleRobot(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(UpdateRobot);
