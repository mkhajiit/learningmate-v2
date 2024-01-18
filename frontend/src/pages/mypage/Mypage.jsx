import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import MyCalendar from '../../components/Mypage/Calendar';
import Sidebar from '../../components/Mypage/Sidebar';
import '../../components/Mypage/styles/MyPage.css';

function Mypage() {
  const userInfo = useSelector((state) => state.userInfo);
  return (
    <div>
      <Container fluid>
        <h2 className='title'>내 일정 조회하기</h2>
        <Row>
          <Col xs={2} id='sidebar'>
            <Sidebar />
          </Col>
          <Col xs={10} id='content'>
            <h3 className='subtitle'>
              {userInfo.nickname}
              님, 안녕하세요!
            </h3>
            <MyCalendar />
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Mypage;
