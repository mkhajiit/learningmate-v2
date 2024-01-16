/* eslint-disable no-console */
// 아직 안 됨 ㅜㅅㅜ
import axios from 'axios';
import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router';
import { Button, Form } from 'react-bootstrap';
import { serverDomain } from '../../config/config';
import { changeData, clearData } from '../../store/reviewStore';

function MeetReviewForm() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { register, handleSubmit, setValue } = useForm({ defaultValues: {} });
  const meet_id = useParams().meetid;
  const userId = useSelector((state) => state.userInfo.userId);
  const auth = useSelector((state) => state.auth.isAuth);
  const [data, setData] = useState({ user_id: '', nickname: '' });
  const [isloading, setLoading] = useState(true);
  const [reviews, setReviews] = useState([]);
  const { review } = useSelector((state) => state.reviewStore) || { review: {} };

  console.log('Review in MeetReviewForm:', review);
  console.log(meet_id);
  console.log(userId);

  const insertReview = useCallback(async () => {
    // Meet 데이터 생성
    const reviewData = {
      meet_id,
      content: review.content,
      userId,
    };

    try {
      // 리뷰 데이터를 서버로 전송
      const resp = await axios.post(`${serverDomain}/reviews/insert`, reviewData, {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json',
        },
      });

      console.log('리뷰 작성 완료:', resp.data.data[0]);
      // 리뷰 작성 후, 필요한 업데이트 또는 이동 작업 수행
      navigate(`../meets`);
    } catch (error) {
      console.error('리뷰 작성 오류:', error);
    }
  }, [review, meet_id, navigate]);

  return (
    <Form onSubmit={handleSubmit(insertReview)}>
      <Form.Group controlId='reviewContent'>
        <Form.Label>리뷰 내용</Form.Label>
        <Form.Control
          type='text'
          className='form-control'
          name='content'
          value={review.content}
          onChange={(evt) => dispatch(changeData(evt))}
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
