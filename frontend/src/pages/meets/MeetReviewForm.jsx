/* eslint-disable no-console */
// 리뷰 작성 모달
import axios from 'axios';
import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router';
import { Button, Form } from 'react-bootstrap';
import { localDomain } from '../../config/config';
import { clearData, updateReviewContent } from '../../store/reviewStore';

function MeetReviewForm() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { handleSubmit } = useForm({ defaultValues: {} });
  const meet_id = useParams().meetid;
  const user_id = useSelector((state) => state.userInfo.userId);
  const { review } = useSelector((state) => state.reviewStore);

  const insertReview = useCallback(async () => {
    const reviewData = {
      meet_id,
      content: review.content,
      user_id,
    };
    try {
      // 리뷰 데이터를 서버로 전송
      await axios.post(`${localDomain}/reviews/insert`, reviewData, {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json',
        },
      });
      // console.log('리뷰 작성 완료:', resp.data);
      navigate(`../detail/${meet_id}`, { forceRefresh: true });
    } catch (error) {
      console.error('리뷰 작성 오류:', error);
    }
  }, [review, meet_id, navigate]);

  useEffect(() => {
    dispatch(clearData());
  }, [dispatch]);

  return (
    <Form onSubmit={handleSubmit(insertReview)}>
      <Form.Group controlId='reviewContent'>
        <Form.Label>리뷰 내용</Form.Label>
        <Form.Control
          type='text'
          className='form-control'
          name='content'
          value={review.content}
          onChange={(evt) => dispatch(updateReviewContent(evt.target.value))}
          placeholder='50자 이하로 작성해주세요.'
          maxLength={50}
        />
      </Form.Group>
      <Button variant='primary' type='submit'>
        작성 완료
      </Button>
    </Form>
  );
}

export default MeetReviewForm;
