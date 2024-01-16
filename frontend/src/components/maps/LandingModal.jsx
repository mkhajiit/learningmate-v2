// 카카오맵으로 위치선택해서 위치정보를 얻는 화면을 띄우는 모달입니다
import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import SearchLocationSection from './SearchLocationSection';

function LandingModal() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    const handleModalEntered = () => {
      const map = document.getElementById('kakao-map');
      if (map) {
        // Map 컴포넌트가 있는 경우, 모달이 열릴 때 크기를 조절합니다.
        const modalBody = map.closest('.modal-body');
        const height = modalBody.clientHeight - 40; // 40은 Modal의 상하 여백
        window.kakao.maps.getMaps().forEach((m) => {
          m.relayout({ width: '100%', height: `${height}px` });
        });
      }
    };

    if (show) {
      // 모달이 열린 후에 실행되도록 useEffect를 사용합니다.
      handleModalEntered();
    }
  }, [show]);
  return (
    <>
      <Button variant='primary' onClick={handleShow}>
        위치검색
      </Button>

      <Modal show={show} onHide={handleClose} dialogClassName='modal-xl'>
        <Modal.Header closeButton>
          <Modal.Title>검색할 장소의 키워드를 입력하세요(가능한 상세한 주소를 입력하세요)</Modal.Title>
        </Modal.Header>
        <Modal.Body className='text-center'>
          <SearchLocationSection />
        </Modal.Body>
        <Modal.Footer>
          <Button variant='primary' onClick={handleClose}>
            제출
          </Button>
          <Button variant='secondary' onClick={handleClose}>
            닫기
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default LandingModal;
