/* eslint-disable no-alert */
/* eslint-disable no-console */
// 모임 수정
import axios from 'axios';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import moment from 'moment';
import { Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { serverDomain } from '../../config/config';
import { changeData, setDates, updateMeetAction } from '../../store/meetStore';
import LandingModal from '../../components/maps/LandingModal';

function MeetUpdate() {
  const navigate = useNavigate();
  const imageRef = useRef();
  const position = useSelector((state) => state.position);
  const { meet } = useSelector((state) => state.meetStore);
  const meet_id = useParams().meetid;
  const dispatch = useDispatch();
  const [isOffline, setOffline] = useState(false);
  const [data, setData] = useState({ user_id: '', nickname: '' });
  const categories = ['게임', '요리', '운동', '여행', '취미', '문화예술']; // 카테고리 생성
  const [selectedImageFileName, setSelectedImageFileName] = useState('');

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({ defaultValues: {}, mode: 'onBlur' });

  useEffect(() => {
    const fetchMeetData = async () => {
      try {
        if (meet_id) {
          const response = await axios.get(`${serverDomain}/meets/meet/${meet_id}`, {
            headers: {
              'Cache-Control': 'no-store',
            },
          });
          const updatedMeet = response.data.data[0];

          // 기존 meet 값이 있는 경우에만 업데이트
          const updatedMeetWithDefaults = {
            ...meet,
            ...updatedMeet,
          };

          // dispatch로 리덕스 스토어 업데이트
          dispatch(updateMeetAction(updatedMeetWithDefaults));
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchMeetData();
  }, [meet_id]);

  const handleImageFileChange = (event) => {
    if (event.target.files[0]) {
      const fileName = event.target.files[0].name;
      setSelectedImageFileName(fileName);
      setValue('meetImage', event.target.files[0], {
        shouldValidate: true,
        shouldTouch: true,
        shouldDirty: true,
      });
    } else {
      const fileName = '';
      setSelectedImageFileName(fileName);
    }
  };

  const updateMeet = useCallback(
    async (evt) => {
      evt.preventDefault();

      const { files: imageFiles } = document.querySelector('input[name="meetImage"]');

      // 이미지 파일 담을 FormData 생성
      const imageFormData = new FormData();
      imageFormData.append('meetImage', imageFiles[0]);

      // Meet 상태를 가져와서 사용
      const updatedMeet = {
        title: meet.title,
        content: meet.content,
        start_date: moment(meet.start_date).format('YYYY-MM-DD HH:mm'),
        end_date: moment(meet.end_date).format('YYYY-MM-DD HH:mm'),
        max_num: meet.max_num,
        onoff: meet.onoff === '온라인' ? 1 : 0,
        category: meet.category,
        user_id: data.user_id,
        position,
      };

      if (imageFiles[0]) {
        updatedMeet.meetImage = imageFormData.get('meetImage');
      }

      try {
        await axios.patch(`${serverDomain}/meets/update/${meet_id}`, updatedMeet, {
          withCredentials: true,
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        dispatch(updateMeetAction(updatedMeet));
        navigate(`../meets`);
      } catch (error) {
        console.error(error);
      }
    },
    [meet, data, dispatch, navigate],
  );

  return (
    <main id='main' style={{ background: 'white' }}>
      <section className='property-grid grid'>
        <div className='container'>
          <div className='row'>
            <form className='col-sm-12' onSubmit={handleSubmit(updateMeet)}>
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
                          value={moment(meet.start_date).format('YYYY-MM-DD HH:mm')}
                          onChange={(evt) => dispatch(setDates(evt.target.value, meet.end_date))}
                          style={{ marginRight: '10px' }}
                        />
                        <span style={{ marginRight: '10px' }}>~</span>
                        <input
                          type='datetime-local'
                          className='form-control'
                          name='end_date'
                          value={moment(meet.end_date).format('YYYY-MM-DD HH:mm')}
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
                    <td>참여 최대 인원</td>
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
                    <td>
                      <input
                        type='file'
                        className='form-control'
                        id='meetImage'
                        name='meetImage'
                        accept='image/*'
                        {...register('meetImage', { required: true })}
                        ref={imageRef}
                        style={{ display: 'none' }}
                        onChange={handleImageFileChange}
                      />
                      <div style={{ display: 'flex', alignItems: 'center' }}>
                        <Button
                          variant='success'
                          size='sm'
                          onClick={() => {
                            imageRef.current.click();
                          }}
                        >
                          이미지 선택
                        </Button>{' '}
                        {meet.image && (
                          <div>
                            <img
                              src={meet.image}
                              alt='모임 이미지'
                              style={{ maxWidth: '100%', maxHeight: '100px', marginLeft: '10px' }}
                            />
                          </div>
                        )}
                        {selectedImageFileName && (
                          <p style={{ display: 'inline-block', marginLeft: '10px' }}>{selectedImageFileName}</p>
                        )}
                      </div>
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
