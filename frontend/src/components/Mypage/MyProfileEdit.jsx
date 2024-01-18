import React, { useState } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function MyProfileEdit({ initialData, onSave, onCancel }) {
  const [editedData, setEditedData] = useState(initialData);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSave = () => {
    navigate('/my-info');
    onSave(editedData);
  };

  const handleCancel = () => {
    // 취소 버튼 클릭 시 '내 정보 조회하기' 페이지로 이동
    navigate('/my-info');
    onCancel();
  };

  return (
    <Container>
      <Row className='justify-content-md-center'>
        <Col xs={12} md={8} lg={6}>
          <div className='edit-form-container'>
            <h3 className='subtitle'>수정하기</h3>
            <Form>
              <Form.Group controlId='formNickname'>
                <Form.Label className='info-label'>닉네임</Form.Label>
                <Form.Control type='text' name='nickname' value={editedData.nickname} onChange={handleChange} />
              </Form.Group>
              <Form.Group controlId='formPhoneNumber'>
                <Form.Label className='info-label'>전화번호</Form.Label>
                <Form.Control type='tel' name='phone_number' value={editedData.phone_number} onChange={handleChange} />
              </Form.Group>
              <Form.Group controlId='formEmail'>
                <Form.Label className='info-label'>이메일</Form.Label>
                <Form.Control type='email' name='email' value={editedData.email} onChange={handleChange} />
              </Form.Group>
              <div className='button-group'>
                <Button variant='primary' onClick={handleSave}>
                  저장
                </Button>
                <Button variant='secondary' onClick={handleCancel}>
                  취소
                </Button>
              </div>
            </Form>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default MyProfileEdit;
