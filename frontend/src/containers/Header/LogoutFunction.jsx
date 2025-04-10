import { useDispatch } from 'react-redux';
import { useCallback } from 'react';
import { authAction } from '../../store/auth';
import { userInfoAction } from '../../store/userInfo';
import api from '../../pages/api/api';

function LogoutFunction() {
  const dispatch = useDispatch();
  const logoutUser = useCallback(async () => {
    await api.get(`/users/logout`, { withCredentials: true });
    dispatch(authAction.logout());
    dispatch(userInfoAction.initialize());
    window.location.reload();
  }, [dispatch]);

  return logoutUser;
}

export default LogoutFunction;
