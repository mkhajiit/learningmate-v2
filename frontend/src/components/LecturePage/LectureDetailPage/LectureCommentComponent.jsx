// 삭제버튼을 추가할 예정
import React, { useCallback } from 'react';
import { Button, Container } from 'react-bootstrap';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { serverDomain } from '../../../config/config';
import { commentAction } from '../../../store/comment';

function LectureCommentComponent({ item }) {
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.userInfo.userId);
  const deleteComment = useCallback(async () => {
    await axios.delete(`${serverDomain}/comments/delete/${item.comment_id}`);
    // 삭제된 댓글을 Redux 상태에서도 제거
    dispatch(
      commentAction.delete({
        commentId: item.comment_id,
      }),
    );
  }, [item.comment_id, dispatch]);
  return (
    <Container className='my-4'>
      <div className='d-flex align-items-center'>
        <div className='flex-shrink-0'>
          <img src={item.profile_name} alt={`default.png`} style={{ width: '70px' }} />
        </div>
        <div className='flex-grow-1 ms-3'>
          <h4>{item.nickname}</h4>
          {item.content}
        </div>
        {/* 작성한 사람과 같은 사람만 삭제 버튼이 보이게 수정 */}
        {userId === item.user_id && (
          <Button size='sm' variant='danger' onClick={deleteComment}>
            삭제
          </Button>
        )}
      </div>
    </Container>
  );
}

export default LectureCommentComponent;
