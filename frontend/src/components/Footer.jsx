import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => (
  <footer className='page-footer font-small blue pt-4 ' style={{ borderTop: '1px solid #ddd' }}>
    <div className='container-fluid text-center text-md-left'>
      <div className='row'>
        <div className='col-md-6 mt-md-0 mt-3'>
          <h5 className='text-uppercase'>러닝메이트</h5>
          <p>이곳에서 나만의 러닝메이트들을 찾아보세요</p>
        </div>

        <hr className='clearfix w-100 d-md-none pb-0' />

        <div className='col-md-3 mb-md-0 mb-3'>
          <h5 className='text-uppercase'>탐색</h5>
          <ul className='list-unstyled '>
            <li>
              <Link to='/meetcategory' className='no-underline'>
                모임
              </Link>
            </li>
            <li>
              <Link to='/courses' className='no-underline'>
                강의
              </Link>
            </li>
          </ul>
        </div>

        <div className='col-md-3 mb-md-0 mb-3'>
          <h5 className='text-uppercase'>러닝메이트</h5>
          <ul className='list-unstyled'>
            <li>
              <Link to='/about' className='no-underline'>
                정보
              </Link>
            </li>
            <li>
              <Link to='/about' className='no-underline'>
                개발자소개
              </Link>
            </li>
            <li>
              <Link to='/term-service' className='no-underline'>
                이용약관
              </Link>
            </li>
            <li>
              <Link to='/privacy-policy' className='no-underline'>
                개인정보처리방침
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <div className='footer-copyright text-center py-3'>
      © 2020 Copyright:
      <a href='https://mdbootstrap.com/'> MDBootstrap.com</a>
    </div>
  </footer>
);

export default Footer;
