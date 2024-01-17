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
      <Modal show={show} onHide={handleClose}>
        <Modal.Body className='text-center' style={{ backgroundColor: 'black' }}>
          <ChatbotPage />
          <Button
            className='mt-4'
            variant='secondary'
            onClick={handleClose}
            style={{ width: '70px', height: '70px', borderRadius: '30px' }}
          >
            <i className='bi bi-house' style={{ fontSize: '30px' }}></i>
          </Button>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default ChatbotModal;
