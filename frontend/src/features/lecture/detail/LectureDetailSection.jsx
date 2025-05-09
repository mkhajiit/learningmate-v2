import { useParams } from 'react-router';
import React, { useCallback, useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import gravatar from 'gravatar';
import { useSelector } from 'react-redux';
import bookmarksApi from '../../../services/bookmarks';

function LectureDetailSection({ lectureInfo }) {
  const lectureDetail = useSelector((state) => state.lectureDetail);
  const course_id = useParams().courseid;
  const user_id = useSelector((state) => state.userInfo.userId);
  const { content } = lectureDetail;
  const [isBookmarked, setIsBookmarked] = useState(0);

  const toggleBookmark = async () => {
    try {
      if (!isBookmarked) {
        await bookmarksApi.insertBookmark(user_id, course_id);
        setIsBookmarked(true);
      } else {
        await bookmarksApi.deleteBookmark(user_id, course_id);
        setIsBookmarked(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getBookmarkByUserId = useCallback(async () => {
    try {
      const response = await bookmarksApi.getBookmarkByUserId(user_id);
      const bookMarkedCourseList = response.data[0];
      setIsBookmarked(bookMarkedCourseList.filter((item) => item.course_id === Number(course_id)).length);
    } catch (error) {
      console.log(error);
    }
  }, [user_id, course_id]);

  useEffect(() => {
    getBookmarkByUserId();
  }, [getBookmarkByUserId]);

  return (
    <>
      <Container>
        <h2 className='mt-2' style={{ display: 'inline-block' }}>
          {lectureDetail.title}
        </h2>
        {/* 북마크 */}
        {user_id !== 0 && (
          <button
            type='button'
            onClick={toggleBookmark}
            style={{ background: 'none', border: 'none', fontSize: '28px', color: 'lightcoral' }}
          >
            {!isBookmarked ? (
              <>
                <i className='bi bi-bookmark'></i>북마크
              </>
            ) : (
              <>
                <i className='bi bi-bookmark-fill'></i>북마크
              </>
            )}
          </button>
        )}
        <div className='d-flex align-items-center'>
          <div className='flex-shrink-0'>
            <img
              src={
                lectureDetail.registerProfile || gravatar.url(lectureDetail.registerNickname, { s: '70', d: 'retro' })
              }
              alt={`default.png`}
              style={{ width: '70px', height: '70px', borderRadius: '35px' }}
            />
          </div>
          <div className='flex-grow-1 ms-3'>
            <h4>{lectureDetail.registerNickname}</h4>
          </div>
        </div>
      </Container>
      <Container className='my-3' style={{ width: '100%', backgroundColor: '#ecf0f1', borderRadius: '15px' }}>
        <h4>
          조회수:{lectureInfo.views} 등록일:{lectureDetail.createdAt}
        </h4>
        {/* dispatch때 문자열로 저장한 content 문자열을 <div>로 나눠서 하나씩 출력하면 줄바꿈이 적용되어서 화면에 나옴 */}
        {content.split('\n').map((line, index, array) => (
          <React.Fragment key={index}>
            {line}
            {/* 마지막줄에는 줄바꿈문자를 넣지 않는다. */}
            {index !== array.length - 1 && <br />}
          </React.Fragment>
        ))}
      </Container>
    </>
  );
}

export default LectureDetailSection;
