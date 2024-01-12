// 개선해야할사항
// 댓글, state 리팩토링
import axios from 'axios';
import { useCallback, useEffect, useState } from 'react';
import { Button, ButtonGroup, Container } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { localDomain } from '../../config/config';
import LectureVideoSection from '../../components/LecturePage/LectureDetailPage/LectureVideoSection';
import LectureDetailSection from '../../components/LecturePage/LectureDetailPage/LectureDetailSection';
import LectureCommentSection from '../../components/LecturePage/LectureDetailPage/LectureCommentSection';
import { lectureAction } from '../../store/lecture';

export default function LectureDetail() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const course_id = useParams().courseid;
  const userInfo = useSelector((state) => state.userInfo);
  const [videoPath, setVideoPath] = useState('');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState();
  const [userNickname, setUserNickname] = useState('');
  const [views, setViews] = useState(0);
  const lectureInfo = { title, views, userNickname, content };

  const getLectureDetail = useCallback(async () => {
    try {
      const resp = await axios.get(`${localDomain}/courses/course/${course_id}`, {
        params: { userId: userInfo.userId },
      });
      // 삭제된 게시글에 url로 접근하려고하면 팅겨 내버립니다
      if (resp.data.status === 500) {
        navigate('../');
      } else {
        setVideoPath(resp.data.data[0].attach_file_path);
        setTitle(resp.data.data[0].title);
        setContent(resp.data.data[0].content);
        setUserId(resp.data.data[0].user_id);
        setUserNickname(resp.data.data[0].nickname);
        // 실제로는 통신할때 서버에서 1을 증가시키지만 가져오는 데이터는 게시글 조회전 조회수를 가져오기 때문에 게시글에 조회전 조회수가 나오고
        // 게시글에서 나올때 조회수가 1증가 하는것처럼 보이는데 떄문에 애초에 게시글에 들어가면 보이는 조회수를 프론트에서 1증가한 값으로 출력해준다
        setViews(resp.data.data[0].view_cnt + 1);
      }
    } catch (error) {
      console.error('Error fetching lecture detail:', error);
    } finally {
      setLoading(false);
    }
  }, [course_id, navigate, userInfo.userId]);

  const onDelete = useCallback(async () => {
    try {
      await axios.delete(`${localDomain}/courses/delete/${course_id}`);
      dispatch(lectureAction.delete({ courseId: course_id }));
      navigate('../');
    } catch (error) {
      console.log(error);
    }
  }, [course_id, navigate, dispatch]);
  useEffect(() => {
    getLectureDetail();
  }, [getLectureDetail]);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <Container style={{ width: '70%' }}>
        <LectureVideoSection videoPath={videoPath} />
        <LectureDetailSection lectureInfo={lectureInfo} />
        {userInfo.userId === userId && (
          <ButtonGroup>
            <Button variant='primary' onClick={() => navigate(`../update/${course_id}`)}>
              수정
            </Button>
            <Button variant='danger' onClick={onDelete}>
              삭제
            </Button>
          </ButtonGroup>
        )}
        <LectureCommentSection />
      </Container>
    </>
  );
}
