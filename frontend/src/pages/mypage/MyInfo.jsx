import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Row, Col, Button } from 'react-bootstrap';
import UserProfile from '../../components/Mypage/UserProfile';
import Sidebar from '../../components/Mypage/Sidebar';
import Header from '../../components/Mypage/Header';
import Footer from '../../components/Mypage/Footer';
import MyInfoEdit from '../../components/Mypage/MyInfoEdit';
import '../../components/Mypage/styles/Title.css';

function MyInfo() {
  const [isEditMode, setIsEditMode] = useState(false);
  const [userInfo, setUserInfo] = useState({
    nickname: '',
    phone_number: '',
    email: '',
  });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // 서버에서 로그인한 유저의 데이터를 가져오는 API 호출
        const response = await axios.get('/api/getUserData'); // 예시 URL, 실제로 사용하는 URL로 변경해야 합니다.

        // 가져온 데이터를 state에 설정
        setUserInfo(response.data);
      } catch (error) {
        console.error('유저 데이터 가져오기 에러:', error);
      }
    };
    // 컴포넌트가 마운트될 때 유저 데이터를 가져오기
    fetchUserData();
  }, []); // 빈 배열을 전달하여 한 번만 실행되도록 설정

  const handleEditClick = () => {
    setIsEditMode(true);
  };

  const handleCancelEdit = () => {
    setIsEditMode(false);
  };

  const handleSaveEdit = async (editedData) => {
    try {
      // 수정된 데이터를 서버에 전송하는 API 호출
      await axios.post('/api/updateUserData', editedData); // 예시 URL, 실제로 사용하는 URL로 변경해야 합니다.

      // 수정이 성공하면 새로운 데이터로 상태 업데이트
      setUserInfo(editedData);
      setIsEditMode(false);
    } catch (error) {
      console.error('데이터 업데이트 중 에러 발생:', error);
    }
  };

  return (
    <div>
      <Header />
      <Container fluid>
        <h2 className='title'>내 정보 조회하기</h2>
        <Row>
          <Col xs={2} id='sidebar'>
            <Sidebar />
          </Col>
          <Col xs={10} id='content'>
            {isEditMode ? (
              <MyInfoEdit initialData={userInfo} onSave={handleSaveEdit} onCancel={handleCancelEdit} />
            ) : (
              <>
                <UserProfile userInfo={userInfo} />
                <Button variant='primary' onClick={handleEditClick}>
                  내 정보 수정하기
                </Button>
              </>
            )}
          </Col>
        </Row>
      </Container>
      <Footer />
    </div>
  );
}

export default MyInfo;
