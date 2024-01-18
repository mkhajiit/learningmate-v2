// 홈페이지 강의 정보에 띄우는 카드 컴포넌트
import React from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useNavigate } from 'react-router';
import cuttingText from '../../helpers/cuttingText';

function CardForSwiper({ item }) {
  const navigate = useNavigate();
  // 띄어쓰기 포함 22글자 이상부터 잘립니다
  const title = cuttingText(item.title, 21);
  return (
    item && (
      <Card style={{ width: '24rem' }}>
        <Card.Img variant='top' src={item.attach_image_path} style={{ maxWidth: '100%', maxHeight: '120px' }} />
        <Card.Body>
          <Card.Title>{title}</Card.Title>
          <Card.Text>{item.nickname}</Card.Text>
          <Button type='button' variant='primary' onClick={() => navigate(`./courses/detail/${item.course_id}`)}>
            Detail
          </Button>
        </Card.Body>
      </Card>
    )
  );
}

export default CardForSwiper;
