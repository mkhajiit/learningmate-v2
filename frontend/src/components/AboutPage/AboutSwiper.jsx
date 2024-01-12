/* eslint-disable import/no-unresolved */
import { Swiper, SwiperSlide } from 'swiper/react';
import './styles.css';
import { Container } from 'react-bootstrap';
import { Pagination, Navigation } from 'swiper/modules';
import AboutCard from './AboutCard';
import AboutCard2 from './AboutCard2';
import AboutCard3 from './AboutCard3';
import AboutCard4 from './AboutCard4';

export default function App() {
  return (
    <>
      <Container style={{ height: '100%' }}>
        <Swiper
          spaceBetween={30}
          centeredSlides={true}
          pagination={{
            clickable: true,
          }}
          navigation={true}
          modules={[Pagination, Navigation]}
          className='mySwiper'
        >
          <SwiperSlide>
            <AboutCard />
          </SwiperSlide>
          <SwiperSlide>
            <AboutCard2 />
          </SwiperSlide>
          <SwiperSlide>
            <AboutCard3 />
          </SwiperSlide>
          <SwiperSlide>
            <AboutCard4 />
          </SwiperSlide>
        </Swiper>
      </Container>
    </>
  );
}
