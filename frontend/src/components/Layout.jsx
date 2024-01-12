import React from 'react';
import styled from 'styled-components';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

const StyledOutletContainer = styled.div`
  background-color: white; /* 원하는 배경색으로 설정 */
  padding: 20px; /* 예시로 내용 주변에 간격을 주었습니다. 필요에 따라 조절하세요. */
`;

function Layout() {
  return (
    <>
      <Header />
      <StyledOutletContainer>
        <Outlet />
      </StyledOutletContainer>
      <Footer />
    </>
  );
}

export default Layout;
