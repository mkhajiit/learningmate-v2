import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { Col, Container, Row } from 'react-bootstrap';
import { lectureAction } from '../../store/lecture';
import bookmarksApi from '../../services/bookmarks';
import LectureListContainer from '../LecturePage/LectureListContainer';

function UserLikeCourses() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.userInfo);
  const [loading, setLoading] = useState(false);

  const fetchUserLikeCourses = useCallback(async () => {
    try {
      setLoading(true);
      const resData = await bookmarksApi.getBookmarkByUserId(userInfo.userId);
      dispatch(lectureAction.insert({ courses: resData.data[0] }));
      console.log(resData.data[0]);
    } catch (error) {
      console.log('에러', error);
    } finally {
      setLoading(false);
    }
  }, [dispatch, userInfo.userId]);

  useEffect(() => {
    fetchUserLikeCourses();
  }, [fetchUserLikeCourses]);

  return (
    <div>
      <Container fluid>
        {loading ? (
          <h1>Loading...</h1>
        ) : (
          <Row className='justify-content-md-center align-items-center'>
            <Col md={10}>
              <LectureListContainer />
            </Col>
          </Row>
        )}
      </Container>
    </div>
  );
}

export default UserLikeCourses;
