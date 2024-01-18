import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SignUpPage from './pages/SignupPage';
import SignInPage from './pages/SignInPage';
import Layout from './components/Layout';
import AboutPage from './pages/AboutPage';
import HomePage from './pages/HomePage';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage';
import TermsServicePage from './pages/TermsServicePage';
import MeetList from './pages/meets/MeetList';
import MeetCategory from './pages/meets/MeetCategory';
import MeetDetail from './pages/meets/MeetDetail';
import MeetInsert from './pages/meets/MeetInsert';
import MeetUpdate from './pages/meets/MeetUpdate';
// 나현
import Mypage from './pages/mypage/Mypage';
import MyInfo from './pages/mypage/MyInfo';
import MyReviews from './pages/mypage/MyReviews';
import LikeMeets from './pages/mypage/LikeMeets';
import LikeCourses from './pages/mypage/LikeCourses';
// import WaitingMeets from './pages/mypage/WaitingMeets';
import MyMeets from './pages/mypage/MyMeets';
import MyCourses from './pages/mypage/MyCourses';
import Withdraw from './pages/mypage/Withdraw';
// 강의페이지
import LectureMainPage, { LectureRegisterPage, LectureUpdatePage, LectureMainPageDetail } from './pages/lectures';
// 채팅방페이지
import ChatRoom from './pages/chatroom/index';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route path='/' element={<HomePage />} />
          <Route path='/sign-in' element={<SignInPage />} />
          <Route path='/sign-up' element={<SignUpPage />} />
          <Route path='/about' element={<AboutPage />} />
          <Route path='/privacy-policy' element={<PrivacyPolicyPage />} />
          <Route path='/term-service' element={<TermsServicePage />} />
          <Route path='/chat/chatRoom/:meetId/' element={<ChatRoom />} />
          <Route path='/chat/chatRoom/:meetId/channels/:channelId' element={<ChatRoom />} />
          {/* 중첩할때 앞에 /붙이면 에러나므로 주의할것 ex)/register(x) register(o) */}
          <Route path='/courses'>
            <Route index element={<LectureMainPage />} />
            <Route path='register' element={<LectureRegisterPage />} />
            <Route path='update/:courseid' element={<LectureUpdatePage />} />
            <Route path='detail/:courseid' element={<LectureMainPageDetail />} />
          </Route>
          <Route path='/meetcategory' element={<MeetCategory />} />
          <Route path='/meets' element={<MeetList />} />
          <Route path='/detail/:meetid' element={<MeetDetail />} />
          <Route path='/insert' element={<MeetInsert />} />
          <Route path='/update/:meetid' element={<MeetUpdate />} />
          <Route path='/mypage' element={<Mypage />} />
          <Route path='/my-info' element={<MyInfo />} />
          <Route path='/my-reviews' element={<MyReviews />} />
          <Route path='/like-meets' element={<LikeMeets />} />
          <Route path='/like-courses' element={<LikeCourses />} />
          {/* <Route path='/waiting-meets' element={<WaitingMeets />} /> */}
          <Route path='/my-meets' element={<MyMeets />} />
          <Route path='/my-courses' element={<MyCourses />} />
          <Route path='/withdraw' element={<Withdraw />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
export default App;
