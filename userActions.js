
import axios from 'axios';

export const loginUser = (email, password) => async (dispatch) => {
  try {
    const { data } = await axios.post('/api/users/login', { email, password });
    dispatch({
      type: 'USER_LOGIN',
      payload: data,
    });
    localStorage.setItem('userInfo', JSON.stringify(data)); 
  } catch (error) {
    console.error(error);
  }
};

export const logoutUser = () => (dispatch) => {
  localStorage.removeItem('userInfo');
  dispatch({
    type: 'USER_LOGOUT',
  });
};