import axios from 'axios';
import { useDispatch } from 'react-redux';
import { useCallback } from 'react';
import { authAction } from '../../store/auth';
import { userInfoAction } from '../../store/userInfo';

function LogoutFunction() {
  const dispatch = useDispatch();
  const logoutUser = useCallback(async () => {
    await axios.get('http://localhost:8000/users/logout', { withCredentials: true });
    dispatch(authAction.logout());
    dispatch(userInfoAction.initialize());
    window.location.reload();
  }, [dispatch]);

  return logoutUser;
}

export default LogoutFunction;
