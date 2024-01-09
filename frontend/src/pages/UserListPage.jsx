import { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import { Button, Col, Container, Pagination, Row, Table } from 'react-bootstrap';
import { serverDomain } from '../config/config';

function Userlist() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(10); // 페이지당 표시할 사용자 수
  // users 데이터베이스에서 user_id,email,phone_number,nickname을 읽어옵니다.
  const readUsers = useCallback(async () => {
    try {
      setLoading(true);
      const resData = await axios.get(`${serverDomain}/users/list`);
      setUsers((currentUsers) => {
        currentUsers = resData.data.data;
        return currentUsers;
      });
    } catch (err) {
      console.log('에러', err);
    } finally {
      setLoading(false);
    }
  }, []);
  // 버튼 클릭시 그 item의 id를 인자로 받아서 삭제
  const deleteUser = useCallback(async (id) => {
    const resdata = await axios.delete(`${serverDomain}/users/delete/${id}`);
    if (resdata.status === 200) {
      // 인자로 받은 id와 같지 않은것들만 다시 users에 저장해서 삭제된 것만 filter로 거르고 화면에 출력되게 합니다
      setUsers((currentUsers) => currentUsers.filter((item) => item.user_id !== id));
    } else {
      window.alert('삭제를 실패했습니다');
    }
  }, []);
  // 처음 렌더링때 한번 호출,함수가 변할때 호출
  useEffect(() => {
    readUsers();
  }, [readUsers]);

  // 현재 페이지의 사용자 데이터 계산
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

  // 페이지 변경 핸들러
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  return (
    // 테이블 시작
    <Container fluid>
      {loading ? (
        <h1>Loading...</h1>
      ) : (
        <Row className='justify-content-md-center align-items-center'>
          <Col md={8}>
            <h1 className='display-1 text-center'>회원관리</h1>
            <Table striped bordered hover variant='dark'>
              <thead>
                <tr>
                  <th>user_id</th>
                  <th>email</th>
                  <th>phone_number</th>
                  <th>nickname</th>
                  <th>action</th>
                </tr>
              </thead>
              <tbody>
                {currentUsers.map((item) => (
                  <tr key={item.user_id}>
                    <td>{item.user_id}</td>
                    <td>{item.email}</td>
                    <td>{item.phone_number}</td>
                    <td>{item.nickname}</td>
                    <td>
                      {/* 이벤트 핸들러는 항상 실행함수가 와야함 함수가 오면 반환값을 받는데 이벤트 핸들러에서는 쓸모가 없어서 에러가남 */}
                      <Button onClick={() => deleteUser(item.user_id)}>삭제</Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
            <Pagination>
              {[...Array(Math.ceil(users.length / usersPerPage))].map((_, index) => (
                <Pagination.Item
                  key={index + 1}
                  active={index + 1 === currentPage}
                  onClick={() => handlePageChange(index + 1)}
                >
                  {index + 1}
                </Pagination.Item>
              ))}
            </Pagination>
          </Col>
        </Row>
      )}
    </Container>
    // 테이블 끝
  );
}
export default Userlist;
