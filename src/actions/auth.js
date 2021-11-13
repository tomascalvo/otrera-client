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
  console.log('googleSignin action invoked. profile: ', profile, 'googleToken: ', googleToken);
  try {
    const { data: { user, token }} = await api.googleSignin({ profile, googleToken });
    console.log('user:');
    console.dir(user);
    console.log('token:');
    console.dir(token);
    if (!user || !token) {
      console.log(`api.googleSignin returned undefined. Check that the server is running.`);
      return;
    }
    dispatch({ type: AUTH, data: { user, token }});
    history.push('/dashboard');
  } catch (error) {
    console.log(error);
  }
}