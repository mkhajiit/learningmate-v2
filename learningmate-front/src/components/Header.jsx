import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { authAction } from "../store/auth";
import axios from "axios";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { Link } from "react-router-dom";
import { serverDomain } from "../config/config.jsx";

function Header() {
    const dispatch = useDispatch();
    const fn_logout_user = useCallback(async () => {
        await axios.get(`${serverDomain}/users/logout`, {
            withCredentials: true,
        });
        dispatch(authAction.logout());
        window.location.reload();
    }, [dispatch]);
    return (
        <>
            <Navbar className="bg-body-tertiary">
                <Container>
                    <Navbar.Brand href="/">
                        <img
                            alt=""
                            src={`${process.env.PUBLIC_URL}/러닝메이트로고.png`}
                            width="140"
                            height="30"
                            className="d-inline-block align-top"
                        />{" "}
                    </Navbar.Brand>
                    <Nav className="me-auto">
                        <Nav.Link as={Link} to="/">
                            Home
                        </Nav.Link>
                        <Nav.Link as={Link} to="/">
                            검색
                        </Nav.Link>
                        <Nav.Link as={Link} to="/">
                            강의
                        </Nav.Link>
                        <Nav.Link as={Link} to="/about">
                            About
                        </Nav.Link>
                        <Nav.Link as={Link} to="/signup">
                            회원가입
                        </Nav.Link>
                        <Nav.Link as={Link} to="/login">
                            로그인
                        </Nav.Link>
                    </Nav>
                    <button onClick={fn_logout_user}>로그아웃</button>
                </Container>
            </Navbar>
        </>
    );
}
export default Header;
