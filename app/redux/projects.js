import axios from 'axios';

// Action Types
const GOT_PROJECTS = 'GOT_PROJECTS';
const DELETE_PROJECT = 'DELETE_PROJECT';
const UPDATE_PROJECT = 'UPDATE_PROJECT';

// Action Creators
const gotProjects = (projects) => ({
  type: GOT_PROJECTS,
  projects,
});

export const _deleteProject = (project) => {
  return {
    type: DELETE_PROJECT,
    project,
  };
};

export const _updateProject = (project) => {
  return {
    type: UPDATE_PROJECT,
    project,
  };
};

// Thunk Creators
export const fetchProjects = () => {
  return async (dispatch) => {
    try {
      const { data: projects } = await axios.get('/api/projects');
      dispatch(gotProjects(projects));
    } catch (error) {
      console.log('Error fetching projects from server');
    }
  };
};

export const deleteProject = (project) => {
  return async (dispatch) => {
    await axios.delete(`/api/projects/${project.id}`);
    dispatch(_deleteProject(project));
  };
};

export const updateProject = (project, history) => {
  return async (dispatch) => {
    const { data: updated } = await axios.put(
      `/api/projects/${project.id}`,
      project
    );
    dispatch(_updateProject(updated));
  };
};

//reducer
export default function projectsReducer(state = [], action) {
  switch (action.type) {
    case GOT_PROJECTS:
      return action.projects;
    case DELETE_PROJECT:
      return state.filter((project) => project.id !== action.project.id);
    case UPDATE_PROJECT:
      return state.map((project) => (project.id === action.project.id ? action.project : project));
    default:
      return state;
  }
}
