import React from 'react';
import Card from 'react-bootstrap/Card';
import { useNavigate } from 'react-router';

function LectureCardComponent({ item }) {
  const navigate = useNavigate();
  return (
    item && (
      <>
        <Card
          className='col-lg-3 col-md-6 mb-4 my-4'
          onClick={() => navigate(`/courses/detail/${item.course_id}`)}
          style={{ cursor: 'pointer' }}
        >
          <Card.Img variant='top' src={item.attach_image_path} style={{ maxWidth: '100%', height: '200px' }} />
          <Card.Body>
            <div className='d-flex align-items-start'>
              <div className='flex-shrink-0'>
                <img
                  src={item.profile_name}
                  alt={`default.png`}
                  style={{ width: '50px', height: '50px', borderRadius: '100px' }}
                />
              </div>
              <div className='flex-grow-1 ms-3'>
                <Card.Title>{item.title}</Card.Title>
                <Card.Text>{item.nickname}</Card.Text>
                <Card.Text>조회수: {item.view_cnt}</Card.Text>
                <Card.Text>등록일: {item.createdAt}</Card.Text>
              </div>
            </div>
          </Card.Body>
        </Card>
      </>
    )
  );
}

export default LectureCardComponent;
