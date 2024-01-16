import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { Button, Col, Container, Row } from 'react-bootstrap';
import { lectureAction } from '../../store/lecture';
import { SearchBarSection } from '../LecturePage';
import coursesApi from '../../services/courses';
import LectureListContainer from '../LecturePage/LectureListContainer';

function UserUploadedCourses() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.userInfo);
  const login = useSelector((state) => state.auth.isAuth);
  const [loading, setLoading] = useState(false);

  const fetchUserUploadedCourses = useCallback(async () => {
    try {
      setLoading(true);
      const resData = await coursesApi.myCourseList(userInfo.userId);
      dispatch(lectureAction.insert({ courses: resData.data.data }));
    } catch (error) {
      console.log('에러', error);
    } finally {
      setLoading(false);
    }
  }, [dispatch, userInfo.userId]);

  useEffect(() => {
    fetchUserUploadedCourses();
  }, [fetchUserUploadedCourses]);

  return (
    <div>
      <h3>내가 업로드한 강의 목록</h3>
      <Container fluid>
        {loading ? (
          <h1>Loading...</h1>
        ) : (
          <Row className='justify-content-md-center align-items-center'>
            <Col md={8}>
              <SearchBarSection />
              <div className='d-flex justify-content-end'>
                {login && <Button onClick={() => navigate('../courses/register')}>강의 업로드</Button>}
              </div>
              <LectureListContainer />
            </Col>
          </Row>
        )}
      </Container>
    </div>
  );
}

export default UserUploadedCourses;
