/* eslint-disable no-console */
/* eslint-disable no-alert */
// 모임 생성
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from 'react-bootstrap';
import { changeData, clearData, setDates } from '../../store/meetStore';
import LandingModal from '../../components/maps/LandingModal';
import { positionAction } from '../../store/location';
import api from '../api/api';

function MeetInsert() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { meet } = useSelector((state) => state.meetStore);
  const user_id = useSelector((state) => state.userInfo.userId);
  // 위치선택 버튼으로 선택한 위치는 position에 위도와 경도가 저장됩니다
  const position = useSelector((state) => state.position);
  const categories = ['게임', '요리', '운동', '여행', '취미', '문화예술']; // 카테고리 생성
  const imageRef = useRef();
  const [isOffline, setOffline] = useState(false);
  const [selectedImageFileName, setSelectedImageFileName] = useState('');
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({ defaultValues: {}, mode: 'onBlur' });

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

  const insertMeet = useCallback(
    async (evt) => {
      evt.preventDefault();

      // 필수 입력 항목 체크
      if (
        !meet.title ||
        !meet.content ||
        !meet.start_date ||
        !meet.end_date ||
        !meet.max_num ||
        meet.onoff === null ||
        !meet.category
      ) {
        window.alert('필수 입력 항목을 모두 작성해주세요.');
        return;
      }

      const {
        files: [imageFile],
      } = document.querySelector('input[name="meetImage"]');

      // 이미지 파일이 선택된 경우에만 FormData 생성
      const imageFormData = new FormData();
      if (imageFile) {
        imageFormData.append('meetImage', imageFile);
      }

      const meetData = {
        title: meet.title,
        content: meet.content,
        start_date: meet.start_date,
        end_date: meet.end_date,
        max_num: meet.max_num,
        onoff: meet.onoff === '온라인' ? 1 : 0,
        category: meet.category,
        user_id,
        position,
      };

      if (imageFile) {
        meetData.meetImage = imageFile;
      }

      // meetImage가 null일 경우
      if (!meetData.meetImage) {
        console.log('meetImage 값:', meetData.meetImage);
        window.alert('이미지를 선택해주세요.');
        return;
      }

      try {
        await api.post(`/meets/insert`, meetData, {
          withCredentials: true,
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        navigate(`../meets`);
      } catch (error) {
        console.error(error);
      }
    },
    [meet, navigate, position, user_id],
  );

  useEffect(() => {
    dispatch(positionAction.setPosition({ lat: 0, lng: 0 }));
    dispatch(clearData());
  }, [dispatch]);

  return (
    <main id='main' style={{ background: 'white' }}>
      <section className='property-grid grid'>
        <div className='container'>
          <div className='row'>
            <form className='col-sm-12' onSubmit={handleSubmit(insertMeet)}>
              <table className='table'>
                <tbody>
                  <tr>
                    <td>제목 *</td>
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
                    <td>내용 *</td>
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
                    <td>일정 *</td>
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
                    <td>온오프라인 *</td>
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
                    <td>관련 이미지 *</td>
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
                      <Button
                        variant='success'
                        size='sm'
                        onClick={() => {
                          imageRef.current.click();
                        }}
                      >
                        이미지선택
                      </Button>{' '}
                      {selectedImageFileName && (
                        <p style={{ display: 'inline-block', marginLeft: '10px' }}>{selectedImageFileName}</p>
                      )}
                    </td>
                  </tr>
                  <tr>
                    <td>카테고리 선택 *</td>
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
