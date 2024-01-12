/* eslint-disable import/no-unresolved */
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import './styles.css';

import { Autoplay, Pagination } from 'swiper/modules';
import { Container } from 'react-bootstrap';
import { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import CardForSwiper from './CardForSwiper';
import { localDomain } from '../../config/config';

export default function CourseSection() {
  const [dataList, setDataList] = useState([]);
  const [isLoading, setLoading] = useState(true);
  // const img = `${process.env.PUBLIC_URL}/img/lectureImg.jpg`;
  const fetchData = useCallback(async () => {
    try {
      // 메인페이지 강의정보에서 카드로 띄울 데이터를 9개만 가져오는 api
      const resp = await axios.get(`${localDomain}/courses/main-course-list`);
      console.log(resp.data.data);
      setDataList(resp.data.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);
  return (
    <>
      <Container style={{ height: '300px' }}>
        {isLoading ? (
          <p>Loading ...</p>
        ) : (
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
            {dataList &&
              dataList.map((item, index) => (
                <SwiperSlide key={index}>
                  <CardForSwiper item={item} />
                </SwiperSlide>
              ))}
          </Swiper>
        )}
      </Container>
    </>
  );
}
