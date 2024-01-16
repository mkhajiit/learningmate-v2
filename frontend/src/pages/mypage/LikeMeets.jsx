import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import Sidebar from '../../components/Mypage/Sidebar';
import '../../components/Mypage/styles/Title.css';
import UserLikeMeets from '../../components/Mypage/UserLikeMeets';

function LikeMeets() {
  const userInfo = useSelector((state) => state.userInfo);
  return (
    <div>
      <Container fluid>
        <h2 className='title'>내 모임 모아보기</h2>
        <Row>
          <Col xs={2} id='sidebar'>
            <Sidebar />
          </Col>
          <Col xs={10} id='content'>
            <h3>
              {userInfo.nickname}
              님이 좋아하는 모임 목록
            </h3>
            <UserLikeMeets />
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default LikeMeets;
