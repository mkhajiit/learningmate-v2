import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Col, Pagination, Row } from 'react-bootstrap';
import LectureCardComponent from './LectureCardComponent';

function LectureListContainer() {
  const courses = useSelector((state) => state.lecture.courses);
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(12);

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const coursesList = courses.slice(indexOfFirstUser, indexOfLastUser);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  return (
    <>
      <Col lg={12} className='align-items-center mt-3'>
        <Row className='justify-content-start'>
          {coursesList.map((item, index) => (
            <LectureCardComponent key={index} item={item} />
          ))}
        </Row>

        <div className='mt-3'>
          <Pagination className='justify-content-center'>
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
        </div>
      </Col>
    </>
  );
}

export default LectureListContainer;
