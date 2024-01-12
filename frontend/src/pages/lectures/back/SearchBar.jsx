// // 유튜브처럼 새페이지를 띄워주는 버전
// import { useNavigate } from 'react-router';
// import { useDispatch } from 'react-redux';
// import { useForm } from 'react-hook-form';
// import { lectureAction } from '../../store/lecture';

// function SearchBar() {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm({ mode: 'onChange' });

//   const fetchSearchTerm = async (submitData) => {
//     try {
//       dispatch(lectureAction.insert({ term: submitData.searchInput }));
//       const queryData = submitData.searchInput;
//       navigate(`./search-result?search_query=${encodeURIComponent(queryData)}`);
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

// export default SearchBar;
