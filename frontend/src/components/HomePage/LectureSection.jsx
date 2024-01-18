/* eslint-disable import/no-unresolved */
// 홈페이지에 강의정보를 swiper로 띄우는 컴포넌트
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import './styles.css';

import { Autoplay, Pagination } from 'swiper/modules';
import { Container } from 'react-bootstrap';
import { useCallback, useEffect, useState } from 'react';
import CardForSwiper from './CardForSwiper';
import coursesApi from '../../services/courses';

export default function CourseSection() {
  const [dataList, setDataList] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const fetchData = useCallback(async () => {
    try {
      // 메인페이지 강의정보에서 카드로 띄울 데이터를 9개만 가져오는 api
      const resp = await coursesApi.getMainCourseList();
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
