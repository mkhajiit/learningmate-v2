import React, { useCallback, useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import LectureCommentComponent from './LectureCommentComponent';
import LectureCommentInput from './LectureCommentInput';
import { commentAction } from '../../../store/comment';
import commentsApi from '../../../services/comments';

function LectureCommentSection() {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth.isAuth);
  const commentList = useSelector((state) => state.comment.commentList);
  const course_id = useParams().courseid;
  const [isLoading, setLoading] = useState(false);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      const resp = await commentsApi.getCommentList(course_id);
      dispatch(
        commentAction.insert({
          commentList: resp.data.data,
        }),
      );
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, [course_id, dispatch]);

  function renderCommentList() {
    if (commentList && commentList.length > 0) {
      return commentList.map((item, index) => <LectureCommentComponent key={index} item={item} />);
    }
    return <p>댓글이 없어요. 첫번째 댓글을 달아봐요</p>;
  }
  useEffect(() => {
    fetchData();
  }, [fetchData]);
  return (
    <>
      {auth ? <LectureCommentInput /> : <h3>로그인을 해주세요</h3>}
      <Container className='mt-4' style={{ backgroundColor: '#ecf0f1', borderRadius: '15px' }}>
        {isLoading ? <h1>Loading...</h1> : renderCommentList()}
      </Container>
    </>
  );
}

export default LectureCommentSection;
