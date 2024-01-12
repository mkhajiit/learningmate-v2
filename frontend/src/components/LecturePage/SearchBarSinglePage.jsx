// 싱글페이지 버전
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { lectureAction } from '../../store/lecture';
import { localDomain } from '../../config/config';

function SearchBarSinglePage() {
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: 'onChange' });

  const fetchSearchTerm = async (submitData) => {
    try {
      const result = await axios.get(`${localDomain}/courses/search`, {
        params: {
          term: submitData.searchInput,
        },
      });
      dispatch(lectureAction.insert({ term: submitData.searchInput, courses: result.data.data }));
    } catch (error) {
      console.log(error);
    }
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
            type='search'
            placeholder='Search'
            aria-label='Search'
            {...register('searchInput')}
          />
          <button className='btn btn-outline-primary' type='submit'>
            Search
          </button>
        </form>
      </div>
    </>
  );
}

export default SearchBarSinglePage;
