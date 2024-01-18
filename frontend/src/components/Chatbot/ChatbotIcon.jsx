// 아이콘이 자동으로 말풍선을 출력하게
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import Row from 'react-bootstrap/Row';

function ChatbotIcon({ onClick }) {
  const tooltipContent = '안녕하세요 chatbot 나무늘보입니다 뭐든 질문해주세요';
  return (
    <div
      style={{
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        zIndex: '1000',
        cursor: 'pointer',
      }}
    >
      <Row>
        <Col xs={4} md={4} onClick={onClick}>
          <OverlayTrigger placement='top' overlay={<Tooltip>{tooltipContent}</Tooltip>}>
            <div style={{ position: 'relative' }}>
              <Image
                src={`${process.env.PUBLIC_URL}/img/나무늘보.jpg`}
                roundedCircle
                style={{ width: '100px', height: '100px', cursor: 'pointer' }}
              />
            </div>
          </OverlayTrigger>
        </Col>
      </Row>
    </div>
  );
}

export default ChatbotIcon;
