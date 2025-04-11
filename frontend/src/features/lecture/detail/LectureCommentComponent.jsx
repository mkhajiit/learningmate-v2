import React, { useCallback } from 'react';
import { Button, Container } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import gravatar from 'gravatar';
import { commentAction } from '../../../store/comment';
import commentsApi from '../../../services/comments';

function LectureCommentComponent({ item }) {
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.userInfo.userId);
  const deleteComment = useCallback(async () => {
    await commentsApi.deleteComments(item.comment_id);
    // 삭제된 댓글을 Redux 상태에서도 제거
    dispatch(
      commentAction.delete({
        commentId: item.comment_id,
      }),
    );
  }, [item.comment_id, dispatch]);
  const profileImagePath = item.profile_name || gravatar.url(item.nickname, { s: '70', d: 'retro' });

  return (
    <Container className='my-4'>
      <div className='d-flex align-items-center'>
        <div className='flex-shrink-0 my-2'>
          <img
            src={profileImagePath}
            alt={`default.png`}
            style={{ width: '70px', height: '70px', borderRadius: '35px' }}
          />
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
