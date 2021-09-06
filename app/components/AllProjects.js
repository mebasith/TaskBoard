import React from 'react';
import { connect } from 'react-redux';
import { deleteProject, fetchProjects } from '../redux/projects';
import { Link } from 'react-router-dom';
import ProjectForm from './ProjectForm';

// Notice that we're exporting the AllProjects component twice. The named export
// (below) is not connected to Redux, while the default export (at the very
// bottom) is connected to Redux. Our tests should cover _both_ cases.
export class AllProjects extends React.Component {
  componentDidMount() {
    this.props.getProjects();
  }
  render() {
    const { projects } = this.props;
    return (
      <div className="TextCenter">
        <h3>Add a new project:</h3>
        <ProjectForm />
        <h3>Current Projects:</h3>
        <div className= "Allcards">
        {projects.map((project) => (
          <div key={project.id} className="Card">
            <h3>
              <div className="Card-title">
              <Link to={`/projects/${project.id}`}>{project.title}</Link>
              </div>
              <h2>Deadline: {project.deadline}</h2>
                <button
                  type="submit"
                  onClick={() => this.props.removeProject(project)}
                >
                  ❌
                </button>
            </h3>
          </div>
        ))}
        </div>
      </div>
    );
  }
}

const mapStatetoProps = (state) => {
  return {
    projects: state.projects,
  };
};

const mapDispatchtoProps = (dispatch) => {
  return {
    getProjects: () => dispatch(fetchProjects()),
    removeProject: (project) => dispatch(deleteProject(project)),
  };
};

export default connect(mapStatetoProps, mapDispatchtoProps)(AllProjects);
