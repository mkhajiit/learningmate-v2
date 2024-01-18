// 개선해야할사항
// 리팩토링
import { useCallback, useEffect, useState } from 'react';
import { Button, ButtonGroup, Container } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router';

import { useDispatch, useSelector } from 'react-redux';
import LectureCommentSection, {
  LectureDetailSection,
  LectureVideoSection,
} from '../../components/LecturePage/LectureDetailPage';
import { lectureAction, lectureDetailAction } from '../../store/lecture';
import coursesApi from '../../services/courses';

export default function LectureMainPageDetail() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const course_id = useParams().courseid;
  const userInfo = useSelector((state) => state.userInfo);
  const lectureDetail = useSelector((state) => state.lectureDetail);
  const [views, setViews] = useState(0);
  const [loading, setLoading] = useState(true);
  const lectureInfo = { views };

  const getLectureDetail = useCallback(async () => {
    try {
      const resp = await coursesApi.getCourse(course_id, userInfo.userId);
      // 삭제된 게시글에 url로 접근하려고하면 팅겨 내버립니다
      if (resp.data.status === 500) {
        navigate('../');
      } else {
        dispatch(
          lectureDetailAction.insert({
            title: resp.data.data[0].title,
            content: resp.data.data[0].content.split('\n').map((line) => {
              return `${line}\n`; // 줄 바꿈 문자를 추가하여 문자열로 변환
            }),
            userId: resp.data.data[0].user_id,
            registerNickname: resp.data.data[0].nickname,
            videoPath: resp.data.data[0].attach_file_path,
            category: resp.data.data[0].category,
            createdAt: resp.data.data[0].createdAt,
            registerProfile: resp.data.data[0].profile_name,
          }),
        );
        // 실제로는 통신할때 서버에서 1을 증가시키지만 가져오는 데이터는 게시글 조회전 조회수를 가져오기 때문에 게시글에 조회전 조회수가 나오고
        // 게시글에서 나올때 조회수가 1증가 하는것처럼 보이는데 떄문에 애초에 게시글에 들어가면 보이는 조회수를 프론트에서 1증가한 값으로 출력해준다
        if (userInfo.nickname !== resp.data.data[0].nickname) {
          setViews(resp.data.data[0].view_cnt + 1);
        } else {
          setViews(resp.data.data[0].view_cnt);
        }
      }
    } catch (error) {
      console.error('에러:', error);
    } finally {
      setLoading(false);
    }
  }, [course_id, navigate, userInfo.userId, userInfo.nickname, dispatch]);

  const onDelete = useCallback(async () => {
    try {
      await coursesApi.deleteCourse(course_id);
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
        <LectureVideoSection videoPath={lectureDetail.videoPath} />
        <LectureDetailSection lectureInfo={lectureInfo} />
        {userInfo.userId === lectureDetail.userId && (
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
