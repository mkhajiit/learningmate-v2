// 모임 생성
// 24.01.04 ~
// - onoff, approve는 0, 1 값 받기(완료)
// - 최대 참여 인원 음수로 안 가게 설정하기(완료), 최대 인원도 제한 하면 좋을 듯
// - 제목, 내용 글자수 제한 두기
// - 종료날짜가 시작날짜 뒤로 가지 않게 하기
// - 모임 생성 안 됨 (user불러오는지 확인)
// - 오프라인 체크하면 위치 작성 뜨게 하기
// - 로그인 정보가 안 가져와짐

import React, { useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { changeData, clearData, setDates } from '../../store/meetStore';
import LandingModal from '../../components/maps/LandingModal';
import { serverDomain } from '../../config/config';

function MeetInsert() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { userId, nickname } = useSelector((state) => state.userStore);
  // 위치선택 버튼으로 선택한 위치는 position에 위도와 경도가 저장됩니다
  // const position = useSelector((state) => state.position);
  const { meet } = useSelector((state) => state.meetStore);
  const { register } = useForm({ defaultValues: {}, mode: 'onBlur' });

  const categories = ['게임', '요리', '운동', '여행', '취미', '문화예술']; // 카테고리 생성

  const insertBoard = useCallback(
    async (evt) => {
      evt.preventDefault();

      // 라디오 버튼 onoff 값 확인
      // console.log('선택된 온오프라인:', meet.onoff);

      // 라디오 버튼 approve 값 확인
      // console.log('선택된 온오프라인:', meet.approve);

      const sendData = {
        user_id: userId,
        title: meet.title,
        content: meet.content,
        nickname,
        start_date: meet.start_date,
        end_date: meet.end_date,
        max_num: meet.max_num,
        onoff: meet.onoff,
        image: meet.image,
        category: meet.category,
        approve: meet.approve,
      };
      await axios.post(`${serverDomain}/meets/insert/`, sendData);
      navigate('/meets');
    },
    [meet, userId, nickname, navigate],
  );

  // useEffect(() => {
  //   if (!userId) navigate('/sign-in');
  // }, [navigate, userId]);

  useEffect(() => {
    dispatch(clearData());
  }, [dispatch]);

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
                      ></textarea>
                    </td>
                  </tr>
                  <tr>
                    <td>일정</td>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center' }}>
                        <input
                          type='date'
                          className='form-control'
                          name='start_date'
                          value={meet.start_date}
                          onChange={(evt) => dispatch(setDates(evt.target.value, meet.end_date))}
                          style={{ marginRight: '10px' }}
                        />
                        <span style={{ marginRight: '10px' }}>~</span>
                        <input
                          type='date'
                          className='form-control'
                          name='end_date'
                          value={meet.end_date}
                          onChange={(evt) => dispatch(setDates(meet.start_date, evt.target.value))}
                        />
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>참여 최대 인원</td>
                    <td>
                      <input
                        type='number'
                        className='form-control'
                        name='max_num'
                        value={meet.max_num}
                        onChange={(evt) => {
                          // 입력된 값이 음수인지 확인
                          const inputValue = parseInt(evt.target.value, 10);
                          if (!Number.isNaN(inputValue) && inputValue >= 0) {
                            // 음수가 아닌 경우만 값 업데이트
                            dispatch(changeData(evt));
                          }
                        }}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>생성자</td>
                    <td>{userId.nickname}</td>
                    {/* 이렇게 두면 닉네임 나오는지 꼭 확인하기 */}
                  </tr>
                  <tr>
                    <LandingModal />
                    <td>온오프라인</td>
                    <td>
                      <div className='form-check form-check-inline'>
                        <input
                          type='radio'
                          className='form-check-input'
                          name='onoff'
                          value='온라인'
                          checked={meet.onoff === '온라인'}
                          onChange={(evt) => dispatch(changeData(evt))}
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
                          onChange={(evt) => dispatch(changeData(evt))}
                        />
                        <label className='form-check-label'>오프라인</label>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>관련 이미지</td>
                    <td>
                      <input
                        type='file'
                        className='form-control'
                        id='images'
                        name='images'
                        accept='image/*'
                        {...register('images')}
                      />{' '}
                    </td>
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
                      <button type='submit' className='btn btn-warning btn-sm' onClick={insertBoard}>
                        입력
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </form>
          </div>
          {/* 위치선택 테스트용 */}
          {/* {position && <h1>{`모달창에서 읽어온값:${position.lat},${position.lng}`}</h1>} */}
        </div>
      </section>
    </main>
  );
}

export default MeetInsert;

MeetInsert.defaultProps = {
  sub: '',
};
