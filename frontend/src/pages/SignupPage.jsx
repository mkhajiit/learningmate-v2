// 이미지 취소 눌렀을때 처리 추가
import axios from 'axios';
import { useCallback, useRef, useState } from 'react';
import { Form, Container, Row, Col, Button, InputGroup } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import { serverDomain } from '../config/config';

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
  // 데이터를 읽어오는 함수
  const readData = useCallback(async () => {
    try {
      const result = await axios.get(`${serverDomain}/users/check`);
      return result;
    } catch (error) {
      console.log('에러:', error);
      return error;
    }
  }, []);

  // email중복확인
  // useCallback에서 의존성 배열에 명시하지 않으면 해당 함수는 초기 렌더링 때 한 번만 생성되고,
  // 이후에는 해당 함수가 참조하는 상태나 함수의 변경을 감지하지 않습니다. 즉, 초기 렌더링 시의 값들이 고정적으로 사용되게 됩니다.
  const checkValue = useCallback(
    async (name, value) => {
      const result = await readData();
      let isDuplicate = false;
      // forEach 문에서는 return이나 break를 못쓴다 때문에 isDuplicate 변수를 따로 둬서 사용함
      result.data.data.forEach((item) => {
        if (item[name] === value) {
          // 중복이 있을때만 설정한 변수를 true로 바꾼다
          isDuplicate = true;
        }
      });
      // 없는경우엔 그대로 false
      return isDuplicate;
    },
    [readData],
  );

  const submitEvent = useCallback(
    async (formSubmitData) => {
      try {
        console.log(formSubmitData);
        const formData = new FormData();
        const { files } = document.querySelector('input[name="profile"]');
        formData.append('data', JSON.stringify(formSubmitData));
        formData.append('profile', files[0]);
        // console.log(formData);
        await axios.post(`${serverDomain}/users/signup`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
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
                    validate: async (value) => {
                      // validate 함수에서는 true가 반환되면 유효성 검사를 통과했다고 간주하고, false가 반환되면 유효성 검사를 실패했다고 간주
                      const isDuplicate = await checkValue('email', value);
                      return !isDuplicate;
                    },
                  })}
                />
                {errors.email?.type === 'validate' && '중복된 이메일입니다.'}
                {errors.email?.type === 'required' && '이메일을 입력해주세요'}
              </Form.Group>
            </InputGroup>
            {/* <Button variant='primary' onClick={() => console.log('인증번호전송')}>
              인증번호전송
            </Button> */}

            {/* <Form.Group className='mb-3'>
              <Form.Control type='text' placeholder='이메일인증번호' />
            </Form.Group> */}
            <Form.Group className='mb-3'>
              <Form.Control
                type='text'
                placeholder='휴대전화번호를 입력하세요'
                {...register('phone_number', {
                  required: true,
                  validate: async (value) => {
                    const isDuplicate = await checkValue('phone_number', value);
                    return !isDuplicate;
                  },
                })}
              />
              {errors.phone_number?.type === 'validate' && '중복된 휴대전화번호입니다.'}
              {errors.phone_number?.type === 'required' && '휴대전화번호를 입력해주세요'}
            </Form.Group>
            <Form.Group className='mb-3'>
              <Form.Control
                type='password'
                placeholder='비밀번호를 입력하세요'
                {...register('password', { required: '비밀번호를 입력하세요' })}
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
