import { authSliceActions } from '../slice/authSlice';
import ApiRequest from '../service/axios.js';

export const login = async (user, dispatch, navigate) => {
  dispatch(authSliceActions.loginStart());
  try {
    const res = await ApiRequest.post('/login', user, {
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
    });
    dispatch(authSliceActions.loginSuccess(res));
    navigate('/');
  } catch (error) {
    dispatch(authSliceActions.logoutError());
  }
};
