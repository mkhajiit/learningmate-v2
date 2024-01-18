import { useCallback, useEffect, useRef, useState } from 'react';
import { Form, Container, Row, Col, Button, InputGroup } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import usersApi from '../services/users';
import ScrollToTop from '../helpers/scrollToTop';

function SignUpPage() {
  // useRef()훅을 이용하여 input을 inputRef에 저장한후 가져와서 사용합니다
  const inputRef = useRef();
  const navigate = useNavigate();
  const [selectedFileName, setSelectedFileName] = useState('');
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({ defaultValues: {}, mode: 'onBlur' });

  const confirmPassword = watch('password', '');

  // email중복확인
  const checkValue = useCallback(async (name, value) => {
    const result = await usersApi.checkUser();
    let isDuplicate = false;
    // forEach 문에서는 return이나 break를 못쓰기 때문에 isDuplicate 변수를 따로 둬서 사용함
    result.data.data.forEach((item) => {
      if (item[name] === value) {
        // 중복이 있을때만 설정한 변수를 true로 바꾼다
        isDuplicate = true;
      }
    });
    // 없는경우엔 그대로 false
    return isDuplicate;
  }, []);

  const submitEvent = useCallback(
    async (formSubmitData) => {
      try {
        const formData = new FormData();
        const { files } = document.querySelector('input[name="profile"]');
        formData.append('data', JSON.stringify(formSubmitData));
        formData.append('profile', files[0]);
        await usersApi.signUpUser(formData);
        navigate('/sign-in');
      } catch (error) {
        console.log(error);
      }
    },
    [navigate],
  );

  const handleFileChange = (e) => {
    const fileName = e.target.files[0].name;
    setSelectedFileName(fileName);
  };

  return (
    <Container fluid style={{ height: '100vh' }}>
      <ScrollToTop />
      <Row className='justify-content-md-center'>
        <Col md={4}>
          <h1 className='display-1 text-center' style={{ marginTop: 100 }}>
            회원가입
          </h1>
          <form onSubmit={handleSubmit(submitEvent)}>
            <InputGroup className='mb-3'>
              <Form.Group style={{ flex: 1 }}>
                <Form.Control
                  type='email'
                  placeholder='이메일을 입력하세요'
                  {...register('email', {
                    required: true,
                    pattern: {
                      value: /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/,
                      message: '잘못된 문자형식 입력입니다 숫자를 입력하세요',
                    },
                    validate: async (value) => {
                      // validate 함수에서는 true가 반환되면 유효성 검사를 통과했다고 간주하고, false가 반환되면 유효성 검사를 실패했다고 간주
                      const isDuplicate = await checkValue('email', value);
                      return !isDuplicate;
                    },
                  })}
                />
                {errors.email?.type === 'pattern' && errors.email.message}
                {errors.email?.type === 'validate' && '중복된 이메일입니다.'}
                {errors.email?.type === 'required' && '이메일을 입력해주세요'}
              </Form.Group>
            </InputGroup>
            <Form.Group className='mb-3'>
              <Form.Control
                type='text'
                placeholder='휴대전화번호를 입력하세요'
                {...register('phone_number', {
                  required: true,
                  pattern: {
                    value: /^\d+$/,
                    message: '잘못된 휴대전화번호 형식입니다 숫자를 입력하세요',
                  },
                  validate: async (value) => {
                    const isDuplicate = await checkValue('phone_number', value);
                    return !isDuplicate;
                  },
                })}
              />
              {errors.phone_number?.type === 'pattern' && errors.phone_number.message}
              {errors.phone_number?.type === 'validate' && '중복된 휴대전화번호입니다.'}
              {errors.phone_number?.type === 'required' && '휴대전화번호를 입력해주세요'}
            </Form.Group>
            <Form.Group className='mb-3'>
              <Form.Control
                type='password'
                placeholder='비밀번호를 입력하세요'
                {...register('password', {
                  required: '비밀번호를 입력해주세요',
                  pattern: {
                    value: /^(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$/, // 최소한 하나의 특수문자를 포함하는 positive lookahead(전방 탐색)입니다.
                    message: '잘못된 비밀번호 형식입니다 8글자이상 특수문자1개이상 포함하여 입력하세요',
                  },
                })}
              />
              {errors.password?.message}
            </Form.Group>
            <Form.Group className='mb-3'>
              <Form.Control
                type='password'
                name='passwordcheck'
                placeholder='비밀번호확인'
                {...register('confirmPassword', {
                  required: '비밀번호확인을 입력하세요',
                  validate: (value) => value === confirmPassword || '비밀번호가 일치하지 않습니다',
                })}
              />
              {errors.confirmPassword?.message}
            </Form.Group>
            <Form.Group className='mb-3'>
              <Form.Control
                id='nickname'
                type='text'
                placeholder='닉네임을 입력하세요'
                {...register('nickname', {
                  required: true,
                  validate: async (value) => {
                    const isDuplicate = await checkValue('nickname', value);
                    return !isDuplicate;
                  },
                })}
              />
              {errors.nickname?.type === 'validate' && '중복된 닉네임입니다.'}
              {errors.nickname?.type === 'required' && '닉네임을 입력해주세요'}
            </Form.Group>
            <div className='col-sm-12 mb-3'>
              <label htmlFor='profile' className='form-label'>
                프로필 이미지를 선택해주세요
              </label>
              <br />
              <input
                type='file'
                className='form-control'
                id='profile'
                name='profile'
                accept='image/*'
                {...register('profile')}
                ref={inputRef}
                style={{ display: 'none' }}
                onChange={handleFileChange}
              />
              <Button variant='success' size='sm' onClick={() => inputRef.current.click()}>
                사진선택
              </Button>
              {selectedFileName && <p style={{ display: 'inline-block', marginLeft: '10px' }}>{selectedFileName}</p>}
            </div>

            <Form.Group className='mb-3' controlId='formGroupEmail'>
              <Button variant='primary' style={{ width: '100%' }} type='submit'>
                등록
              </Button>
            </Form.Group>
          </form>
        </Col>
      </Row>
    </Container>
  );
}

export default SignUpPage;
