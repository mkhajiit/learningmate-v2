// 모임 디테일
// 24.01.03 - 데이터 나오는데 화면에 안 나옴 - 해결
// 24.01.04 ~
// - 다른 곳에서 사용한 모임 아니면 삭제 가능.. 이걸 어떻게 해야하지?
// - 날짜 값 변경
// - 참석 인원 수 받기
// - 사진 올라오게 하기

import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import moment from 'moment';

import { useDispatch } from 'react-redux';

import { getMeetAction } from '../../store/meetStore';
import MeetDetailMapSection from '../../components/maps/MeetDetailMapSection';
import { serverDomain } from '../../config/config';

function MeetDetail() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { id } = useParams();
  const [meet, setmeet] = useState({
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

  // const [participantCount, setParticipantCount] = useState(0);

  // useEffect(() => {
  //   const fetchParticipantCount = async () => {
  //     try {
  //       const response = await axios.get(`http://localhost:8000/meets/getMeetParticipantsCount/${id}`);
  //       setParticipantCount(response.data.participant_count);
  //     } catch (error) {
  //       console.error('Error fetching participant count:', error);
  //     }
  //   };

  //   fetchParticipantCount();
  // }, [id]);

  const getMeetDetail = useCallback(async () => {
    try {
      const resp = await axios.get(`${serverDomain}/meets/meet/${id}`);
      // console.log(resp.data);

      if (resp.data.data.length > 0) {
        setmeet(resp.data.data[0]);
        dispatch(getMeetAction(resp.data.data[0]));
      }
    } catch (error) {
      // console.error('Error fetching meet details:', error);
    }
  }, [dispatch, setmeet, id]);

  const deleteMeet = useCallback(
    async (meetId) => {
      try {
        await axios.delete(`${serverDomain}/meets/delete/${meetId}`);
        navigate('/meets'); // 삭제 후 meets로 이동
      } catch (error) {
        // console.error('Error deleting meet:', error);
      }
    },
    [navigate],
  );

  useEffect(() => {
    getMeetDetail();
  }, [getMeetDetail]);

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
                      <button className='btn btn-warning btn-sm' onClick={() => navigate('/update')}>
                        수정
                      </button>{' '}
                      <button className='btn btn-danger btn-sm' onClick={() => deleteMeet(meet.meet_id)}>
                        삭제
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div
              className='card p-3'
              style={{ width: '25rem', height: '15rem', marginTop: '95px', marginLeft: '40px' }}
            >
              <table>
                <tbody>
                  <MeetDetailMapSection />
                  {meet.onoff === 0 && <img src='지도 이미지 주소' className='card-img-top' alt='지도' />}

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
                  {/* <tr>
                    <td className='icon-only' style={iconStyle}>
                      참여자 수: {participantCount}
                    </td>
                  </tr> */}
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
      </section>
    </main>
  );
}

export default MeetDetail;

MeetDetail.defaultProps = {
  sub: '',
};
