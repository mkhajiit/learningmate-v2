import { Container } from 'react-bootstrap';

function AboutCard3() {
  return (
    <>
      <Container>
        <div className='card mb-3 mt-3' style={{ width: '100%' }}>
          <div className='row g-0'>
            <div className='col-md-4 d-flex align-items-center justify-content-center'>
              <img
                src={`${process.env.PUBLIC_URL}/img/전소영.png`}
                className='img-fluid rounded-start'
                alt='profile_image'
                style={{
                  height: '80%', // 조절 가능한 크기
                  width: '80%', // 조절 가능한 크기
                  objectFit: 'cover',
                }}
              />
            </div>
            <div className='col-md-8'>
              <div className='card-body'>
                <h5 className='card-title' style={{ fontSize: '2em' }}>
                  전소영
                </h5>
                <p className='card-text' style={{ lineHeight: '1.8' }}>
                  안녕하세요! 저는 1조 LearningMate 팀원 전소영입니다. <br />
                  저는 모임별로 채팅을 주고 받을 수 있는 채팅방 기능 구현을 담당 하였습니다.
                  <br /> Social Activity & Learning 서비스 기반의 웹이므로 사용자 간의 커뮤니케이션 및 상호작용 강화,
                  그리고 관심사 공유, 더 나아가 교육 및 멘토링을 목적으로 채팅방을 기획 했습니다. <br />
                  익명성을 보장하여 사용자가 전부 닉네임을 사용하고 있기 때문에 프로필 사진을 등록하지 않은 사용자는
                  이메일 주소를 기반으로 그라바타를 사용하여 고유한 식별자를 생성하고 이를 프로필 사진으로 사용할 수
                  있도록 하였습니다. 채팅방 기능에는 사용자가 자유롭게 채널을 추가할 수 있으며, 실시간 채팅이 가능하고
                  채팅을 날짜별로 구분하여 보다 정리된 채팅 이력을 볼 수 있게 구성 했습니다.
                  <br />{' '}
                  <span style={{ fontSize: '1.3em' }}>
                    이 채팅방은 여러분들의 이야기로 가득차 있어요. 무엇이든 자유롭게 나누어주세요!!
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
}
export default AboutCard3;
