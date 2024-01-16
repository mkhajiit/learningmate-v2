import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import ChatbotIcon from './ChatbotIcon';
import ChatbotPage from './ChabotPage';

function ChatbotModal() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <>
      <ChatbotIcon onClick={handleShow} />
      <Modal show={show} onHide={handleClose} dialogClassName='modal-xl'>
        <Modal.Body className='text-center'>
          <ChatbotPage />
        </Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={handleClose}>
            닫기
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ChatbotModal;
