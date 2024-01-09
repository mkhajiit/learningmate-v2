// 따로 설정 안했는데 userid가 없어서 로그인 안하면 업로드가 안됨
import axios from 'axios';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router';
import { localDomain, serverDomain } from '../../config/config';

function UpdateLecturePage() {
  const inputRef = useRef();
  const imageRef = useRef();
  const navigate = useNavigate();
  const course_id = useParams().courseid;
  const [videoPath, setVideoPath] = useState('');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [imagePath, setImagePath] = useState('');
  const [category, setCategory] = useState('');
  // 로그인한 유저의 userId
  const userId = useSelector((state) => state.userInfo.userId);
  // input에서 선택한 파일의 이름
  const [selectedVideoFileName, setSelectedVideoFileName] = useState();
  const [selectedImageFileName, setSelectedImageFileName] = useState();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: { title, category, content },
    mode: 'onBlur',
  });

  const getLectureDetail = useCallback(async () => {
    try {
      const resp = await axios.get(`${serverDomain}/courses/course/${course_id}`);
      // 삭제된 게시글에 url로 접근하려고하면 팅겨 내버립니다
      if (resp.data.status === 500) {
        navigate('../');
      } else {
        const respData = resp.data.data[0];
        console.log(respData);
        setVideoPath(respData.attach_file_path);
        setImagePath(respData.attach_image_path);
        setTitle(respData.title);
        setContent(respData.content);
        setCategory(respData.category);
      }
    } catch (error) {
      console.error('Error fetching lecture detail:', error);
    }
  }, [course_id]);

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
      console.log('등록됨');
      try {
        const submitData = { ...formSubmitData, course_id };
        const formData = new FormData();
        const { files: videoFiles } = document.querySelector('input[name="lectureVideo"]');
        const { files: imageFiles } = document.querySelector('input[name="lectureImage"]');
        formData.append('data', JSON.stringify(submitData));
        formData.append('lectureVideo', videoFiles[0]);
        formData.append('lectureImage', imageFiles[0]);

        const resp = await axios.patch(`${serverDomain}/courses/update`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        navigate(`../detail/${course_id}`);
      } catch (error) {
        console.log(error);
      }
    },
    [userId],
  );

  useEffect(() => {
    getLectureDetail();
    setValue('title', title);
    setValue('category', category);
    setValue('content', content);
    // setValue('lectureVideo', videoPath);
    // setValue('lectureImage', imagePath);
  }, [getLectureDetail, setValue, title, category, content, videoPath, imagePath]);
  return (
    <Container fluid style={{ height: '100vh' }}>
      <Row className='justify-content-md-center'>
        <Col md={4}>
          <h1 className='display-1 text-center' style={{ marginTop: 100 }}>
            강의 수정
          </h1>
          <form onSubmit={handleSubmit(onSubmitEvent)}>
            <label htmlFor='title'>제목</label>
            <Form.Group className='mb-3'>
              <Form.Control
                id='title'
                name='title'
                type='text'
                // defaultValue={title}
                placeholder='제목을 입력하세요'
                {...register('title', { required: true, maxLength: 70 })}
              />
              {errors.title?.type === 'required' && '제목을 입력하세요'}
            </Form.Group>
            <label htmlFor='category'>카테고리</label>
            <Form.Group className='mb-3'>
              <Form.Select
                id='category'
                name='category'
                defaultValue={category}
                {...register('category', { required: true })}
              >
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
export default UpdateLecturePage;
