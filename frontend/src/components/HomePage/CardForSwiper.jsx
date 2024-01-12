import React from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useNavigate } from 'react-router';

// 가져온 데이터들을 내용에 맞게 처리해주면 끝
function CardForSwiper({ item }) {
  const navigate = useNavigate();
  return (
    item && (
      <Card style={{ width: '24rem' }}>
        <Card.Img variant='top' src={item.attach_image_path} style={{ maxWidth: '100%', maxHeight: '120px' }} />
        <Card.Body>
          <Card.Title>{item.title}</Card.Title>
          <Card.Text>{item.nickname}</Card.Text>
          {/* 버튼에 모임의 Detail 뷰로 가게 링크추가 */}
          <Button type='button' variant='primary' onClick={() => navigate(`./courses/detail/${item.course_id}`)}>
            Detail
          </Button>
        </Card.Body>
      </Card>
    )
  );
}

export default CardForSwiper;
