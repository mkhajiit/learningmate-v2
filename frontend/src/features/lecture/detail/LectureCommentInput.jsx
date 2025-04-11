import React, { useCallback } from 'react';
import { Button, Container, InputGroup } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router';
import gravatar from 'gravatar';
import { commentAction } from '../../../store/comment';
import commentsApi from '../../../services/comments';

function LectureCommentInput() {
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({ defaultValues: {} });
  const userInfo = useSelector((state) => state.userInfo);
  const course_id = useParams().courseid;
  const onSubmitEvent = useCallback(
    async (formData) => {
      try {
        const submitData = { comment: formData.comment, user_id: userInfo.userId, course_id };
        const result = await commentsApi.insertComment(submitData);
        dispatch(
          commentAction.insert({
            commentList: result.data.data,
          }),
        );
        setValue('comment', ''); // 입력창 초기화
      } catch (error) {
        console.log(error);
      }
    },
    [course_id, setValue, userInfo.userId, dispatch],
  );
  return (
    <Container>
      <div className='d-flex align-items-center mt-4 mx-2'>
        <div className='flex-shrink-0 mt-2 mx-1'>
          <img
            src={userInfo.profilePath || gravatar.url(userInfo.nickname, { s: '70', d: 'retro' })}
            alt={`default.png`}
            style={{ width: '70px', height: '70px', borderRadius: '35px' }}
          />
        </div>
        <div className='flex-grow-1 ms-3'>
          <h4>{userInfo.nickname}</h4>
          <form onSubmit={handleSubmit(onSubmitEvent)} style={{ display: 'flex', alignItems: 'center' }}>
            <InputGroup>
              <input
                style={{ flex: '1', height: '50px' }}
                type='text'
                placeholder='댓글을 입력해주세요'
                {...register('comment', { required: true })}
              />
              <Button type='submit' style={{ height: '50px' }}>
                입력
              </Button>
            </InputGroup>
          </form>
        </div>
      </div>
    </Container>
  );
}

export default LectureCommentInput;
