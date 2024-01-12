import { useSelector } from 'react-redux';
import { Navbar } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import LogoutFunction from '../../containers/Header/LogoutFunction';

function Header() {
  const logoutUser = LogoutFunction();
  const navigate = useNavigate();
  const auth = useSelector((state) => state.auth.isAuth);
  const handleLoginClick = () => {
    navigate('/sign-in');
  };
  return (
    <nav className='navbar navbar-expand-lg bg-body-tertiary'>
      <div className='container-fluid'>
        <Navbar.Brand href='/'>
          <img
            alt=''
            src={`${process.env.PUBLIC_URL}/러닝메이트로고.png`}
            width='140'
            height='30'
            className='d-inline-block align-top'
          />{' '}
        </Navbar.Brand>
        <button
          className='navbar-toggler'
          type='button'
          data-bs-toggle='collapse'
          data-bs-target='#navbarColor04'
          aria-controls='navbarColor04'
          aria-expanded='false'
          aria-label='Toggle navigation'
        >
          <span className='navbar-toggler-icon'></span>
        </button>
        <div className='collapse navbar-collapse' id='navbarColor04'>
          <ul className='navbar-nav me-auto'>
            <li className='nav-item'>
              <Link className='nav-link active' to='/'>
                Home
                <span className='visually-hidden'>(current)</span>
              </Link>
            </li>
            <li className='nav-item'>
              <Link className='nav-link' to='/'>
                검색
                <span className='visually-hidden'>(current)</span>
              </Link>
            </li>
            <li className='nav-item'>
              <Link className='nav-link' to='/meets'>
                모임
                <span className='visually-hidden'>(current)</span>
              </Link>
            </li>
            <li className='nav-item'>
              <Link className='nav-link' to='/courses'>
                강의
                <span className='visually-hidden'>(current)</span>
              </Link>
            </li>
            <li className='nav-item'>
              <Link className='nav-link' to='/mypage'>
                마이페이지
                <span className='visually-hidden'>(current)</span>
              </Link>
            </li>
          </ul>
          <form className='d-flex'>
            {!auth ? (
              <button className='btn btn-secondary my-2 my-sm-0' type='button' onClick={handleLoginClick}>
                로그인
                <span className='visually-hidden'>(current)</span>
              </button>
            ) : (
              <button className='btn btn-secondary my-2 my-sm-0' type='button' onClick={logoutUser}>
                로그아웃
              </button>
            )}
          </form>
        </div>
      </div>
    </nav>
  );
}

export default Header;
