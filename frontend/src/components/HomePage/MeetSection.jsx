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
import { serverDomain } from '../../config/config';
import CardForMeetSwiper from './CardForMeetSwiper';

export default function MeetSection() {
  const location = useSelector((state) => state.location);
  const [response, setResponse] = useState('');
  const fetchData = useCallback(async () => {
    const resp = await axios.post(`${serverDomain}/meets/find-nearby-meetup`, location);
    // 뒤에서 10개의 정보만 사용합니다
    const sliceResp = resp.data.data.slice(-10);
    setResponse(sliceResp);
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
          {response &&
            response.map((item, index) => (
              <SwiperSlide key={index}>
                <CardForMeetSwiper item={item} />
              </SwiperSlide>
            ))}
        </Swiper>
      </Container>
    </>
  );
}
