import { Container } from 'react-bootstrap';
import './styles.css';
import { useForm } from 'react-hook-form';
import { useCallback } from 'react';

function ChatbotPage() {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({ mode: 'onChange' });

  const submitEvent = useCallback(
    async (submitData) => {
      try {
        console.log(submitData);
        setValue('userInput', '');
      } catch (error) {
        console.log(error);
      }
    },
    [setValue],
  );
  return (
    <Container className='chatbot-body-style'>
      <div id='chat-container'>
        <div id='chat-messages'></div>
        <form id='user-input' onSubmit={handleSubmit(submitEvent)}>
          <input type='text' placeholder='메시지를 입력하세요...' {...register('userInput', { required: true })} />
          <button type='submit'>전송</button>
          <div id='user-input-error-messages' style={{ height: '12px' }}>
            {errors.userInput && '질문을 입력하세요'}
          </div>
        </form>
      </div>
    </Container>
  );
}

export default ChatbotPage;
