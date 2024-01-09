import axios from 'axios';
import { useCallback, useState } from 'react';
import { useNavigate } from 'react-router';
import { Form, Container, Row, Col, Button } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { authAction } from '../store/auth';
import { userInfoAction } from '../store/userInfo';
import { serverDomain } from '../config/config';

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [data, setData] = useState({ email: '', password: '' });
  const changeData = useCallback((evt) => {
    setData((currentData) => ({ ...currentData, [evt.target.name]: evt.target.value }));
  }, []);
  const submitData = useCallback(
    async (evt) => {
      evt.preventDefault();
      try {
        const result = await axios.post(`${serverDomain}/users/login`, data, {
          withCredentials: true,
        });
        if (result.data.status === 500) {
          window.alert('잘못된 로그인 정보입니다');
        } else {
          dispatch(authAction.login());
          dispatch(userInfoAction.insert({ userId: result.data.sessionData, nickname: result.data.data.nickname }));
          navigate('/test');
        }
      } catch (err) {
        console.log(err);
      }
    },
    [data, navigate, dispatch],
  );
  return (
    <Container fluid style={{ height: '100vh' }}>
      <Row className='justify-content-md-center'>
        <Col md={4}>
          <h1 className='display-1 text-center' style={{ marginTop: 100 }}>
            로그인
          </h1>
          <Form onSubmit={submitData}>
            <Form.Group className='mb-3'>
              <Form.Control
                id='email'
                name='email'
                type='email'
                value={data.email}
                onChange={changeData}
                required
                placeholder='이메일'
              />
            </Form.Group>
            <Form.Group className='mb-3'>
              <Form.Control
                id='password'
                name='password'
                type='password'
                value={data.password}
                onChange={changeData}
                required
                placeholder='비밀번호'
              />
            </Form.Group>
            <Form.Group className='mb-3' controlId='formGroupEmail'>
              <Button variant='primary' style={{ width: '100%' }} type='submit'>
                등록
              </Button>
            </Form.Group>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default Login;
