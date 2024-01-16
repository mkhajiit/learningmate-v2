import { useCallback, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Container } from 'react-bootstrap';
import HomeSwiper from '../components/HomePage/HomeSwiper';
import MeetSection from '../components/HomePage/MeetSection';
import CourseSection from '../components/HomePage/LectureSection';
import ChatbotModal from '../components/Chatbot';
import { locationAction } from '../store/location';

function Home() {
  const dispatch = useDispatch();
  const fetchLocation = useCallback(async () => {
    navigator.geolocation.getCurrentPosition((position) => {
      const lat = position.coords.latitude;
      const lng = position.coords.longitude;
      dispatch(locationAction.setLocation({ lat, lng }));
    });
  }, [dispatch]);

  useEffect(() => {
    fetchLocation();
  }, [fetchLocation]);

  return (
    <>
      <Container className='mt-5'>
        <section id='about'>
          <HomeSwiper />
        </section>
        <br />
        <section id='contact'>
          <div className='container px-4'>
            <div className='row gx-4 justify-content-center'>
              <div className='col-lg-8'>
                <h1>지식의 공유와 소통이 만나는 곳, 러닝메이트!</h1>
                <p className='lead'>
                  러닝메이트, 함께 만들어가는 학습의 장소. 당신의 지식을 세상과 나누어보세요 새로운 아이디어와 만나고,
                  새로운 사람들과 다양한 모임에서 만나 함께 성장합니다. 강의 그리고 모임에서 다양한 친구들과
                  함께해보세요 러닝메이트에서 지금 바로 새로운 경험을 시작하세요!
                </p>
              </div>
            </div>
          </div>
        </section>
        <h2>내주변 모임정보</h2>
        <MeetSection />
        <br />
        <h2>강의정보</h2>
        <CourseSection />
        <br />
        <br />
        <br />
        <ChatbotModal />
      </Container>
    </>
  );
}
export default Home;
