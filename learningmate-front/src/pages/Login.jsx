import axios from "axios";
import { useCallback, useState } from "react";
import { Form, Container, Row, Col, Button } from "react-bootstrap";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { authAction } from "../store/auth";
import { serverDomain } from "../config/config.jsx";
function Login() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [data, setData] = useState({ email: "", password: "" });
    const fn_change_data = useCallback((evt) => {
        setData((currentData) => ({
            ...currentData,
            [evt.target.name]: evt.target.value,
        }));
    }, []);
    const fn_submit_data = useCallback(
        async (evt) => {
            evt.preventDefault();
            // 클라이언트 측에서 서버로 요청을 보낼 때, withCredentials: true 옵션을 설정해야 합니다. 이 옵션은 서버로부터 쿠키를 받아와서 저장할 수 있도록 해줍니다.
            try {
                const result = await axios.post(
                    `${serverDomain}/users/login`,
                    data,
                    {
                        withCredentials: true,
                    }
                );
                console.log(result.data);
                if (result.data.status === 500) {
                    window.alert("잘못된 로그인 정보입니다");
                } else {
                    dispatch(authAction.login());
                    navigate("/test");
                }
            } catch (err) {
                console.log(err);
            }
        },
        [data, navigate, dispatch]
    );
    return (
        <Container
            fluid
            style={{ backgroundColor: "#95a5a6", height: "100vh" }}
        >
            <Row className="justify-content-md-center">
                <Col md={4}>
                    <h1
                        className="display-1 text-center"
                        style={{ marginTop: 100 }}
                    >
                        로그인
                    </h1>
                    <Form onSubmit={fn_submit_data}>
                        <Form.Group className="mb-3">
                            <Form.Control
                                id="email"
                                name="email"
                                type="email"
                                value={data.email}
                                onChange={fn_change_data}
                                required
                                placeholder="이메일"
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Control
                                id="password"
                                name="password"
                                type="password"
                                value={data.password}
                                onChange={fn_change_data}
                                required
                                placeholder="비밀번호"
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formGroupEmail">
                            <Button
                                variant="primary"
                                style={{ width: "100%" }}
                                type="submit"
                            >
                                등록
                            </Button>
                        </Form.Group>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
}

export default Login;
