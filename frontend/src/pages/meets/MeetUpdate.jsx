// 모임 수정

import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { changeData, setDates } from '../../store/meetStore';
import { serverDomain } from '../../config/config';

function BoardUpdate() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { meet } = useSelector((state) => state.meetStore);
  const { register } = useForm({ defaultValues: {}, mode: 'onBlur' });
  const categories = ['게임', '요리', '운동', '여행', '취미', '문화예술']; // 카테고리 생성

  const updateBoard = useCallback(
    async (evt) => {
      evt.preventDefault();
      await axios.put(`${serverDomain}/boards/update/`, meet);
      // console.log(resp.data);
      navigate('/meet');
    },
    [meet, navigate],
  );

  return (
    <main id='main'>
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
                        onChange={(evt) => dispatch(changeData(evt))}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>생성자</td>
                    <td>{meet.nickname}</td>
                    {/* 이렇게 두면 유저의 닉네임 나오는지 꼭 확인하기 */}
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
                      <button type='button' className='btn btn-primary btn-sm' onClick={() => navigate('/boards')}>
                        리스트
                      </button>{' '}
                      <button type='button' className='btn btn-warning btn-sm' onClick={(evt) => updateBoard(evt)}>
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

export default BoardUpdate;

BoardUpdate.defaultProps = {
  sub: '',
};
