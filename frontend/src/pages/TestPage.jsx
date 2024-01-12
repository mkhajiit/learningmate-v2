// 서버 테스트용 페이지
import { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import ImageUploadSection from '../components/ImageUploadSection';
import LandingModal from '../components/maps/LandingModal';
import MeetDetailMapSection from '../components/maps/MeetDetailMapSection';

function Test() {
  const position = useSelector((state) => state.position);
  const [data, setData] = useState({ email: '', phone_number: '', nickname: '' });
  const [isloading, setLoading] = useState(true);
  const auth = useSelector((state) => state.auth.isAuth);
  const userInfo = useSelector((state) => state.userInfo);
  const localDomain = 'http://localhost:8000';
  const getData = useCallback(async () => {
    try {
      // 데이터 get요청 withCredentials: true 옵션을 추가하면 세션 쿠키가 요청에 올바르게 포함되어 서버에 전달됩니다.
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
      <h1>test</h1>
      <h2>Sever Data:</h2>
      <h2>
        email:
        {userInfo.email}
      </h2>
      <h2>
        휴대폰번호:
        {userInfo.phone_number}
      </h2>
      <h2>
        nickname:
        {userInfo.nickname}
      </h2>
      <h2>
        로그인상태:
        {auth.toString()}
      </h2>
      <h2>
        유저ID:
        {userInfo.userId}
      </h2>
      <h2>
        유저닉네임:
        {userInfo.nickname}
      </h2>
      <ImageUploadSection userId={userInfo.userId} />
      {/* 지도 클릭으로 위치정보 받기 */}
      <LandingModal />
      <MeetDetailMapSection />
      {position && <h1>{`모달창에서 읽어온값:${position.lat},${position.lng}`}</h1>}
    </>
  );
}

export default Test;
