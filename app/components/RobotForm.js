import React, { Component } from 'react';

import { connect } from 'react-redux';
import { createRobot } from '../redux/createRobot';
import { fetchRobots } from '../redux/robots';

class CreateRobot extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
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
    try {
      await this.props.createNewRobot({ ...this.state });
      await this.props.getUpdatedRobots();
      this.setState({
        name: ''
      })
    } catch (err) {
      console.log(err);
    }
  }

  render() {
    const { handleSubmit, handleChange } = this;
    return (
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Robot Name:</label>
        <input name="name" onChange={handleChange} value={this.state.name} />

        <button type="submit">Submit</button>
      </form>
    );
  }
}

const mapStatetoProps = (state) => {
  return {
    robots: state.robots,
  };
};
const mapDispatchToProps = (dispatch, { history }) => ({
  createNewRobot: (newRobot) => dispatch(createRobot(newRobot, history)),
  getUpdatedRobots: () => dispatch(fetchRobots()),
});

export default connect(mapStatetoProps, mapDispatchToProps)(CreateRobot);
