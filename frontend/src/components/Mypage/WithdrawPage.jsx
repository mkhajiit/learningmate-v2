import React, { useCallback, useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { serverDomain } from '../../config/config';
import LogoutFunction from '../../containers/Header/LogoutFunction';
import './styles/MyPage.css';

function WithdrawPage() {
  const navigate = useNavigate();
  const [data, setData] = useState({ password: '' });
  const userInfo = useSelector((state) => state.userInfo);
  const logoutUser = LogoutFunction();

  const changeData = useCallback((evt) => {
    setData((currentData) => ({ ...currentData, [evt.target.name]: evt.target.value }));
  }, []);

  const confirmWithdraw = useCallback(async () => {
    // 입력이 비어있는지 확인
    if (!data.password) {
      window.alert('비밀번호를 입력해주세요.');
      return;
    }
    if (!window.confirm('정말 탈퇴하시겠습니까? 돌이킬 수 없습니다.')) {
      // 취소 하면 할 코드
      return;
    }
    try {
      // 입력된 비밀번호와 저장된 비밀번호 비교
      const result = await axios.delete(`${serverDomain}/users/delete/${userInfo.userId}`, {
        withCredentials: true,
        data: { password: data.password, user_id: userInfo.userId },
      });
      console.log('Server Response:', result); // 디버깅 확인
      if (result.data.status === 200) {
        window.alert('탈퇴 요청이 성공적으로 처리되었습니다. 안녕히가세요.');
        logoutUser();
        navigate('/sign-in');
      } else {
        window.alert('비밀번호가 일치하지 않습니다.');
      }
    } catch (error) {
      console.error('탈퇴 요청 실패:', error);
      window.alert('탈퇴 요청에 실패했습니다.');
    }
  }, [data, userInfo.userId]);

  return (
    <div>
      <h2 className='subtitle'>회원 탈퇴</h2>
      <Form onSubmit={(e) => e.preventDefault()}>
        <Form.Group className='mb-3'>
          <Form.Label>비밀번호</Form.Label>
          <Form.Control
            id='password'
            name='password'
            type='password'
            value={data.password}
            onChange={changeData}
            required
            placeholder='비밀번호를 입력하세요'
          />
        </Form.Group>
        <Button variant='danger' onClick={confirmWithdraw}>
          탈퇴하기
        </Button>
      </Form>
    </div>
  );
}

export default WithdrawPage;
