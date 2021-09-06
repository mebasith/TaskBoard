import axios from 'axios';

//action constants
const SET_SINGLE_PROJECT = 'SET_SINGLE_PROJECT';
const UNASSIGN_ROBOT = 'UNASSIGN_ROBOT';
const CLEAR_PROJECT = 'CLEAR_PROJECT';

//action creators
const setSingleProject = (project) => {
  return {
    type: SET_SINGLE_PROJECT,
    project,
  };
};

export const clearProject = () => {
  return {
    type: CLEAR_PROJECT,
  };
};

//thunks
export const fetchSingleProject = (id) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(`/api/projects/${id}`);
      dispatch(setSingleProject(data));
    } catch (err) {
      console.log(err);
    }
  };
};

export const unAssignProject = (project, robotId) => {
  return async (dispatch) => {
    await axios.put(`/api/projects/${project.id}/${robotId}`);
    dispatch(fetchSingleProject(project.id));
  };
};

const initialState = {};

export default function singleProjectReducer(state = initialState, action) {
  switch (action.type) {
    case SET_SINGLE_PROJECT:
      return action.project;
    case UNASSIGN_ROBOT:
      return action.project;
    case CLEAR_PROJECT:
      return {};
    default:
      return state;
  }
}
