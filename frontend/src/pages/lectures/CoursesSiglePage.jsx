// 싱글페이지 버전(현재 적용중)
import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import axios from 'axios';
import { Button, Col, Container, Row } from 'react-bootstrap';
import { localDomain } from '../../config/config';
import { lectureAction } from '../../store/lecture';
import SearchBarSinglePage from '../../components/LecturePage/SearchBarSinglePage';
import LectureTable from '../../components/LecturePage/LectureTable';

function CoursesSinglePage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const login = useSelector((state) => state.auth.isAuth);
  const [loading, setLoading] = useState(false);

  // users 데이터베이스에서 user_id,email,phone_number,nickname을 읽어옵니다.
  const readCourses = useCallback(async () => {
    try {
      setLoading(true);
      const resData = await axios.get(`${localDomain}/courses/courseList`);
      dispatch(lectureAction.insert({ courses: resData.data.data }));
    } catch (err) {
      console.log('에러', err);
    } finally {
      setLoading(false);
    }
  }, [dispatch]);
  // 처음 렌더링때 한번 호출,함수가 변할때 호출
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
              <SearchBarSinglePage />
              <LectureTable />
              {login && <Button onClick={() => navigate('./register')}>강의 업로드</Button>}
            </Col>
          </Row>
        )}
      </Container>
    </>
  );
}
export default CoursesSinglePage;
