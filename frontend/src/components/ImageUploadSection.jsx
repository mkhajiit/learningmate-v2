import axios from 'axios';
import { useCallback, useRef, useState } from 'react';
import { Button, ButtonGroup, Container } from 'react-bootstrap';
import { serverDomain } from '../config/config';

function ImageUploadSection({ userId }) {
  const [image, setImage] = useState(`${process.env.PUBLIC_URL}/img/Hani.jpg`);
  const [file, setFile] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  const readImageUrl = useCallback(async () => {
    const resData = await axios.get(`${serverDomain}/users/imagetest/${userId}`);
    setImageUrl(() => {
      const newImage = resData.data.data[0].profile_name;
      return newImage;
    });
  }, [userId]);

  const uploadImage = useCallback((evt) => {
    const uploadFile = evt.target.files[0];
    setFile(() => {
      const newFile = uploadFile;
      return newFile;
    });
    const fileReader = new FileReader();
    fileReader.readAsDataURL(uploadFile);
    // 이벤트 핸들러로 동작하는 매서드
    fileReader.onload = () => {
      setImage(fileReader.result);
    };
  }, []);

  const registerImage = useCallback(async () => {
    const formdata = new FormData();
    formdata.append('image', file);
    await axios.post(`${serverDomain}/users/image/54`, formdata, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  }, [file]);
  // useRef()훅을 이용하여 input을 inputRef에 저장한후 가져와서 사용합니다
  const inputRef = useRef();
  return (
    <Container className=' d-flex justify-content-center align-items-center flex-column'>
      <img src={imageUrl} alt='Test_Img' width={200} height={200} />

      <h1>ImageUploader</h1>
      <img src={image} width='300' height='300' alt='uploadImage' />
      <br />
      <input
        type='file'
        id='imgInput'
        name='image'
        accept='image/*'
        onChange={uploadImage}
        onClick={(event) => {
          event.target.value = null;
          return event.target.value;
        }}
        ref={inputRef}
        style={{ display: 'none' }}
      />
      {/* inputRef.current.click() input의 onClick이벤트가 실행되는게 아니라 input버튼을 사용자가 누른것처럼 됨 */}
      <ButtonGroup>
        <Button variant='primary' size='sm' onClick={() => inputRef.current.click()}>
          사진선택
        </Button>
        <Button variant='danger' size='sm' onClick={() => setImage(`${process.env.PUBLIC_URL}/img/Hani.jpg`)}>
          삭제
        </Button>
        <Button variant='success' size='sm' onClick={registerImage}>
          등록
        </Button>
        <Button variant='success' size='sm' onClick={readImageUrl}>
          읽어오기 테스트
        </Button>
      </ButtonGroup>
    </Container>
  );
}

export default ImageUploadSection;
