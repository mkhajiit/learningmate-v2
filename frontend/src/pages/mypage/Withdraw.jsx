import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Sidebar from '../../components/Mypage/Sidebar';
import '../../components/Mypage/styles/Title.css';
import WithdrawPage from '../../components/Mypage/WithdrawPage';

function Withdraw() {
  return (
    <div>
      <Container fluid>
        <h2 className='title'>탈퇴하기</h2>
        <Row>
          <Col xs={2} id='sidebar'>
            <Sidebar />
          </Col>
          <Col xs={10} id='content'>
            <WithdrawPage />
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Withdraw;
