import { Container } from 'react-bootstrap';

function AboutCard4() {
  return (
    <>
      <Container>
        <div className='card mb-3 mt-3' style={{ width: '100%' }}>
          <div className='row g-0'>
            <div className='col-md-4 d-flex align-items-center justify-content-center'>
              <img
                src={`${process.env.PUBLIC_URL}/img/default.png`}
                className='img-fluid rounded-start'
                alt='profile_image'
                style={{
                  height: '100%', // 조절 가능한 크기
                  width: '100%', // 조절 가능한 크기
                  objectFit: 'cover',
                }}
              />
            </div>
            <div className='col-md-8'>
              <div className='card-body'>
                <h5 className='card-title'>주나현</h5>
                <p className='card-text'>
                  This is a wider card with supporting text below as a natural lead-in to additional content. This
                  content is a little bit longer.This is a wider card with supporting text below as a natural lead-in to
                  additional content. This content is a little bit longer.This is a wider card with supporting text
                  below as a natural lead-in to additional content. This content is a little bit longer. This is a wider
                  card with supporting text below as a natural lead-in to additional content. This content is a little
                  bit longer.This is a wider card with supporting text below as a natural lead-in to additional content.
                  This content is a little bit longer.This is a wider card with supporting text below as a natural
                  lead-in to additional content. This content is a little bit longer.
                </p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
}
export default AboutCard4;
