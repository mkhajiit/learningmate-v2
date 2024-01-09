/* eslint-disable import/no-unresolved */
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import './styles.css';

import { Autoplay, Pagination } from 'swiper/modules';
import { Container } from 'react-bootstrap';
import CardForSwiper from './CardForSwiper';

export default function MeetSection() {
  const img = `${process.env.PUBLIC_URL}/img/Hani.jpg`;
  return (
    <>
      <Container style={{ height: '300px' }}>
        <Swiper
          slidesPerView={3}
          spaceBetween={30}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
          }}
          modules={[Autoplay, Pagination]}
          className='mySwiper'
        >
          {/* 슬라이드 내용에 통신으로 meet에서 가져온 객체를 프롭으로 보낸다 */}
          <SwiperSlide>
            <CardForSwiper item={img} />
          </SwiperSlide>
          <SwiperSlide>
            <CardForSwiper />
          </SwiperSlide>
          <SwiperSlide>
            <CardForSwiper />
          </SwiperSlide>
          <SwiperSlide>
            <CardForSwiper />
          </SwiperSlide>
          <SwiperSlide>
            <CardForSwiper />
          </SwiperSlide>
          <SwiperSlide>
            <CardForSwiper item={img} />
          </SwiperSlide>
          <SwiperSlide>
            <CardForSwiper />
          </SwiperSlide>
          <SwiperSlide>
            <CardForSwiper item={img} />
          </SwiperSlide>
          <SwiperSlide>
            <CardForSwiper item={img} />
          </SwiperSlide>
        </Swiper>
      </Container>
    </>
  );
}
