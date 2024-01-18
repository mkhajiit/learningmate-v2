import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import UserProfile from '../../components/Mypage/UserProfile';
import Sidebar from '../../components/Mypage/Sidebar';
import '../../components/Mypage/styles/MyPage.css';

function MyInfo() {
  const userInfo = useSelector((state) => state.userInfo);
  return (
    <div>
      <Container fluid>
        <h2 className='title'>내 정보 조회하기</h2>
        <Row>
          <Col xs={2} id='sidebar'>
            <Sidebar />
          </Col>
          <Col xs={10} id='content'>
            <h3 className='subtitle'>
              {userInfo.nickname}
              님의 소중한 정보
            </h3>
            <UserProfile />
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default MyInfo;
