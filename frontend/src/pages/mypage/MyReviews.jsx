import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import Sidebar from '../../components/Mypage/Sidebar';
import '../../components/Mypage/styles/MyPage.css';
import CourseReviewList from '../../components/Mypage/CourseReviewList';
import MeetReviewList from '../../components/Mypage/MeetReviewList';

function MyReviews() {
  const userInfo = useSelector((state) => state.userInfo);
  return (
    <div>
      <Container fluid>
        <h2 className='title'>내 리뷰 모아보기</h2>
        <Row>
          <Col xs={2} id='sidebar'>
            <Sidebar />
          </Col>
          <Col xs={10} id='content'>
            <h3 className='subtitle'>
              {userInfo.nickname}
              님이 작성한 댓글 & 리뷰 목록
            </h3>
            <CourseReviewList />
            <MeetReviewList />
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default MyReviews;
