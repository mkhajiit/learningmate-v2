import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';

function WithdrawPage() {
  const [password, setPassword] = useState('');

  const handleWithdraw = async () => {
    try {
      // 서버로 탈퇴 요청을 보냄
      await axios.post('/api/withdraw', { password });

      // 탈퇴 성공 시, 추가적인 처리나 페이지 이동 등을 할 수 있습니다.
      console.log('탈퇴 성공!');
    } catch (error) {
      console.error('탈퇴 요청 실패:', error);
      // 탈퇴 실패 시, 사용자에게 알림을 주거나 에러 처리를 할 수 있습니다.
    }
  };

  return (
    <div>
      <h2>회원 탈퇴</h2>
      <Form>
        <Form.Group controlId='formPassword'>
          <Form.Label>비밀번호</Form.Label>
          <Form.Control
            type='password'
            placeholder='비밀번호를 입력하세요'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <Button variant='danger' onClick={handleWithdraw}>
          탈퇴하기
        </Button>
      </Form>
    </div>
  );
}

export default WithdrawPage;
