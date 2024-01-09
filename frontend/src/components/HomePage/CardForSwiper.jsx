import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

// 가져온 데이터들을 내용에 맞게 처리해주면 끝
function CardForSwiper({ item }) {
  return (
    <Card style={{ width: '24rem' }}>
      <Card.Img variant='top' src={item} style={{ maxWidth: '100%', maxHeight: '120px' }} />
      <Card.Body>
        <Card.Title>모임1</Card.Title>
        <Card.Text>카테고리</Card.Text>
        {/* 버튼에 모임의 Detail 뷰로 가게 링크추가 */}
        <Button variant='primary'>Detail</Button>
      </Card.Body>
    </Card>
  );
}

export default CardForSwiper;
