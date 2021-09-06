import axios from 'axios';

// Action Types
const GOT_ROBOTS = 'GOT_ROBOTS';
const DELETE_ROBOT = 'DELETE_ROBOT';
const UPDATE_ROBOT = 'UPDATE_ROBOT';

// Action Creators
const gotRobots = (robots) => ({
  type: GOT_ROBOTS,
  robots,
});

export const _deleteRobot = (robot) => {
  return {
    type: DELETE_ROBOT,
    robot,
  };
};

export const _updateRobot = (robot) => {
  return {
    type: UPDATE_ROBOT,
    robot,
  };
};

// Thunk Creators
export const fetchRobots = () => {
  return async (dispatch) => {
    try {
      const { data: robots } = await axios.get('/api/robots');
      dispatch(gotRobots(robots));
    } catch (error) {
      console.log('Error fetching robots from server');
    }
  };
};

export const deleteRobot = (robot) => {
  return async (dispatch) => {
    await axios.delete(`/api/robots/${robot.id}`);
    dispatch(_deleteRobot(robot));
  };
};

export const updateRobot = (robot) => {
  return async (dispatch) => {
    const { data: updated } = await axios.put(`/api/robots/${robot.id}`, robot);
    dispatch(_updateRobot(updated));
  };
};

//reducer
export default function robotsReducer(state = [], action) {
  switch (action.type) {
    case GOT_ROBOTS:
      return action.robots;
    case DELETE_ROBOT:
      return state.filter((robot) => robot.id !== action.robot.id);
    case UPDATE_ROBOT:
      return state.map((robot) => (robot.id === action.robot.id ? action.robot : robot));
    default:
      return state;
  }
}
