import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { Button, Col, Container, Row } from 'react-bootstrap';
import { lectureAction } from '../../store/lecture';
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
      console.log(resData.data.data);
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
      <Container fluid>
        {loading ? (
          <h1>Loading...</h1>
        ) : (
          <Row className='justify-content-md-center align-items-center'>
            <Col md={10}>
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
