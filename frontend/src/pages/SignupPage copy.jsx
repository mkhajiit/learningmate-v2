import axios from 'axios';
import { useCallback, useState } from 'react';
import { Form, Container, Row, Col, Button, InputGroup } from 'react-bootstrap';
import { useNavigate } from 'react-router';

function SignUpPage() {
  const [data, setData] = useState({
    email: '',
    phone_number: '',
    password: '',
    passwordcheck: '',
    nickname: '',
  });
  const [diff, setDiff] = useState(false);
  const [duplicateEmail, setDuplicateEmail] = useState(false);
  const [duplicatePhone, setDuplicatePhone] = useState(false);
  const [duplicateNickname, setDuplicateNickname] = useState(false);

  const navigate = useNavigate();
  // 데이터를 읽어오는 함수
  const readData = useCallback(async () => {
    try {
      const result = await axios.get('http://localhost:8000/users/check');
      console.log(result.data.data);
      return result;
    } catch (err) {
      console.log('에러:', err);
      return err;
    }
  }, []);

  // email중복확인
  const checkEmail = useCallback(async () => {
    const result = await readData();

    let isDuplicate = false;
    // forEach 문에서는 return이나 break를 못쓴다 때문에 isDuplicate 변수를 따로 둬서 사용함
    result.data.data.forEach((item) => {
      if (item.email === data.email) {
        // 중복이 있을때만 설정한 변수를 true로 바꾼다
        isDuplicate = true;
      }
      // 없는경우엔 그대로 false
      setDuplicateEmail(isDuplicate);
    });
  }, [data.email, readData]);
  // 휴대전화번호 중복확인
  const checkPhone = useCallback(async () => {
    const result = await readData();

    let isDuplicate = false;
    result.data.data.forEach((item) => {
      if (item.phone_number === data.phone_number) {
        isDuplicate = true;
      }
      setDuplicatePhone(isDuplicate);
    });
  }, [data.phone_number, readData]);
  // 닉네임 중복확인
  // useCallback에서 의존성 배열에 명시하지 않으면 해당 함수는 초기 렌더링 때 한 번만 생성되고,
  // 이후에는 해당 함수가 참조하는 상태나 함수의 변경을 감지하지 않습니다. 즉, 초기 렌더링 시의 값들이 고정적으로 사용되게 됩니다.
  const checkNickname = useCallback(async () => {
    const result = await readData();

    let isDuplicate = false;
    result.data.data.forEach((item) => {
      if (item.nickname === data.nickname) {
        isDuplicate = true;
      }
      setDuplicateNickname(isDuplicate);
    });
  }, [data.nickname, readData]);

  const submitData = useCallback(
    async (evt) => {
      evt.preventDefault();
      // 제출시에도 전체적인 중복검사를합니다
      // await readData().data.data 를하면 아직 통신후 결과를 가져오지않은상태에서 .data.data를 하게 되어 에러가 발생한다.
      // 때문에 await readData()로 데이터를 가져온후 .data.data를한다
      const resdata = await readData();
      // set으로 state를 바꿔서 사용하려고 하면 비동기적으로 되어서 현재 함수에서는 최신값을 못쓰기 때문에 변수에 할당해서 사용합니다
      // some은 배열의 모든 요소를 검사해서 조건과 같은게 있으면 true 없으면 false를 출력합니다
      const isDuplicateEmail = resdata.data.data.some((item) => item.email === data.email);
      const isDuplicatePhone = resdata.data.data.some((item) => item.phone_number === data.phone_number);
      const isDuplicateNickname = resdata.data.data.some((item) => item.nickname === data.nickname);

      if (!(isDuplicateEmail || isDuplicatePhone || isDuplicateNickname)) {
        const result = await axios.post('http://localhost:8000/users/signup', data);
        if (result.data.status === 500) {
          window.alert('등록되지 않았습니다 에러가 발생했어요');
        } else {
          navigate('/sign-in');
        }
      } else {
        setDuplicateEmail(isDuplicateEmail);
        setDuplicatePhone(isDuplicatePhone);
        setDuplicateNickname(isDuplicateNickname);
      }
    },
    [data, navigate, readData],
  );

  const checkPassword = useCallback(
    async (checkpassword) => {
      if (data.password !== checkpassword) {
        setDiff(true);
      } else {
        setDiff(false);
      }
    },
    [data.password],
  );

  const insertData = useCallback(
    (evt) => {
      // 변수명을 동적으로 정의하는경우 []안에 넣는다
      // setData로 갱신한 값(data.passwordcheck)을 사용하려면 리렌더링이 되어야해서 여기서는 fn_insert_data함수가 종료된후 갱신됨
      // 때문에 insertData 내부에서 호출되는 fn_check_password에서 바로 갱신된 state를 쓸수 없기 때문에
      // evt.target.value를 넘겨줘야함
      // setData를 호출한 후에는 업데이트된 상태를 즉시 사용할 수 없습니다. 이러한 이유로,
      // setData 이후에 발생하는 로직에서는 업데이트된 값을 기대하기보다는 현재 상태를 사용하게 됩니다.
      // 만약 setData 이후에 업데이트된 값을 사용해야 한다면, 보통 다음 렌더링에서 해당 값을 이용할 수 있습니다. 이것이 React에서의 일반적인 동작 방식입니다.

      setData((currentData) => ({ ...currentData, [evt.target.name]: evt.target.value }));

      if (evt.target.name === 'passwordcheck') {
        checkPassword(evt.target.value);
      }
    },
    [checkPassword],
  );

  return (
    <Container fluid style={{ backgroundColor: '#95a5a6', height: '100vh' }}>
      <Row className='justify-content-md-center'>
        <Col md={4}>
          <h1 className='display-1 text-center' style={{ marginTop: 100 }}>
            회원가입
          </h1>
          <Form onSubmit={submitData}>
            <InputGroup className='mb-3'>
              <Form.Group style={{ flex: 1 }}>
                <Form.Control
                  id='email'
                  type='email'
                  name='email'
                  onChange={insertData}
                  value={data.email}
                  required
                  placeholder='이메일'
                  onBlur={checkEmail}
                />
              </Form.Group>
            </InputGroup>
            <Button variant='primary' onClick={() => console.log('인증번호전송')}>
              인증번호전송
            </Button>

            <Form.Group className='mb-3'>
              <Form.Control type='text' placeholder='이메일인증번호' />
            </Form.Group>
            <Form.Group className='mb-3'>
              <Form.Control
                id='phone_number'
                type='text'
                name='phone_number'
                onChange={insertData}
                value={data.phone_number}
                required
                placeholder='휴대전화번호'
                onBlur={checkPhone}
              />
            </Form.Group>
            <Form.Group className='mb-3'>
              <Form.Control
                id='password'
                type='password'
                name='password'
                onChange={insertData}
                value={data.password}
                required
                placeholder='비밀번호'
              />
            </Form.Group>
            <Form.Group className='mb-3'>
              <Form.Control
                id='passwordcheck'
                type='password'
                name='passwordcheck'
                onChange={insertData}
                value={data.passwordcheck}
                required
                placeholder='비밀번호확인'
              />
            </Form.Group>
            <Form.Group className='mb-3'>
              <Form.Control
                id='nickname'
                type='text'
                name='nickname'
                onChange={insertData}
                value={data.nickname}
                required
                placeholder='닉네임'
                onBlur={checkNickname}
              />
            </Form.Group>
            <Form.Group className='mb-3' controlId='formGroupEmail'>
              <Button
                variant='primary'
                style={{ width: '100%' }}
                type='submit'
                // 중복되는게 하나라도 있다면 버튼이 disabled됩니다
                disabled={duplicateEmail || duplicatePhone || duplicateNickname || diff}
              >
                등록
              </Button>
            </Form.Group>
          </Form>
          {duplicateEmail && <p>-중복된 이메일입니다.</p>}
          {duplicatePhone && <p>-중복된 휴대전화번호입니다.</p>}
          {diff && <p>비밀번호확인이 다릅니다.</p>}
          {duplicateNickname && <p>-중복된 닉네임입니다.</p>}
        </Col>
      </Row>
    </Container>
  );
}

export default SignUpPage;
