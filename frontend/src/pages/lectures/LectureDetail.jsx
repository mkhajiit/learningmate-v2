// 개선사항
// (1. 라우팅가드 해야하나?)
// 2. 댓글, 조회수 추가
import axios from 'axios';
import { useCallback, useEffect, useState } from 'react';
import { Button, ButtonGroup, Container } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router';
import { useSelector } from 'react-redux';
import { serverDomain } from '../../config/config';

export default function LectureDetail() {
  const navigate = useNavigate();
  const course_id = useParams().courseid;
  const userInfo = useSelector((state) => state.userInfo);
  const [videoPath, setVideoPath] = useState('');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState();
  const [userNickname, setUserNickname] = useState('');

  const getLectureDetail = useCallback(async () => {
    try {
      const resp = await axios.get(`${serverDomain}/courses/course/${course_id}`);
      // 삭제된 게시글에 url로 접근하려고하면 팅겨 내버립니다
      if (resp.data.status === 500) {
        navigate('../');
      } else {
        setVideoPath(resp.data.data[0].attach_file_path);
        setTitle(resp.data.data[0].title);
        setContent(resp.data.data[0].content);
        setUserId(resp.data.data[0].user_id);
        setUserNickname(resp.data.data[0].nickname);
      }
    } catch (error) {
      console.error('Error fetching lecture detail:', error);
    } finally {
      setLoading(false);
    }
  }, [course_id, navigate]);

  const onDelete = useCallback(async () => {
    try {
      await axios.delete(`${serverDomain}/courses/delete/${course_id}`);
      navigate('../');
    } catch (error) {
      console.log(error);
    }
  }, [course_id, navigate]);
  useEffect(() => {
    getLectureDetail();
  }, [getLectureDetail, course_id]);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <Container style={{ width: '50%' }}>
        <h1 className='display-1 text-center' style={{ marginTop: 50 }}>
          {title}
        </h1>
        <video controls style={{ width: '100%' }}>
          <source src={videoPath} type='video/mp4' />
        </video>
        <Container style={{ width: '100%' }}>
          <h3>작성자:{userNickname}</h3>
          <h2>{content}</h2>
        </Container>
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
      </Container>
    </>
  );
}
