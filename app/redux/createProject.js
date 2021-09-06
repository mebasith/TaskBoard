import axios from 'axios';

export const CREATE_PROJECT = 'CREATE_PROJECT';

export const _createProject = (newProject) => {
  return {
    type: CREATE_PROJECT,
    newProject,
  };
};

export const createProject = (newProject) => {
  return async (dispatch) => {
    const { data: created } = await axios.post('/api/projects', newProject);
    dispatch(_createProject(created));
  };
};

export default function createProjectReducer(state = {}, action) {
  switch (action.type) {
    case CREATE_PROJECT:
      return action.newProject;
    default:
      return state;
  }
}
