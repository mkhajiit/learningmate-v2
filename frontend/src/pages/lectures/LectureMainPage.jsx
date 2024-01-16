import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { Button, Col, Container, Row } from 'react-bootstrap';
import { lectureAction } from '../../store/lecture';
import { SearchBarSection } from '../../components/LecturePage';
import coursesApi from '../../services/courses';
import LectureListContainer from '../../components/LecturePage/LectureListContainer';

function LectureMainPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const login = useSelector((state) => state.auth.isAuth);
  const [loading, setLoading] = useState(false);

  const readCourses = useCallback(async () => {
    try {
      setLoading(true);
      const resData = await coursesApi.getCourseList();
      dispatch(lectureAction.insert({ courses: resData.data.data }));
    } catch (error) {
      console.log('에러', error);
    } finally {
      setLoading(false);
    }
  }, [dispatch]);

  useEffect(() => {
    readCourses();
  }, [readCourses]);

  return (
    <>
      <Container fluid>
        {loading ? (
          <h1>Loading...</h1>
        ) : (
          <Row className='justify-content-md-center align-items-center'>
            <Col md={8}>
              <SearchBarSection />
              <div className='d-flex justify-content-end'>
                {login && <Button onClick={() => navigate('./register')}>강의 업로드</Button>}
              </div>
              <LectureListContainer />
            </Col>
          </Row>
        )}
      </Container>
    </>
  );
}
export default LectureMainPage;
