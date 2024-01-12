import { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router';
import axios from 'axios';
import { Button, Col, Container, Pagination, Row, Table } from 'react-bootstrap';
import { localDomain } from '../../../config/config';
import SearchedPageSearchBar from '../../../components/LecturePage/SearchedPageSearchBar';

function SearchedLecturePage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(10); // 페이지당 표시할 사용자 수
  const login = useSelector((state) => state.auth.isAuth);
  // users 데이터베이스에서 user_id,email,phone_number,nickname을 읽어옵니다.
  const fetchSearchTerm = useCallback(async () => {
    const searchQuery = new URLSearchParams(location.search).get('search_query');
    try {
      setLoading(true);
      const result = await axios.get(`${localDomain}/courses/search`, {
        params: {
          term: searchQuery,
        },
      });
      setCourses((currentCourses) => {
        currentCourses = result.data.data;
        return currentCourses;
      });
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, [location.search]);
  // 처음 렌더링때 한번 호출,함수가 변할때 호출
  useEffect(() => {
    fetchSearchTerm();
  }, [fetchSearchTerm]);

  // 현재 페이지의 사용자 데이터 계산
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const coursesList = courses.slice(indexOfFirstUser, indexOfLastUser);

  // 페이지 변경 핸들러
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  return (
    <>
      <Container fluid>
        {loading ? (
          <h1>Loading...</h1>
        ) : (
          <Row className='justify-content-md-center align-items-center'>
            <Col md={8}>
              <h1 className='display-1 text-center'>강의</h1>
              <SearchedPageSearchBar />
              <Table striped bordered hover variant='dark'>
                <thead>
                  <tr>
                    {/* <th>강의id</th> */}
                    <th>썸네일</th>
                    <th>작성자</th>
                    <th>제목</th>
                    <th>작성일</th>
                  </tr>
                </thead>
                <tbody>
                  {coursesList.map((item) => (
                    <tr key={item.course_id} onClick={() => navigate(`../detail/${item.course_id}`)}>
                      <td style={{ width: '10%' }}>
                        <img src={item.attach_image_path} style={{ width: '100%' }} alt='이미지.jpg'></img>
                      </td>
                      <td>{item.nickname}</td>
                      <td>{item.title}</td>
                      <td>{item.createdAt}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
              <Pagination>
                {[...Array(Math.ceil(courses.length / usersPerPage))].map((_, index) => (
                  <Pagination.Item
                    key={index + 1}
                    active={index + 1 === currentPage}
                    onClick={() => handlePageChange(index + 1)}
                  >
                    {index + 1}
                  </Pagination.Item>
                ))}
              </Pagination>
              {login && <Button onClick={() => navigate('../register')}>강의 업로드</Button>}
            </Col>
          </Row>
        )}
      </Container>
    </>
  );
}
export default SearchedLecturePage;
