import { useCallback, useRef, useState } from 'react';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import coursesApi from '../../services/courses';

function LectureRegisterPage() {
  const inputRef = useRef();
  const imageRef = useRef();
  const navigate = useNavigate();
  // 로그인한 유저의 userId
  const userId = useSelector((state) => state.userInfo.userId);
  // input에서 선택한 파일의 이름
  const [selectedVideoFileName, setSelectedVideoFileName] = useState('');
  const [selectedImageFileName, setSelectedImageFileName] = useState('');
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({ defaultValues: {}, mode: 'onBlur' });

  const handleVideoFileChange = (event) => {
    if (event.target.files[0]) {
      const fileName = event.target.files[0].name;
      setSelectedVideoFileName(fileName);
    } else {
      const fileName = '';
      setSelectedVideoFileName(fileName);
    }
    setValue('lectureVideo', event.target.files[0], {
      shouldValidate: true,
      shouldTouch: true,
      shouldDirty: true,
    });
  };

  const handleImageFileChange = (event) => {
    if (event.target.files[0]) {
      const fileName = event.target.files[0].name;
      setSelectedImageFileName(fileName);
    } else {
      const fileName = '';
      setSelectedImageFileName(fileName);
    }
    setValue('lectureImage', event.target.files[0], {
      shouldValidate: true,
      shouldTouch: true,
      shouldDirty: true,
    });
  };
  const onSubmitEvent = useCallback(
    async (formSubmitData) => {
      try {
        const submitData = { ...formSubmitData, user_id: userId };
        const formData = new FormData();
        const { files: videoFiles } = document.querySelector('input[name="lectureVideo"]');
        const { files: imageFiles } = document.querySelector('input[name="lectureImage"]');
        formData.append('data', JSON.stringify(submitData));
        formData.append('lectureVideo', videoFiles[0]);
        formData.append('lectureImage', imageFiles[0]);
        const resp = await coursesApi.insertCourse(formData);

        navigate(`../detail/${resp.data.data}`);
      } catch (error) {
        console.log(error);
      }
    },
    [userId, navigate],
  );
  return (
    <Container fluid style={{ height: '100vh' }}>
      <Row className='justify-content-md-center'>
        <Col md={4}>
          <h1 className='display-1 text-center' style={{ marginTop: 100 }}>
            강의 등록
          </h1>
          <form onSubmit={handleSubmit(onSubmitEvent)}>
            <label htmlFor='title'>제목</label>
            <Form.Group className='mb-3'>
              <Form.Control
                id='title'
                name='title'
                type='text'
                placeholder='제목을 입력하세요'
                {...register('title', { required: true, maxLength: 70 })}
                defaultValue=''
              />
              {errors.title?.type === 'required' && '제목을 입력하세요'}
            </Form.Group>
            <label htmlFor='category'>카테고리</label>
            <Form.Group className='mb-3'>
              <Form.Select id='category' name='category' {...register('category', { required: true })}>
                <option value=''>카테고리를 선택해주세요</option>
                <option value='운동/건강'>운동/건강</option>
                <option value='IT'>IT</option>
                <option value='자기계발'>자기계발</option>
                <option value='교육 및 학문'>교육 및 학문</option>
                <option value='의학'>의학</option>
                <option value='기타'>기타</option>
              </Form.Select>
              {errors.category?.type === 'required' && '카테고리를 선택하세요'}
            </Form.Group>
            <Form.Group className='mb-3'>
              <Form.Label>강의 설명</Form.Label>
              <Form.Control
                as='textarea'
                placeholder='강의 설명을 입력하세요'
                {...register('content', { maxLength: 300 })}
                style={{ resize: 'none' }}
                wrap='hard'
              />
            </Form.Group>
            <div className='col-sm-12 mb-3'>
              <label htmlFor='lectureVideo' className='form-label'>
                업로드할 영상을 선택해주세요
              </label>
              <br />
              <input
                type='file'
                className='form-control'
                id='lectureVideo'
                name='lectureVideo'
                accept='video/*'
                {...register('lectureVideo', { required: true })}
                ref={inputRef}
                style={{ display: 'none' }}
                onChange={handleVideoFileChange}
              />
              <Button variant='success' size='sm' onClick={() => inputRef.current.click()}>
                영상선택
              </Button>

              {selectedVideoFileName && (
                <p style={{ display: 'inline-block', marginLeft: '10px' }}>{selectedVideoFileName}</p>
              )}
              <br />
              {errors.lectureVideo && '업로드할 영상을 선택하지 않았습니다'}
              <br />
              {/* 밑에 코드가 안먹히는 이유를 모르겠음 input을 {required: true}로 설정한다음에 파일을 선택해도 errors가 true로 나옴 */}
              {/* 해결: setValue로 이미지나 영상 파일이 선택되었다고 onChange이벤트에 따로 설정을 해줘야 값을 인식해서 errors가 false로 바뀐다 */}
              {/* {errors.lectureVideo && '업로드할 영상을 선택하지 않았습니다'} */}
              {/* {!selectedVideoFileName && '업로드할 영상을 선택하지 않았습니다'} */}
            </div>
            <div className='col-sm-12 mb-3'>
              <label htmlFor='lectureVideo' className='form-label'>
                업로드할 썸네일을 선택해주세요
              </label>
              <br />
              <input
                type='file'
                className='form-control'
                id='lectureImage'
                name='lectureImage'
                accept='image/*'
                {...register('lectureImage', { required: true })}
                ref={imageRef}
                style={{ display: 'none' }}
                onChange={handleImageFileChange}
              />
              <Button
                variant='success'
                size='sm'
                onClick={() => {
                  imageRef.current.click();
                }}
              >
                이미지선택
              </Button>
              {selectedImageFileName && (
                <p style={{ display: 'inline-block', marginLeft: '10px' }}>{selectedImageFileName}</p>
              )}
              {errors.lectureImage && <p>업로드할 썸네일을 선택하지 않았습니다</p>}
              <br />
            </div>
            <Form.Group className='mb-3'>
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
export default LectureRegisterPage;
