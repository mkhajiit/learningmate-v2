import axios from "axios";
import { useCallback, useRef, useState } from "react";
import { Button, ButtonGroup, Container } from "react-bootstrap";

function ImageUploader() {
    const [image, setImage] = useState(
        `${process.env.PUBLIC_URL}/img/Hani.jpg`
    );
    const fn_upload_image = useCallback((evt) => {
        const uploadfile = evt.target.files[0];
        const fileReader = new FileReader();
        fileReader.readAsDataURL(uploadfile);
        //이벤트 핸들러로 동작하는 매서드
        fileReader.onload = () => {
            setImage(fileReader.result);
        };
    }, []);

    const fn_delete_image = useCallback(() => {
        setImage(`${process.env.PUBLIC_URL}/img/Hani.jpg`);
    }, []);

    const fn_register_image = useCallback(async () => {
        await axios.post("http://localhost:8000/users/image/42", image);
    }, [image]);

    //useRef()훅을 이용하여 input을 inputRef에 저장한후 가져와서 사용합니다
    let inputRef = useRef();
    return (
        <>
            <Container className=" d-flex justify-content-center align-items-center flex-column">
                <h1>ImageUploader</h1>
                <img
                    src={image}
                    width="300"
                    height="300"
                    img="img"
                    alt="uploadImage"
                />
                <br />
                <input
                    type="file"
                    id="imgInput"
                    accept="image/*"
                    onChange={fn_upload_image}
                    onClick={(evt) => (evt.target.value = null)}
                    ref={inputRef}
                    style={{ display: "none" }}
                ></input>
                {/* inputRef.current.click() input의 onClick이벤트가 실행되는게 아니라 input버튼을 사용자가 누른것처럼 됨 */}
                <ButtonGroup>
                    <Button
                        variant="primary"
                        size="sm"
                        onClick={() => inputRef.current.click()}
                    >
                        사진선택
                    </Button>
                    <Button
                        variant="danger"
                        size="sm"
                        onClick={fn_delete_image}
                    >
                        삭제
                    </Button>
                    <Button
                        variant="success"
                        size="sm"
                        onClick={fn_register_image}
                    >
                        등록
                    </Button>
                </ButtonGroup>
            </Container>
        </>
    );
}

export default ImageUploader;
