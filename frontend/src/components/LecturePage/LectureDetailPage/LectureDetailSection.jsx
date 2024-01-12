import React from 'react';
import { Container } from 'react-bootstrap';

function LectureDetailSection({ lectureInfo }) {
  return (
    <Container className='my-4' style={{ width: '100%', backgroundColor: '#ecf0f1', borderRadius: '15px' }}>
      <h2>제목: {lectureInfo.title}</h2>
      <h3>작성자:{lectureInfo.userNickname}</h3>
      <h4>조회수:{lectureInfo.views}</h4>
      <p>{lectureInfo.content}</p>
    </Container>
  );
}

export default LectureDetailSection;
