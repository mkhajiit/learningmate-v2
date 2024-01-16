import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import Sidebar from '../../components/Mypage/Sidebar';
import '../../components/Mypage/styles/Title.css';
import UserUploadedCourses from '../../components/Mypage/UserUploadedCourses';

function MyCourses() {
  const userInfo = useSelector((state) => state.userInfo);
  return (
    <div>
      <Container fluid>
        <h2 className='title'>내가 올린 강의 보기</h2>
        <Row>
          <Col xs={2} id='sidebar'>
            <Sidebar />
          </Col>
          <Col xs={10} id='content'>
            <h3>
              {userInfo.nickname}
              님이 업로드한 강의 목록
            </h3>
            <UserUploadedCourses />
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default MyCourses;
