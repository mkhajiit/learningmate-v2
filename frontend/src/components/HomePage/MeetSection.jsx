/* eslint-disable import/no-unresolved */
import { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import './styles.css';
import { Autoplay, Pagination } from 'swiper/modules';
import { Container } from 'react-bootstrap';
import { localDomain } from '../../config/config';
import CardForMeetSwiper from './CardForMeetSwiper';

export default function MeetSection() {
  const location = useSelector((state) => state.location);
  const [response, setResponse] = useState('');
  const fetchData = useCallback(async () => {
    const resp = await axios.post(`${localDomain}/meets/find-nearby-meetup`, location);
    setResponse(resp.data.data);
  }, [location]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);
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
          {/* 슬라이드 10개만 만들게 조건문을 사용 */}
          {response &&
            response.map(
              (item, index) =>
                index < 10 && (
                  <SwiperSlide key={index}>
                    <CardForMeetSwiper item={item} />
                  </SwiperSlide>
                ),
            )}
        </Swiper>
      </Container>
    </>
  );
}
