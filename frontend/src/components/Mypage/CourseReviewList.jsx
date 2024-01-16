import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { commentAction } from '../../store/comment';
import { serverDomain } from '../../config/config';

const CourseReviewList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userInfo = useSelector((state) => state.userInfo);
  const commentList = useSelector((state) => state.comment.commentList);
  const [isLoading, setLoading] = useState(false);

  const fetchReviews = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${serverDomain}/comments/my-comment-list/${userInfo.userId}`);
      dispatch(commentAction.insert({ commentList: response.data.data }));
      console.log(response.data);
    } catch (error) {
      console.error('Error fetching reviews:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, [dispatch, userInfo.userId]);

  const handleReviewClick = (course_id) => {
    navigate(`/courses/detail/${course_id}`);
  };

  return (
    <div>
      <h5>내가 작성한 강의 댓글 목록</h5>
      {commentList.length === 0 ? (
        <p>작성한 강의 댓글이 없습니다.</p>
      ) : (
        <ul>
          {commentList.map((review) => (
            <li key={review.comment_id} onClick={() => handleReviewClick(review.course_id)}>
              {review.content}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CourseReviewList;
