import { AUTH, LOGOUT } from '../constants/actionTypes';

const authReducer = async (state = { authData: null }, action) => {
  console.log(`authReducer invoked.`);
  switch(action.type) {
    case AUTH:
      console.log(`setting localStorage profile to:`);
      console.dir(action?.data);
      localStorage.setItem('profile', JSON.stringify({ ...action?.data }));
      return { ...state, authData: action?.data };
    case LOGOUT:
      localStorage.removeItem('profile');
      return { ...state, authData: null };
    default:
      return state;
  }
}

export default authReducer;