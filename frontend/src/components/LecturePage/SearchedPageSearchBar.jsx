// // 유튜브처럼 새페이지를 띄워주는 버전
// import { useNavigate } from 'react-router';
// import { useForm } from 'react-hook-form';
// import { useDispatch, useSelector } from 'react-redux';
// import { lectureAction } from '../../store/lecture';

// function SearchedPageSearchBar() {
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const term = useSelector((state) => state.lecture.term);
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm({ defaultValues: { searchInput: term }, mode: 'onChange' });
//   const fetchSearchTerm = async (submitData) => {
//     try {
//       const queryData = submitData.searchInput;
//       dispatch(lectureAction.insert({ term: submitData.searchInput }));
//       navigate({ search: `?search_query=${encodeURIComponent(queryData)}` });
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   return (
//     <>
//       <div className='container-fluid mb-4 d-flex justify-content-center align-items-center'>
//         <form
//           onSubmit={handleSubmit(fetchSearchTerm)}
//           className='d-flex'
//           role='search'
//           style={{ backgroundColor: 'white', width: '60%' }}
//         >
//           <input
//             className='form-control me-2'
//             type='search'
//             placeholder='Search'
//             aria-label='Search'
//             {...register('searchInput')}
//           />
//           <button className='btn btn-outline-primary' type='submit'>
//             Search
//           </button>
//         </form>
//       </div>
//     </>
//   );
// }

// export default SearchedPageSearchBar;
