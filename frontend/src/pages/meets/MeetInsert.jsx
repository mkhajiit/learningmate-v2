/* eslint-disable no-console */
/* eslint-disable no-alert */
// 모임 생성
// 24.01.04 ~
// - onoff, approve는 0, 1 값 받기(완료)
// - 최대 참여 인원 음수로 안 가게 설정하기(완료), 최대 인원도 제한 하면 좋을 듯
// - 제목, 내용 글자수 제한 두기 - 완료
// - 종료날짜가 시작날짜 뒤로 가지 않게 하기 - 완료
// 24.01.08 ~
// - 모임 생성 안 됨 - 완료
// - 오프라인 체크하면 위치 작성 뜨게 하기 - 완료
// - 로그인 정보가 안 가져와짐 - 완료
// - 최대 참여 인원만큼 참여자 수 제한해야함
// - 하나라도 작성 안 하면 생성 안 되게
// - 이미지 기능 다시
// - meets 사진도 public - users에 넣기
import axios from 'axios';
import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { localDomain, serverDomain } from '../../config/config';
import { changeData, clearData, setDates } from '../../store/meetStore';
import LandingModal from '../../components/maps/LandingModal';

function MeetInsert() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // 위치선택 버튼으로 선택한 위치는 position에 위도와 경도가 저장됩니다
  const position = useSelector((state) => state.position);
  const { meet } = useSelector((state) => state.meetStore);
  const userInfo = useSelector((state) => state.userInfo);
  const auth = useSelector((state) => state.auth.isAuth);
  // const { register } = useForm({ defaultValues: {}, mode: 'onBlur' });
  const categories = ['게임', '요리', '운동', '여행', '취미', '문화예술']; // 카테고리 생성

  const [data, setData] = useState({ user_id: '', nickname: '' });
  const [isloading, setLoading] = useState(true);
  const [isOffline, setOffline] = useState(false);

  const getData = useCallback(async () => {
    try {
      const resp = await axios.get(`${localDomain}/users/userinfo`, {
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

  // console.log(userInfo.userId);

  const insertMeet = useCallback(
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
        position,
      };
      try {
        const response = await axios.post(`${serverDomain}/meets/insert/`, sendData, { withCredentials: true });
        console.log('Server Response:', response.data); // 서버 응답을 콘솔에 출력
        navigate(`../meets`);
      } catch (error) {
        console.error(error);
      }
    },
    [meet, data, navigate],
  );

  // 없애도 됨
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
                        placeholder='50자 이하로 작성해주세요.'
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
                        placeholder='500자 이하로 작성해주세요.'
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
                        취소
                      </button>{' '}
                      <button type='submit' className='btn btn-warning btn-sm' onClick={insertMeet}>
                        입력
                      </button>
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

export default MeetInsert;

MeetInsert.defaultProps = {
  sub: '',
};
