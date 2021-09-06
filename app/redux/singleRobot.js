import axios from 'axios';

const SET_SINGLE_ROBOT = 'SET_SINGLE_ROBOT';
const UNASSIGN_PROJECT = 'UNASSIGN_PROJECT';
const CLEAR_ROBOT = 'CLEAR_ROBOT';

const setSingleRobot = (robot) => {
  return {
    type: SET_SINGLE_ROBOT,
    robot,
  };
};

export const clearRobot = () => {
  return {
    type: CLEAR_ROBOT,
    empty: {},
  };
};

//Thunks
export const fetchSingleRobot = (id) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(`/api/robots/${id}`);
      console.log(data);
      dispatch(setSingleRobot(data));
    } catch (err) {
      console.log(err);
    }
  };
};

export const unAssignProject = (robot, projectId) => {
  return async (dispatch) => {
    await axios.put(`/api/robots/${robot.id}/${projectId}`);
    dispatch(setSingleRobot(robot));
  };
};

const initialState = {};

export default function singleRobotReducer(state = initialState, action) {
  switch (action.type) {
    case SET_SINGLE_ROBOT:
      return action.robot;
    case UNASSIGN_PROJECT:
      return action.robot;
    case CLEAR_ROBOT:
      return {};
    default:
      return state;
  }
}
