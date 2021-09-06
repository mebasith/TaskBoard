import React, { Component } from 'react';
import { updateProject } from '../redux/projects';
import { fetchSingleProject } from '../redux/singleProject';
import { connect } from 'react-redux';

class UpdateProject extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: this.props.singleProject.title,
      completed: this.props.singleProject.completed,
      error: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidUpdate(prevProps){
    console.log(prevProps.keyProp)
    console.log(this.props.keyProp)
    if (prevProps.keyProp !== this.props.keyProp){
      this.setState({
        completed: this.props.singleProject.completed
      })
    }
    console.log(this.props.singleProject)
  }

  handleChange(evt) {
    this.setState({
      [evt.target.name]: evt.target.value,
    });
  }

  async handleSubmit(evt) {
    evt.preventDefault();
    const changeTitle = this.props.singleProject.title !== this.state.title;
    const changeCompletion =
      this.props.singleProject.completed !== this.state.completed;
    try {
      if (changeTitle && changeCompletion) {
        await this.props.updateSingleProject({
          ...this.props.singleProject,
          title: this.state.title,
          completed: this.state.completed
        });
      } else if (changeTitle) {
        await this.props.updateSingleProject({
          ...this.props.singleProject,
          title: this.state.title,
        });
      } else if (changeCompletion) {
        await this.props.updateSingleProject({
          ...this.props.singleProject,
          completed: this.state.completed,
        });
      }
      await this.props.fetchProject(this.props.singleProject.id);
      if (this.state.error !== '') {this.setState({
        error: ''
      })}
    } catch (err) {
      this.setState({
        error: 'Please provide all fields'
      });
    }
  }

  render() {
    console.log(this.props)
    const { title, completed } = this.state;
    const { handleSubmit, handleChange } = this;

    return (
      <div>
        <h4>Make updates?</h4>
        <form onSubmit={handleSubmit}>
          <label htmlFor="title">Project Title:</label>
          <input name="title" onChange={handleChange} value={title} />

          <label htmlFor="completed"> Completion status:</label>
          <select name="completed" onChange={handleChange} value={completed}>
            <option value="false">False</option>
            <option value="true">True</option>
          </select>
          <button type="submit">Update</button>
        </form>
        {(this.state.error !== '') ?
          <div>{this.state.error}</div>
          : null }
      </div>
    );
  }
}

const mapStateToProps = ({ singleProject }) => ({
  singleProject,
});

const mapDispatchToProps = (dispatch, { history }) => ({
  updateSingleProject: (project) => dispatch(updateProject(project, history)),
  fetchProject: (id) => dispatch(fetchSingleProject(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(UpdateProject);
