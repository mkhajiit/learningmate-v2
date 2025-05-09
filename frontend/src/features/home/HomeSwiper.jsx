/* eslint-disable import/no-unresolved */
import { Swiper, SwiperSlide } from 'swiper/react';
import './styles.css';
import { Container } from 'react-bootstrap';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';

export default function App() {
  return (
    <>
      <Container style={{ height: '500px' }}>
        <Swiper
          spaceBetween={30}
          centeredSlides={true}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
          }}
          navigation={true}
          modules={[Autoplay, Pagination, Navigation]}
          className='mySwiper'
        >
          <SwiperSlide>
            <img src={`${process.env.PUBLIC_URL}/img/학생들.jpg`} alt='exampleImage3.jpg'></img>
          </SwiperSlide>
          <SwiperSlide>
            <img src={`${process.env.PUBLIC_URL}/img/lecture-278583_1280.jpg`} alt='exampleImage2.jpg'></img>
          </SwiperSlide>
          <SwiperSlide>
            <img src={`${process.env.PUBLIC_URL}/img/party01.jpg`} alt='exampleImage3.jpg'></img>
          </SwiperSlide>
          <SwiperSlide>
            <img src={`${process.env.PUBLIC_URL}/img/video-conference-6077159_1280.jpg`} alt='exampleImage3.jpg'></img>
          </SwiperSlide>
        </Swiper>
      </Container>
    </>
  );
}
