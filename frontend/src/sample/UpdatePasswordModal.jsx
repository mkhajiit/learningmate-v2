import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { useForm } from "react-hook-form";

function UpdatePasswordModal(props) {
  const { show, handleClose } = props;

  const { register, handleSubmit, setValue, getValues, formState: { errors } } = useForm({
    defaultValues: {
      current: '',
    }
  });

  const onSubmit = (data) => {
    console.log(data);
  };
  const closeEvent = () => {
    setValue('current', '', { shouldValidate: false, shouldTouch: false, shouldDirty: false });
    setValue('password', '', { shouldValidate: false, shouldTouch: false, shouldDirty: false });
    setValue('confirm', '', { shouldValidate: false, shouldTouch: false, shouldDirty: false });
    handleClose();
  }

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Modal heading</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Form.Group className="mb-3" controlId="current">
            <Form.Label>패스워드</Form.Label>
            <Form.Control type="password" {...register("current", {
              required: { value: true, message: '변경전 비밀번호를 입력해주세요' },
            })}
            />
            {errors.current && <p className="errorMsg">{errors.current.message}</p>}
          </Form.Group>

          <Form.Group className="mb-3" controlId="password">
            <Form.Label>새로운 패스워드</Form.Label>
            <Form.Control type="password" {...register("password", {
              required: { value: true, message: '새로운 비밀번호를 입력해주세요' },
              pattern: { value: /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/, message: '영문, 숫자, 특수문자를 조합하여 8글자 이상 입력해 주세요' },
            })}
            />
            {errors.password && <p className="errorMsg">{errors.password.message}</p>}
          </Form.Group>
          <Form.Group className="mb-3" controlId="confirm">
            <Form.Label>패스워드 확인</Form.Label>
            <Form.Control type="password" {...register("confirm", {
              validate: {
                compare: (data) => (getValues().password === data) ? true : false,
              }
            })}
            />
            {errors.confirm && <p className="errorMsg">{errors.confirm.message}</p>}
          </Form.Group>

          <hr />

          <Button variant="outline-secondary" type="submit">Submit</Button>{' '}
          <Button variant="outline-secondary" onClick={closeEvent}>Close</Button>
        </form>
      </Modal.Body>
    </Modal>
  );
}

export default UpdatePasswordModal;