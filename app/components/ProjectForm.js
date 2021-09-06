import React, { Component } from 'react';

import { connect } from 'react-redux';
import {createProject} from '../redux/createProject';
import { fetchProjects } from '../redux/projects';

class CreateProject extends Component {
  constructor() {
    super();
    this.state = {
      title: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(evt) {
    this.setState({
      [evt.target.name]: evt.target.value
    });
  }

  async handleSubmit(evt) {
    evt.preventDefault();
    try {
    await this.props.createNewProject({ ...this.state });
    await this.props.getUpdatedProjects()
    this.setState({
      title: ''
    })
    } catch (err){
      console.log(err)
    }
  }

  render() {
    const { handleSubmit, handleChange } = this;
    return (
      <form onSubmit={handleSubmit}>
        <label htmlFor="title">Project Title: </label>
        <input name="title" onChange={handleChange} value={this.state.title} />

        <button type="submit">Submit</button>
      </form>
    );
  }
}

const mapStatetoProps = (state) => {
  return {
    projects: state.projects
  }
};

const mapDispatchToProps = (dispatch, { history }) => ({
  createNewProject: (newProject) => dispatch(createProject(newProject, history)),
  getUpdatedProjects: () => dispatch(fetchProjects())
});

export default connect(mapStatetoProps, mapDispatchToProps)(CreateProject);