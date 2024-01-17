import axios from 'axios';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { FaTimes } from 'react-icons/fa';
import { useState } from 'react';
import { lectureAction } from '../../store/lecture';
import { serverDomain } from '../../config/config';
import coursesApi from '../../services/courses';

function SearchBarSection() {
  const dispatch = useDispatch();
  const [onButton, setOnButton] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ mode: 'onChange' });

  const fetchSearchTerm = async (submitData) => {
    try {
      const result = await axios.get(`${serverDomain}/courses/search`, {
        params: {
          term: submitData.searchInput,
        },
      });
      dispatch(lectureAction.insert({ term: submitData.searchInput, courses: result.data.data }));
      setOnButton(true);
    } catch (error) {
      console.log(error);
    }
  };
  const handleReset = async () => {
    // 리셋 버튼 클릭 시, 폼을 초기 상태로 리셋
    reset();
    const result = await coursesApi.getCourseList();
    dispatch(lectureAction.insert({ term: '', courses: result.data.data }));
    setOnButton(false);
  };
  return (
    <>
      <div className='container-fluid mb-4 d-flex justify-content-center align-items-center mt-4'>
        <form
          onSubmit={handleSubmit(fetchSearchTerm)}
          className='d-flex'
          role='search'
          style={{ backgroundColor: 'white', width: '60%' }}
        >
          <input
            className='form-control me-2'
            placeholder='검색'
            aria-label='Search'
            {...register('searchInput', { required: '검색어를 입력하세요' })}
            style={{ textAlign: 'center', fontSize: '1.5rem' }}
          />
          {/* 검색후 초기상태로 돌려주는 버튼 */}
          {onButton ? (
            <FaTimes
              className='mt-4 ms-2 cursor-pointer'
              onClick={handleReset}
              style={{ marginRight: '15px', fontSize: '1.5rem', color: 'blue' }}
            />
          ) : (
            <FaTimes
              className='mt-4 ms-2 cursor-pointer'
              onClick={handleReset}
              style={{ marginRight: '15px', fontSize: '1.5rem', color: 'blue', visibility: 'hidden' }}
            />
          )}
          <button className='btn btn-outline-primary' type='submit'>
            Search
          </button>
        </form>
      </div>
      <div style={{ textAlign: 'center', color: 'tomato' }}>{errors.searchInput?.message}</div>
    </>
  );
}

export default SearchBarSection;
