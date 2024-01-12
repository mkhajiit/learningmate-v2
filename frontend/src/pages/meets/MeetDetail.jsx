/* eslint-disable no-console */

import axios from 'axios';
import moment from 'moment';
import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Button, Modal } from 'react-bootstrap';
import { serverDomain } from '../../config/config';
import ReviewForm from './MeetReviewForm';
import MeetDetailMapSection from '../../components/maps/MeetDetailMapSection';

function MeetDetail() {
  const navigate = useNavigate();
  const meet_id = useParams().meetid;
  const userInfo = useSelector((state) => state.userInfo);
  const [reviews, setReviews] = useState([]);
  const [reviewModalContent, setReviewModalContent] = useState(null);

  const [meet, setMeet] = useState({
    meet_id: '',
    nickname: '',
    email: '',
    title: '',
    content: '',
    start_date: '',
    end_date: '',
    max_num: null,
    onoff: false,
    image: '',
    category: '',
    approve: false,
    createdAt: '',
    latitude: '',
    longitude: '',
  });

  const iconStyle = {
    display: 'flex',
    alignItems: 'left',
  };

  const iconImageStyle1 = {
    width: '24px',
    height: '24px',
    marginRight: '10px',
    marginLeft: '8px',
  };

  const iconImageStyle2 = {
    width: '20px',
    height: '20px',
    marginRight: '10px',
    marginLeft: '10px',
  };

  const iconImageStyle3 = {
    width: '24px',
    height: '24px',
    marginRight: '10px',
    marginLeft: '10px',
  };

  const joinMeet = () => {
    // 참여 버튼 클릭 시 실행되어야 하는 동작
    // console.log('Meet 참여 버튼 클릭');
  };

  const getMeetDetailAndReviews = useCallback(async () => {
    try {
      const [meetResp, reviewResp] = await Promise.all([
        axios.get(`${serverDomain}/meets/meet/${meet_id}`),
        axios.get(`${serverDomain}/reviews/detail/${meet_id}/reviewList`),
      ]);

      // Meet 정보 설정
      if (meetResp.data.data.length > 0) {
        setMeet(meetResp.data.data[0]);
      }

      // 리뷰 정보 설정
      setReviews(reviewResp.data.data);
    } catch (error) {
      console.error(error);
    }
  }, [meet_id]);
  const openReviewModal = () => {
    setReviewModalContent(
      <ReviewForm
        meet_id={meet_id}
        getMeetDetailAndReviews={getMeetDetailAndReviews}
        handleClose={() => setReviewModalContent(null)}
      />,
    );
  };

  const deleteMeet = useCallback(async () => {
    try {
      await axios.delete(`${serverDomain}/meets/delete/${meet_id}`);
      navigate('/meets'); // 삭제 후 meets로 이동
    } catch (error) {
      console.error(error);
    }
  }, [meet_id, navigate]);

  useEffect(() => {
    getMeetDetailAndReviews();
  }, [getMeetDetailAndReviews]);

  useEffect(() => {}, [meet.meet_id]);

  useEffect(() => {}, [reviews]);

  return (
    <main id='main' style={{ background: 'white' }}>
      <section className='property-grid grid'>
        <div className='container'>
          <div className='row'>
            <div className='col-sm-8' style={{ marginTop: '50px' }}>
              <table className='table table-borderless'>
                <tbody>
                  <tr>
                    <td>{meet.title}</td>
                  </tr>
                  <tr>
                    <td>
                      <img
                        src={`${process.env.PUBLIC_URL}/img/Hani.jpg`}
                        alt='exampleImage2.jpg'
                        style={{ borderRadius: '15px', width: '880px', height: '450px' }}
                      ></img>
                    </td>
                    {/* <td>{meet.image}</td> */}
                  </tr>
                  <tr>
                    <td>{meet.content}</td>
                  </tr>
                  <tr>
                    <td colSpan='2' className='text-end'>
                      <button className='btn btn-primary btn-sm' onClick={() => navigate('/meets')}>
                        리스트
                      </button>{' '}
                      {userInfo.nickname === meet.nickname && (
                        <>
                          <button className='btn btn-warning btn-sm' onClick={() => navigate('/update')}>
                            수정
                          </button>{' '}
                          <button className='btn btn-danger btn-sm' onClick={() => deleteMeet(meet.meet_id)}>
                            삭제
                          </button>
                        </>
                      )}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div
              className='card p-3'
              style={{ width: '25rem', height: '20rem', marginTop: '95px', marginLeft: '40px' }}
            >
              <table>
                <tbody>
                  {/* 지도 */}
                  <tr>
                    <td>
                      {meet.onoff === 0 && <MeetDetailMapSection latitude={meet.latitude} longitude={meet.longitude} />}
                    </td>
                  </tr>
                  <tr>
                    <td>{meet.onoff ? '온라인' : '오프라인'}</td>
                  </tr>
                  {meet.onoff === 0 && (
                    <tr>
                      <td className='icon-only' style={iconStyle}>
                        <img src='/icons/icon-location.png' alt='Location Icon' style={iconImageStyle1} />
                        제주특별자치도 ...
                      </td>
                    </tr>
                  )}
                  <tr>
                    <td className='icon-only' style={iconStyle}>
                      <img src='/icons/icon-schedule.png' alt='Schedule Icon' style={iconImageStyle2} />
                      {moment(meet.start_date).format('YYYY-MM-DD hh:mm')} ~{' '}
                      {moment(meet.end_date).format('YYYY-MM-DD hh:mm')}
                    </td>
                  </tr>
                  <tr>
                    <td className='icon-only' style={iconStyle}>
                      <img src='/icons/icon-approve.png' alt='Location Icon' style={iconImageStyle3} />
                      {meet.approve ? '자유 참가' : '관리자 승인 후 참가'}
                    </td>
                  </tr>
                  <tr>
                    <td className='icon-only' style={iconStyle}>
                      작성자: {meet.nickname}
                    </td>
                  </tr>
                  <tr>
                    <td className='icon-only' style={iconStyle}>
                      참여자 수: {0}/{meet.max_num}
                    </td>
                  </tr>
                </tbody>
              </table>
              <div className='d-flex justify-content-end' style={{ marginTop: '130px' }}>
                <button
                  className='btn btn-primary btn-sm'
                  onClick={joinMeet}
                  style={{ width: '500px', height: '50px' }}
                >
                  참여
                </button>
              </div>
            </div>
          </div>
        </div>
        {/* 리뷰 리스트 */}
        <div className='m-4'>
          <Button size='sm' variant='primary' onClick={openReviewModal}>
            리뷰 작성하기
          </Button>
          {/* 모달로 띄우기 */}
          <Modal show={reviewModalContent !== null} onHide={() => setReviewModalContent(null)}>
            <Modal.Header closeButton>
              <Modal.Title>리뷰 작성하기</Modal.Title>
            </Modal.Header>
            <Modal.Body>{reviewModalContent}</Modal.Body>
          </Modal>{' '}
          <div className='col'>
            <h3>리뷰</h3>
            {reviews.length > 0 ? (
              <ul>
                {reviews.map((review) => (
                  <li key={review.review_id}>
                    <p>{review.content}</p>
                    <p>작성자: {review.nickname}</p>
                  </li>
                ))}
              </ul>
            ) : (
              <p>리뷰가 없습니다.</p>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}

export default MeetDetail;

MeetDetail.defaultProps = {
  sub: '',
};
