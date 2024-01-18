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
                <h3 className='card-title'>주나현</h3>
                <p className='card-text'>
                  안녕하세요~ 저는 LearningMate 팀원 주나현이라고 합니다! 멀티캠퍼스에서 프론트엔드 개발자 취업캠프를
                  통해 이번 프로젝트에 참여하게 되었습니다. 프로그래밍을 접하고 하는 첫 프로젝트인 만큼 잘 하고싶은
                  마음과 두려운 마음이 공존했었는데요. 그래도 좋은 팀원들을 만나 무사히 프로젝트를 마칠 수 있게 되어
                  감사한 마음입니다. 저는 LearningMate의 마이페이지를 담당하고 있습니다. 마이페이지에서 보다 쉽게 내가
                  좋아하는 모임과 내가 구독한 강의, 그리고 내가 만든 모임과 내가 올린 강의들을 한 눈에 볼 수 있도록
                  페이지를 구성해 봤습니다. 달력을 통해 내 일정들을 관리할 수 있고, 내가 작성했었던 리뷰나 댓글들도 한
                  눈에 확인 할 수 있답니다. LearningMate에서 다양한 모임과 강의들을 통해, 여러분들이 좋은 사람들과 좋은
                  경험 그리고 좋은 시간들을 보내셨으면 합니다! 감사합니다!
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
