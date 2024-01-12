import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Sidebar from '../../components/Mypage/Sidebar';
import Header from '../../components/Mypage/Header';
import Footer from '../../components/Mypage/Footer';
import '../../components/Mypage/styles/Title.css';
import UserLikeMeets from '../../components/Mypage/UserLikeMeets';

function LikeMeets() {
  return (
    <div>
      <Header />
      <Container fluid>
        <h2 className='title'>내 모임 모아보기</h2>
        <Row>
          <Col xs={2} id='sidebar'>
            <Sidebar />
          </Col>
          <Col xs={10} id='content'>
            <UserLikeMeets />
          </Col>
        </Row>
      </Container>
      <Footer />
    </div>
  );
}

export default LikeMeets;
