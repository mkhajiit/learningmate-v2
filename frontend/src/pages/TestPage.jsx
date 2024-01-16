// 서버 테스트용 페이지
import { useSelector } from 'react-redux';
import ImageUploadSection from '../components/ImageUploadSection';

function Test() {
  const auth = useSelector((state) => state.auth.isAuth);
  const userInfo = useSelector((state) => state.userInfo);

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
    </>
  );
}

export default Test;
