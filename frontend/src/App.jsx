import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SignUpPage from './pages/SignupPage';
import SignInPage from './pages/SignInPage';
import Layout from './components/Layout';
import AboutPage from './pages/AboutPage';
import TestPage from './pages/TestPage';
import HomePage from './pages/HomePage';
import UserListPage from './pages/UserListPage';
import RegisterLecturePage from './pages/lectures/RegisterLecturePage';
import MeetList from './pages/meets/MeetList';
import MeetDetail from './pages/meets/MeetDetail';
import MeetInsert from './pages/meets/MeetInsert';
import MeetUpdate from './pages/meets/MeetUpdate';
// 나현
import Mypage from './pages/mypage/Mypage';
import MyInfo from './pages/mypage/MyInfo';
import MyReviews from './pages/mypage/MyReviews';
import LikeMeets from './pages/mypage/LikeMeets';
import LikeCourses from './pages/mypage/LikeCourses';
import WaitingMeets from './pages/mypage/WaitingMeets';
import MyMeets from './pages/mypage/MyMeets';
import MyCourses from './pages/mypage/MyCourses';
import Withdraw from './pages/mypage/Withdraw';
// 강의페이지
import CoursesSinglePage from './pages/lectures/CoursesSiglePage';
import UpdateLecturePage from './pages/lectures/UpdateLecturePage';
import LectureDetail from './pages/lectures/LectureDetail';
import SearchedLecturePage from './pages/lectures/back/SearchedLecturePage';
// 챗봇페이지
import ChatbotPage from './pages/chatbot/ChabotPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route path='/' element={<HomePage />} />
          <Route path='/sign-in' element={<SignInPage />} />
          <Route path='/sign-up' element={<SignUpPage />} />
          <Route path='/about' element={<AboutPage />} />
          <Route path='/test' element={<TestPage />} />
          <Route path='/user-list' element={<UserListPage />} />
          {/* 중첩할때 앞에 /붙이면 에러나므로 주의할것 ex)/register(x) register(o) */}
          <Route path='/courses'>
            {/* <Route index element={<Courses />} /> */}
            <Route index element={<CoursesSinglePage />} />
            <Route path='register' element={<RegisterLecturePage />} />
            <Route path='update/:courseid' element={<UpdateLecturePage />} />
            <Route path='detail/:courseid' element={<LectureDetail />} />
            <Route path='search-result' element={<SearchedLecturePage />} />
          </Route>
          <Route path='/meets' element={<MeetList />} />
          <Route path='/detail/:meetid' element={<MeetDetail />} />
          <Route path='/insert' element={<MeetInsert />} />
          <Route path='/update' element={<MeetUpdate />} />
          <Route path='/chatbot' element={<ChatbotPage />} />
        </Route>
        <Route>
          <Route path='/mypage' element={<Mypage />} />
          <Route path='/my-info' element={<MyInfo />} />
          <Route path='/my-reviews' element={<MyReviews />} />
          <Route path='/like-meets' element={<LikeMeets />} />
          <Route path='/like-courses' element={<LikeCourses />} />
          <Route path='/waiting-meets' element={<WaitingMeets />} />
          <Route path='/my-meets' element={<MyMeets />} />
          <Route path='/my-courses' element={<MyCourses />} />
          <Route path='/withdraw' element={<Withdraw />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
export default App;
