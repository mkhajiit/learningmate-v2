import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Sidebar from '../../components/Mypage/Sidebar';
import Header from '../../components/Mypage/Header';
import Footer from '../../components/Mypage/Footer';
import '../../components/Mypage/styles/Title.css';
import ReviewList from '../../components/Mypage/ReviewList';

function MyReviews() {
  return (
    <div>
      <Header />
      <Container fluid>
        <h2 className='title'>내 리뷰 모아보기</h2>
        <Row>
          <Col xs={2} id='sidebar'>
            <Sidebar />
          </Col>
          <Col xs={10} id='content'>
            <ReviewList />
          </Col>
        </Row>
      </Container>
      <Footer />
    </div>
  );
}

export default MyReviews;
