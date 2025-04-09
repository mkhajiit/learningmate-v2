/* eslint-disable no-alert */
/* eslint-disable no-console */
// 모임 디테일
import moment from 'moment';
import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Button, Modal } from 'react-bootstrap';
import MeetReviewForm from './MeetReviewForm';
import MeetDetailMapSection from '../../components/maps/MeetDetailMapSection';
import likesbuttonApi from '../../services/likesbutton';
import api from '../api/api';

function MeetDetail() {
  const navigate = useNavigate();
  const meet_id = useParams().meetid;
  const userInfo = useSelector((state) => state.userInfo);
  const login = useSelector((state) => state.auth.isAuth);
  const [reviews, setReviews] = useState([]);
  const [reviewModalContent, setReviewModalContent] = useState(null);
  const [isJoined, setIsJoined] = useState(false);
  const [isliked, setIsliked] = useState(0);
  const user_id = useSelector((state) => state.userInfo.userId);

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
    createdAt: '',
    latitude: '',
    longitude: '',
  });

  const iconStyle = {
    display: 'flex',
    alignItems: 'left',
  };

  const iconImageStyle1 = {
    width: '20px',
    height: '20px',
    marginRight: '10px',
    marginLeft: '10px',
    marginBottom: '5px',
  };

  const iconImageStyle2 = {
    width: '28px',
    height: '28px',
    marginRight: '5px',
    marginLeft: '7px',
    marginBottom: '5px',
  };
  const getMeetDetailAndReviews = useCallback(async () => {
    try {
      const [meetResp, reviewResp] = await Promise.all([
        api.get(`/meets/meet/${meet_id}`),
        api.get(`/reviews/detail/${meet_id}/reviewList`),
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

  const joinMeet = () => {
    if (!login) {
      // 로그인되지 않은 경우 알림 메시지 표시
      window.alert('로그인이 필요합니다. 로그인 페이지로 이동합니다.');
      navigate('/sign-in');
    } else {
      navigate(`/chat/chatRoom/${meet_id}`);
    }
  };

  const openReviewModal = () => {
    setReviewModalContent(
      <MeetReviewForm
        meet_id={meet_id}
        getMeetDetailAndReviews={getMeetDetailAndReviews}
        handleClose={() => setReviewModalContent(null)}
      />,
    );
  };

  const deleteMeet = useCallback(async () => {
    try {
      await api.delete(`/meets/delete/${meet_id}`);
      navigate('/meets'); // 삭제 후 meets로 이동
    } catch (error) {
      console.error(error);
    }
  }, [meet_id, navigate]);

  const deleteReview = useCallback(
    async (reviewId) => {
      try {
        await api.delete(`/reviews/delete/${reviewId}`);
        getMeetDetailAndReviews();
      } catch (error) {
        console.error(error);
      }
    },
    [getMeetDetailAndReviews],
  );

  const [isMeetExpired, setIsMeetExpired] = useState(false);

  // 현재 날짜가 종료 날짜 이후라면 모임 종료
  useEffect(() => {
    const endDate = moment(meet.end_date);
    const currentDate = moment();

    if (currentDate.isAfter(endDate)) {
      setIsMeetExpired(true);
    } else {
      setIsMeetExpired(false);
    }
  }, [meet.end_date]);

  // 현재 사용자가 글을 작성한 사용자인지 여부를 확인
  const UserPostAuthor = meet.nickname === userInfo.nickname;

  const toggleLikeButton = async () => {
    try {
      if (!isliked) {
        await likesbuttonApi.insertLikeButton(user_id, meet_id);
        setIsliked(true);
      } else {
        await likesbuttonApi.deleteLikeButton(user_id, meet_id);
        setIsliked(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getLikeButtonByUserId = useCallback(async () => {
    try {
      const response = await likesbuttonApi.getLikeButtonByUserId(user_id);
      const likebuttonMeetList = response.data[0];
      setIsliked(likebuttonMeetList.filter((item) => item.meet_id === Number(meet_id)).length);
    } catch (error) {
      console.log(error);
    }
  }, [user_id, meet_id]);

  useEffect(() => {
    getLikeButtonByUserId();
  }, [getLikeButtonByUserId]);

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
            <div className='col-sm-8' style={{ marginTop: '20px' }}>
              <table className='table table-borderless'>
                <tbody>
                  <tr>
                    <td style={{ fontSize: '30px' }}>{meet.title}</td>
                  </tr>
                  <tr>
                    <td>
                      <img
                        src={meet.image}
                        alt='모임이미지.jpg'
                        style={{
                          borderRadius: '15px',
                          width: '100%',
                          height: '450px',
                          objectFit: 'cover', // 이미지 비율 유지
                        }}
                      />
                    </td>
                  </tr>

                  {/* 좋아요 버튼 */}
                  {user_id !== 0 && (
                    <button
                      type='button'
                      onClick={toggleLikeButton}
                      style={{ background: 'none', border: 'none', fontSize: '28px', color: 'lightcoral' }}
                    >
                      {!isliked ? (
                        <>
                          <i className='bi bi-heart' style={{ color: 'lightcoral' }}></i>Likes
                        </>
                      ) : (
                        <>
                          <i className='bi bi-heart-fill' style={{ color: 'lightcoral' }}></i>Likes
                        </>
                      )}
                    </button>
                  )}
                  <tr>
                    <td style={{ fontSize: '25px' }}>{meet.content}</td>
                  </tr>

                  <tr>
                    <td colSpan='2' className='text-end'>
                      <button className='btn btn-primary btn-sm' onClick={() => navigate('/meets')}>
                        리스트
                      </button>{' '}
                      {userInfo.nickname === meet.nickname && (
                        <>
                          <button
                            className='btn btn-warning btn-sm'
                            onClick={() => navigate(`/update/${meet.meet_id}`)}
                          >
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
              style={{
                width: '25rem',
                height: meet.onoff === 1 ? '11rem' : '19rem',
                marginTop: '90px',
                marginLeft: '40px',
              }}
            >
              <table>
                <tbody>
                  <tr>
                    <td>
                      {meet.onoff === 0 && <MeetDetailMapSection latitude={meet.latitude} longitude={meet.longitude} />}
                    </td>
                  </tr>
                  <tr>
                    <td style={{ fontSize: '15px' }}>{meet.onoff ? '온라인 모임' : '오프라인 모임'}</td>
                  </tr>
                  <tr>
                    <td className='icon-only' style={iconStyle}>
                      <img src='/icons/icon-schedule.png' alt='Schedule Icon' style={iconImageStyle1} />
                      {moment(meet.start_date).format('YYYY-MM-DD hh:mm')} ~{' '}
                      {moment(meet.end_date).format('YYYY-MM-DD hh:mm')}
                    </td>
                  </tr>
                  <tr>
                    <td className='icon-only' style={iconStyle}>
                      <img src='/icons/icon-category.png' alt='Category Icon' style={iconImageStyle2} />
                      {meet.category}
                    </td>
                  </tr>
                  <tr>
                    <td className='icon-only' style={iconStyle}>
                      작성자: {meet.nickname}
                    </td>
                  </tr>
                  <tr>
                    <td className='icon-only' style={iconStyle}>
                      작성일: {meet.createdAt}
                    </td>
                  </tr>
                </tbody>
              </table>
              <div className='d-flex justify-content-end' style={{ marginTop: '50px' }}>
                <button
                  className={`btn btn-${isJoined ? 'success' : 'primary'} btn-sm`}
                  onClick={joinMeet}
                  style={{ width: '500px', height: '50px' }}
                  disabled={isMeetExpired} // 모임이 종료되었을 때 버튼 비활성화
                >
                  {isMeetExpired ? '종료된 모임입니다' : '참여'}
                </button>
              </div>
            </div>
          </div>
        </div>
        {/* 리뷰 리스트 */}
        <div className='m-4'>
          {login && !UserPostAuthor && (
            <Button size='sm' variant='primary' onClick={openReviewModal} style={{ marginLeft: '80px' }}>
              리뷰 작성하기
            </Button>
          )}
          {/* 모달로 띄우기 */}
          <Modal show={reviewModalContent !== null} onHide={() => setReviewModalContent(null)}>
            <Modal.Header closeButton>
              <Modal.Title>리뷰 작성하기</Modal.Title>
            </Modal.Header>
            <Modal.Body>{reviewModalContent}</Modal.Body>
          </Modal>{' '}
          <div className='col' style={{ marginLeft: '80px', marginTop: '30px' }}>
            <h3>리뷰</h3>
            {reviews.length > 0 ? (
              <ul style={{ listStyle: 'none' }}>
                {reviews.map((review, index, array) => (
                  <React.Fragment key={review.review_id}>
                    <li style={{ marginRight: '30px' }}>
                      <div style={{ display: 'flex', alignItems: 'center' }}>
                        <p style={{ fontSize: '17px', marginRight: '10px' }}>{review.nickname}: </p>
                        <p style={{ fontSize: '15px', flex: 1 }}>{review.content}</p>
                        {review.nickname === userInfo.nickname && (
                          <button
                            className='btn btn-sm'
                            style={{ marginRight: '500px', marginBottom: '20px' }}
                            onClick={() => {
                              deleteReview(review.review_id);
                            }}
                          >
                            <i className='bi bi-trash3'></i>
                          </button>
                        )}
                      </div>
                    </li>
                    {index < array.length - 1 && (
                      <hr style={{ marginTop: '5px', border: '1px solid #ccc', width: '60%' }} />
                    )}
                  </React.Fragment>
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
