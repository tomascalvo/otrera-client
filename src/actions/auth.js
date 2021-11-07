import { AUTH } from '../constants/actionTypes';

import * as api from '../api/index.js';

// action creator functions

// if action creator functions are asynchronous, use redux-thunk

export const signup = (formData, history) => async (dispatch) => {
  try {
    const { data: { user, token } } = await api.signup(formData);
    dispatch({ type: AUTH, data: { user, token } });
    history.push('/dashboard');
  } catch (error) {
    console.log(error);
  }
  };

export const signin = (formData, history) => async (dispatch) => {
  console.log('signin action creator reached');
  console.log('formData: ', formData);
try {
  const { data: { user, token } } = await api.signin(formData);
  dispatch({ type: AUTH, data: { user, token } });
  history.push('/dashboard');
} catch (error) {
  console.log(error);
}
};

export const googleSignin = ({ profile, token: googleToken }, history) => async (dispatch) => {
  console.log('profile: ', profile, 'googleToken: ', googleToken);
  try {
    const { data: { user, token }} = await api.googleSignin({ profile, googleToken });
    dispatch({ type: AUTH, data: { user, token }});
    history.push('/dashboard');
  } catch (error) {
    console.log(error);
  }
}