import axios from 'axios';
import { useDispatch } from 'react-redux';
import { useCallback } from 'react';
import { authAction } from '../../store/auth';
import { userInfoAction } from '../../store/userInfo';
import { serverDomain } from '../../config/config';

function LogoutFunction() {
  const dispatch = useDispatch();
  const logoutUser = useCallback(async () => {
    await axios.get(`${serverDomain}/users/logout`, { withCredentials: true });
    dispatch(authAction.logout());
    dispatch(userInfoAction.initialize());
    window.location.reload();
  }, [dispatch]);

  return logoutUser;
}

export default LogoutFunction;
