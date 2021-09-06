import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  fetchSingleProject,
  unAssignProject,
  clearProject,
} from '../redux/singleProject';
import { Link } from 'react-router-dom';
import UpdateProject from './UpdateProject';
import { updateProject } from '../redux/projects';

class SingleProject extends Component {
  constructor(){
    super()
    this.state = {
      childKey: 7,
    }
  }
  async componentDidMount() {
    try {
      await this.props.loadProject(this.props.match.params.projectId);
    } catch (error) {
      console.error(error);
    }
  }

  componentWillUnmount() {
    this.props.clear();
  }

  async handleUnassign(robotId) {
    const project = this.props.project;
    await this.props.unassign(project, robotId);
    await this.props.loadProject(this.props.match.params.projectId);
  }

  async handleComplete() {
    const project = this.props.project;
    const completedProject = { ...project, completed: true };
    try {
      await this.props.updateProject(completedProject);
      await this.props.loadProject(this.props.match.params.projectId);
    } catch (err) {
      console.log(err)
    }
    this.setState(prevState => ({childKey: prevState.childKey * 25}))
  }
  render() {
    if (this.props.project.title !== undefined) {
      const project = this.props.project;
      const title = project.title;
      const completed = project.completed;
      const deadline = project.deadline;
      const priority = project.priority;
      const description = project.description;
      const robots = project.robots;
      return (
        <div className = "centered">
        <div className="Card">
          <div className="Card-data">
          <h1>{title}</h1>
          <h3>
            {`Completed: ${completed}   `}
            {completed ?
            <span>
            <button  disabled type="submit" onClick={() => this.handleComplete()}>
              Mark as complete
            </button>
            </span>
          :
          <span>
              <button type="submit" onClick={() => this.handleComplete()}>
                Mark as complete
              </button>
          </span>
          }
          </h3>
          <h3>{`Deadline: ${deadline}`}</h3>
          <h3>{`Priority Level: ${priority}`}</h3>
          <h3>{`Description: ${description}`}</h3>
          <h3>Robots on Project: </h3>
          {robots.length === 0 ? (
            <h4>Currently no robots staffed</h4>
          ) : (
            <div>
              {robots.map((eachRobot, idx) => {
                return (
                  <div key={idx}>
                    <div>
                      <Link to={`/robots/${eachRobot.id}`}>
                        {eachRobot.name}
                      </Link>
                      <span>
                        <button
                          type="submit"
                          onClick={() => this.handleUnassign(eachRobot.id)}
                        >
                          Unassign
                        </button>
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
          </div>
          <UpdateProject keyProp={this.state.childKey} />
        </div>
        </div>
      );
    } else {
      return null;
    }
  }
}

const mapStateToProps = (state) => {
  return {
    project: state.singleProject,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadProject: (id) => dispatch(fetchSingleProject(id)),
    unassign: (project, robotId) => dispatch(unAssignProject(project, robotId)),
    updateProject: (project) => dispatch(updateProject(project)),
    clear: () => dispatch(clearProject()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SingleProject);
