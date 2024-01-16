import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { Form, Container, Row, Col, Button } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { authAction } from '../store/auth';
import { userInfoAction } from '../store/userInfo';
import usersApi from '../services/users';
import ScrollToTop from '../helpers/scrollToTop';
import PopupModal from '../components/PopupModal';

function SignInPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const text = '아이디 또는 비밀번호가 잘못 입력 되었습니다';
  const image = `${process.env.PUBLIC_URL}/img/oops.png`;
  const [data, setData] = useState({ email: '', password: '' });
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const changeData = useCallback((evt) => {
    setData((currentData) => ({ ...currentData, [evt.target.name]: evt.target.value }));
  }, []);

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const submitData = useCallback(
    async (evt) => {
      evt.preventDefault();
      try {
        const result = await usersApi.signInUser(data);
        if (result.data.status === 500) {
          openModal();
        } else {
          dispatch(authAction.login());
          dispatch(
            userInfoAction.insert({
              userId: result.data.sessionData,
              nickname: result.data.data.nickname,
              email: result.data.data.email,
              phone_number: result.data.data.phone_number,
              profilePath: result.data.data.profile_name,
            }),
          );
          // 홈으로 navigate
          navigate('../');
        }
      } catch (err) {
        console.log(err);
      }
    },
    [data, navigate, dispatch],
  );
  useEffect(() => {
    // 페이지가 로드될 때 스크롤을 최상단으로 이동
    window.scrollTo(0, 0);
  }, []);
  return (
    <Container fluid style={{ height: '100vh' }}>
      <PopupModal modalIsOpen={modalIsOpen} closeModal={closeModal} text={text} image={image} />
      <ScrollToTop />
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

export default SignInPage;
