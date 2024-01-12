import { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import './styles/UserProfile.css';

function UserProfile() {
  const [data, setData] = useState({ email: '', phone_number: '', nickname: '' });
  const [isloading, setLoading] = useState(true);
  const auth = useSelector((state) => state.auth.isAuth);
  console.log(auth);
  const localDomain = 'http://localhost:8000';
  const getData = useCallback(async () => {
    try {
      const resp = await axios.get(`${localDomain}/users/userinfo`, {
        withCredentials: true,
      });
      if (resp.data.data === false) window.alert('불러오기 실패');
      else setData((currentData) => ({ ...currentData, ...resp.data.data[0] }));
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }, []);
  useEffect(() => {
    getData();
  }, [getData]);
  if (isloading) {
    return <div>Loading....</div>;
  }
  return (
    <>
      <h3>
        {data.nickname}
        님, 안녕하세요.
      </h3>
      <h5 className='user-info'>
        <span className='info-label'>닉네임 : </span>
        {data.nickname}
      </h5>
      <h5 className='user-info'>
        <span className='info-label'>전화번호 : </span>
        {data.phone_number}
      </h5>
      <h5 className='user-info'>
        <span className='info-label'>이메일 : </span>
        {data.email}
      </h5>
    </>
  );
}

export default UserProfile;
