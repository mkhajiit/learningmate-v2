import React from 'react';
import { Nav } from 'react-bootstrap';
import './styles/Sidebar.css';

const Sidebar = () => {
  return (
    <Nav className='flex-column'>
      <Nav.Link href='/mypage' className='sidebar-link'>
        내 일정 조회하기
      </Nav.Link>
      <Nav.Link href='/my-info' className='sidebar-link'>
        내 정보 조회하기
      </Nav.Link>
      <Nav.Link href='/my-reviews' className='sidebar-link'>
        내 리뷰 모아보기
      </Nav.Link>
      <Nav.Link href='/like-meets' className='sidebar-link'>
        내 모임 모아보기
      </Nav.Link>
      <Nav.Link href='/like-courses' className='sidebar-link'>
        내 강의 모아보기
      </Nav.Link>
      <Nav.Link href='/waiting-meets' className='sidebar-link'>
        대기 중인 모임 보기
      </Nav.Link>
      <Nav.Link href='/my-meets' className='sidebar-link'>
        내가 만든 모임 보기
      </Nav.Link>
      <Nav.Link href='/my-courses' className='sidebar-link'>
        내가 올린 강의 보기
      </Nav.Link>
      <Nav.Link href='/withdraw' className='sidebar-link'>
        탈퇴하기
      </Nav.Link>
    </Nav>
  );
};

export default Sidebar;
