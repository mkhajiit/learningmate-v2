/* eslint-disable no-console */
// 리뷰 모달창
import axios from 'axios';
import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { serverDomain } from '../../config/config';

const ReviewForm = ({ meet_id, getMeetDetailAndReviews, handleClose }) => {
  const [reviewContent, setReviewContent] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post(
        `${serverDomain}/reviews/insert/${meet_id}`,
        { content: reviewContent },
        { withCredentials: true },
      );

      // 리뷰 작성 후, 모달 닫기 및 MeetDetail 업데이트
      setReviewContent('');
      getMeetDetailAndReviews();
      handleClose(); // 부모 컴포넌트에서 전달받은 handleClose 함수 호출
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId='reviewContent'>
        <Form.Label>리뷰 내용</Form.Label>
        <Form.Control
          as='textarea'
          rows={3}
          value={reviewContent}
          onChange={(e) => setReviewContent(e.target.value)}
          required
        />
      </Form.Group>
      <Button variant='primary' type='submit'>
        작성 완료
      </Button>
    </Form>
  );
};

export default ReviewForm;
