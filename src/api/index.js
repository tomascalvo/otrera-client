// this is the API (created with axios)

import axios from "axios";

// API
const API = axios.create({ baseURL: process.env.REACT_APP_API_BASE_URL });
console.log('process.env');
console.log(process.env);
console.log('process.env.REACT_APP_API_BASE_URL');
console.log(process.env.REACT_APP_API_BASE_URL);

const EDB = axios.create(
  {
    baseURL: "https://exercisedb.p.rapidapi.com", headers: {
      'x-rapidapi-host': 'exercisedb.p.rapidapi.com',
      'x-rapidapi-key': '0fe601ec97msh3fea4f7f5465370p15768bjsn5313a531d719',
    }
  }
);

// !! create an interceptor to add the authorization header to requests

API.interceptors.request.use((config) => {
  console.log(`Authorization intercepter invoked.`);
  if (localStorage.getItem("profile")) {
    const authHeader = `Bearer ${JSON.parse(localStorage.getItem("profile")).token
      }`
    console.log(`Adding authorization header to request: ${authHeader.slice(0, 11)}...`);
    config.headers.Authorization = authHeader;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

// ExerciseDB

export const fetchEDB = () => EDB.get(`/exercises`); // make this request server-side instead of client-side
export const fetchEDBbyId = (id) => EDB.get(`/exercises/exercise/${id}`) // make this request server-side instead of client-side
export const fetchEDBbyName = (query) => EDB.get(`/exercises/name/${query}`); // make this request server-side instead of client-side

// MongoDB

export const createMovement = (newMovement) =>
  API.post(`/movements`, newMovement);
export const fetchMovements = () => API.get(`/movements`);
export const fetchDefaultMovements = () => API.get(`/movements/default`);
export const fetchMovement = (id) => API.get(`/movements/${id}`);
export const searchMovements = ({ query, target, equipment }) => API.get(`/movements/${query}/${target}/${equipment}`);
export const updateMovement = (id, updatedMovement) =>
  API.patch(`/movements/${id}`, updatedMovement);
export const deleteMovement = (id) => API.delete(`movements/${id}`);

export const createUser = (newUser) => API.post(`/users`, newUser);
export const signup = (formData) => API.post('/users/signup', formData);
export const signin = (formData) => API.post('/users/signin', formData);
export const googleSignin = ({ profile, googleToken }) => API.post('/users/googleSignin', { profile, googleToken });
export const fetchUsers = () => API.get(`/users`);
export const fetchUser = (userId) => API.get(`/users/${userId}`);

export const createBodyStatus = (newBodyStatus) =>
  API.post(`/bodyStatuses`, newBodyStatus);
export const createBodyStatusesByUser = (id, newBodyStatuses) =>
  API.post(`/bodyStatuses/user/${id}/multiple`, newBodyStatuses);
export const postRecovery = (userId) => API.post(`/bodyStatuses/recover/user/${userId}`);
export const fetchCurrentBodyStatusesByUser = (id) =>
  API.get(`/bodyStatuses/user/${id}/current`);

export const createPlan = ({ plan, session }) => API.post(`/plans`, { plan, session });
export const duplicatePlan = (id) => API.post(`/plans/${id}/duplicate`);
export const fetchPlans = () => API.get(`/plans`);
export const fetchPlan = (id) => API.get(`/plans/${id}`);
export const suggestPlans = (targetId = "me") => API.get(`/plans/suggest/${targetId}`);
export const updatePlan = (id, updatedPlan) =>
  API.patch(`/plans/${id}`, updatedPlan);
export const deletePlan = (id) => API.delete(`/plans/${id}`);

export const createSession = (newSession) => API.post(`/sessions`, newSession);
export const fetchSessions = () => API.get(`/sessions`);
export const fetchSession = (id) => API.get(`/sessions/${id}`);
export const fetchSessionsByPlanAndUser = (planId, userId) =>
  API.get(`/sessions/plan/${planId}/user/${userId}`);
  export const fetchRecentSessions = (planId, userId) =>
  API.get(`/sessions/recent/plan/${planId}/user/${userId}`);
  export const fetchPreviousSessions = (userId) =>
    API.get(`/sessions/user/${userId}/previous`);
  export const fetchUpcomingSessions = (userId) => API.get(`/sessions/user/${userId}/upcoming`);

export const createPerformance = (newPerformance) => API.post(`/performances`, newPerformance);
export const fetchPerformances = () => API.get(`/performances`);
export const fetchPerformancesByMovement = (movementId, userId) => API.get(`performances/movement/${movementId}/user/${userId}`);
export const fetchPerformance = (id) => API.get(`/${id}`);

export const createGoal = (newGoal) => API.post(`/goals`, newGoal);
export const getGoals = (userId) => API.get(`/goals/user/${userId}`);
export const getGoal = (goalId) => API.get(`/goal/${goalId}`);
export const getProgress = (userId = "me") => API.get(`goals/user/${userId}/progress`);
export const deleteGoal = (goalId) => API.delete(`goals/${goalId}`);


