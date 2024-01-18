import { Container } from 'react-bootstrap';

function AboutCard2() {
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
                <h3 className='card-title'>김민경</h3>
                <p className='card-text'>
                  안녕하세요! 저는 LearningMate 팀원 김민경입니다. 저희 팀의 주제인 Social Activity & Learning 서비스를
                  개발하는 프로젝트에서 Social Activity 기능을 담당하였습니다. React와 Node.js를 활용하여 로그인을 한
                  사용자라면 누구든 손쉽게 모임을 생성할 수 있도록 하는 사용자 친화적인 모임 기능에 중점을 두고 개발을
                  진행하였습니다. 각 모임에 대해 카테고리화된 리스트를 제공하여 사용자들이 관심 있는 주제와 활동을 쉽게
                  찾을 수 있도록 페이지를 디자인하고 구현했습니다. 또한 참여 버튼을 누르면 해당 모임의 채팅방으로 이동할
                  수 있고 참여한 모임에 대해 리뷰를 작성할 수 있습니다. LearningMate 홈페이지를 통해 사용자들 간의
                  Social Activity를 촉진하여 다양한 사람들과 모임을 통해 교류할 수 있도록 기반을 마련하였습니다. 재밌게
                  즐겨주세요!
                </p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
}
export default AboutCard2;
