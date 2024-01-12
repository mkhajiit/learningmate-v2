/* eslint-disable no-alert */
/* eslint-disable no-console */
// 모임 수정
// 01.10 - 내용 안 불러와짐

import axios from 'axios';
import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { serverDomain } from '../../config/config';
import { changeData, setDates, clearData } from '../../store/meetStore';
import LandingModal from '../../components/maps/LandingModal';

function MeetUpdate() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { meet_id } = useParams();
  const { meet } = useSelector((state) => state.meetStore);
  const userInfo = useSelector((state) => state.userInfo);
  const auth = useSelector((state) => state.auth.isAuth);
  const categories = ['게임', '요리', '운동', '여행', '취미', '문화예술'];

  const [data, setData] = useState({ user_id: '', nickname: '' });
  const [isloading, setLoading] = useState(true);
  const [isOffline, setOffline] = useState(false);

  const getData = useCallback(async () => {
    try {
      const resp = await axios.get(`${serverDomain}/users/userinfo`, {
        withCredentials: true,
      });
      if (resp.data.data === false) {
        window.alert('불러오기 실패');
      } else {
        const userData = resp.data.data[0];
        setData((currentData) => ({
          ...currentData,
          ...userData,
          user_id: userInfo.userId,
        }));
        dispatch(changeData({ target: { name: 'user_id', value: userInfo.userId } }));
      }
    } catch (err) {
      console.error('Error fetching user info:', err);
    } finally {
      setLoading(false);
    }
  }, [dispatch, userInfo]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${serverDomain}/meets/${meet_id}`);
        dispatch(changeData(response.data)); // 받아온 데이터로 상태 업데이트
      } catch (error) {
        console.error('Error fetching meet data:', error);
      }
    };

    fetchData(); // 컴포넌트가 마운트될 때 데이터 가져오기

    // 언마운트 시 정리
    return () => {
      dispatch(clearData());
    };
  }, [dispatch, meet_id]);

  const updateMeet = useCallback(
    async (evt) => {
      evt.preventDefault();

      const sendData = {
        title: meet.title,
        content: meet.content,
        start_date: meet.start_date,
        end_date: meet.end_date,
        max_num: meet.max_num,
        onoff: meet.onoff === '온라인' ? 1 : 0,
        image: meet.image,
        category: meet.category,
        approve: meet.approve === '승인 후 참가' ? 1 : 0,
        user_id: data.user_id,
      };

      try {
        const response = await axios.put(`${serverDomain}/meets/update/${meet_id}`, sendData, {
          withCredentials: true,
        });
        console.log('Server Response:', response.data); // 서버 응답을 콘솔에 출력
        navigate(`../meets`);
      } catch (error) {
        console.error(error);
      }
    },
    [meet, data, navigate, meet_id],
  );

  useEffect(() => {
    if (!auth) {
      navigate('/sign-in');
    } else {
      getData();
    }
  }, [auth, getData, navigate]);

  useEffect(() => {
    if (auth) {
      getData();
    }
  }, [auth, getData]);

  useEffect(() => {
    dispatch(clearData());
  }, [dispatch]);

  if (isloading) {
    return <div>Loading....</div>;
  }

  return (
    <main id='main' style={{ background: 'white' }}>
      <section className='property-grid grid'>
        <div className='container'>
          <div className='row'>
            <form className='col-sm-12'>
              <table className='table'>
                <tbody>
                  <tr>
                    <td>제목</td>
                    <td>
                      <input
                        type='text'
                        className='form-control'
                        name='title'
                        value={meet.title}
                        onChange={(evt) => dispatch(changeData(evt))}
                        maxLength={50}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>내용</td>
                    <td>
                      <textarea
                        cols='80'
                        rows='10'
                        name='content'
                        className='form-control'
                        value={meet.content}
                        onChange={(evt) => dispatch(changeData(evt))}
                        maxLength={500}
                      ></textarea>
                    </td>
                  </tr>
                  <tr>
                    <td>일정</td>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center' }}>
                        <input
                          type='datetime-local'
                          className='form-control'
                          name='start_date'
                          value={meet.start_date}
                          onChange={(evt) => dispatch(setDates(evt.target.value, meet.end_date))}
                          style={{ marginRight: '10px' }}
                        />
                        <span style={{ marginRight: '10px' }}>~</span>
                        <input
                          type='datetime-local'
                          className='form-control'
                          name='end_date'
                          value={meet.end_date}
                          onChange={(evt) => {
                            // 시작날짜가 종료날짜보다 크면 종료날짜를 시작날짜로 설정
                            const endDate = evt.target.value < meet.start_date ? meet.start_date : evt.target.value;
                            dispatch(setDates(meet.start_date, endDate));
                          }}
                        />
                      </div>
                      {meet.end_date < meet.start_date && (
                        <div style={{ color: 'red', marginTop: '5px' }}>종료날짜는 시작날짜보다 늦을 수 없습니다.</div>
                      )}
                    </td>
                  </tr>
                  <tr>
                    <td>참여 최대 인원 *</td>
                    <td>
                      <input
                        type='number'
                        className='form-control'
                        name='max_num'
                        // meet.max_num이 0이면 빈 문자열로 설정(0으로 남지 않게)
                        value={meet.max_num === 0 ? '' : meet.max_num}
                        onChange={(evt) => {
                          const inputValue = evt.target.value;
                          // 양의 정수인 경우에만 값 업데이트
                          if (!Number.isNaN(inputValue) && inputValue >= 0) {
                            dispatch(changeData(evt));
                          }
                        }}
                        placeholder='0'
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>생성자</td>
                    <td>{data.nickname}</td>
                  </tr>
                  <tr>
                    <td>온오프라인</td>
                    <td>
                      <div className='form-check form-check-inline'>
                        <input
                          type='radio'
                          className='form-check-input'
                          name='onoff'
                          value='온라인'
                          checked={meet.onoff === '온라인'}
                          onChange={(evt) => {
                            dispatch(changeData(evt));
                            // 온라인일 경우 오프라인 상태를 false로 설정
                            setOffline(false);
                          }}
                        />
                        <label className='form-check-label'>온라인</label>
                      </div>
                      <div className='form-check form-check-inline'>
                        <input
                          type='radio'
                          className='form-check-input'
                          name='onoff'
                          value='오프라인'
                          checked={meet.onoff === '오프라인'}
                          onChange={(evt) => {
                            dispatch(changeData(evt));
                            // 오프라인일 경우 오프라인 상태를 true로 설정
                            setOffline(true);
                          }}
                        />
                        <label className='form-check-label'>오프라인</label>
                      </div>

                      {/* 오프라인이면서 isOffline이 true일 때 모달 렌더링 */}
                      {meet.onoff === '오프라인' && isOffline && <LandingModal />}
                    </td>
                  </tr>
                  <tr>
                    <td>관련 이미지</td>
                    <td>{/* <ImageUpload /> */}</td>
                  </tr>
                  <tr>
                    <td>카테고리 선택</td>
                    <td>
                      <select
                        className='form-select'
                        name='category'
                        value={meet.category}
                        onChange={(evt) => dispatch(changeData(evt))}
                      >
                        <option value=''>카테고리 선택</option>
                        {categories.map((category) => (
                          <option key={category} value={category}>
                            {category}
                          </option>
                        ))}
                      </select>
                    </td>
                  </tr>
                  <tr>
                    <td>승인 허가 여부</td>
                    <td>
                      <div className='form-check form-check-inline'>
                        <input
                          type='radio'
                          className='form-check-input'
                          name='approve'
                          value='승인 후 참가'
                          checked={meet.approve === '승인 후 참가'}
                          onChange={(evt) => dispatch(changeData(evt))}
                        />
                        <label className='form-check-label'>승인 후 참가</label>
                      </div>
                      <div className='form-check form-check-inline'>
                        <input
                          type='radio'
                          className='form-check-input'
                          name='approve'
                          value='자유 참가'
                          checked={meet.approve === '자유 참가'}
                          onChange={(evt) => dispatch(changeData(evt))}
                        />
                        <label className='form-check-label'>자유 참가</label>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td colSpan='2' className='text-end'>
                      <button type='button' className='btn btn-primary btn-sm' onClick={() => navigate('/meets')}>
                        리스트
                      </button>{' '}
                      <button type='button' className='btn btn-warning btn-sm' onClick={(evt) => updateMeet(evt)}>
                        수정
                      </button>{' '}
                    </td>
                  </tr>
                </tbody>
              </table>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
}

export default MeetUpdate;

MeetUpdate.defaultProps = {
  sub: '',
};
