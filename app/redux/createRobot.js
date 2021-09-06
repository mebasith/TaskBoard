import axios from 'axios';

export const CREATE_ROBOT = 'CREATE_ROBOT';

export const _createRobot = (newRobot) => {
  return {
    type: CREATE_ROBOT,
    newRobot,
  };
};

export const createRobot = (newRobot) => {
  return async (dispatch) => {
    const { data: created } = await axios.post('/api/robots', newRobot);
    dispatch(_createRobot(created));
  };
};

export default function createRobotReducer(state = {}, action) {
  switch (action.type) {
    case CREATE_ROBOT:
      return action.newRobot;
    default:
      return state;
  }
}
