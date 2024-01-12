import { Container } from 'react-bootstrap';

function LectureVideoSection({ videoPath }) {
  return (
    <Container className='mt-4'>
      <video controls style={{ width: '100%', borderRadius: '15px' }}>
        <source src={videoPath} type='video/mp4' />
      </video>
    </Container>
  );
}

export default LectureVideoSection;
