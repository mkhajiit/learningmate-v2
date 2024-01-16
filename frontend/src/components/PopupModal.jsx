import { CloseButton, Container } from 'react-bootstrap';
import Modal from 'react-modal';

function PopupModal({ modalIsOpen, closeModal, text, image }) {
  return (
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      contentLabel='Pop up Message'
      ariaHideApp={false}
      style={{
        overlay: {
          backgroundColor: ' rgba(0, 0, 0, 0.4)',
          width: '100%',
          height: '100vh',
          zIndex: '10',
          position: 'fixed',
          top: '0',
          left: '0',
        },
        content: {
          width: '360px',
          height: '360px',
          zIndex: '150',
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          borderRadius: '10px',
          boxShadow: '2px 2px 2px rgba(0, 0, 0, 0.25)',
          backgroundColor: 'white',
          justifyContent: 'center',
          overflow: 'auto',
        },
      }}
    >
      <Container
        className='mt-4'
        style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}
      >
        <div data-bs-theme='dark'>
          <CloseButton style={{ position: 'absolute', top: '10px', right: '10px' }} onClick={closeModal} />
        </div>
        <img src={image} alt='img' style={{ width: '200px', height: '200px' }} />
        <div>{text}</div>
      </Container>
    </Modal>
  );
}

export default PopupModal;
