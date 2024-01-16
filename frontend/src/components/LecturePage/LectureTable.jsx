// 개선해야하는 사항 유튜브 비슷하게 3x3으로 카드 컴포넌트에 영상 정보 담아서 출력하게 레이아웃 수정
import { useSelector } from 'react-redux';
import { Pagination, Table } from 'react-bootstrap';
import { useState } from 'react';
import { useNavigate } from 'react-router';

function LectureTable() {
  const navigate = useNavigate();
  const courses = useSelector((state) => state.lecture.courses);
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(10); // 페이지당 표시할 사용자 수

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const coursesList = courses.slice(indexOfFirstUser, indexOfLastUser);

  // 페이지 변경 핸들러
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  return (
    <>
      <Table striped bordered hover variant='dark'>
        <thead>
          <tr>
            <th>썸네일</th>
            <th>작성자</th>
            <th>제목</th>
            <th>작성일</th>
            <th>조회수</th>
          </tr>
        </thead>
        <tbody>
          {coursesList.map((item) => (
            <tr key={item.course_id} onClick={() => navigate(`./detail/${item.course_id}`)}>
              <td style={{ width: '10%' }}>
                <img src={item.attach_image_path} style={{ width: '100%' }} alt='이미지.jpg'></img>
              </td>
              <td>{item.nickname}</td>
              <td>{item.title}</td>
              <td>{item.createdAt}</td>
              <td>{item.view_cnt}</td>
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
    </>
  );
}

export default LectureTable;
