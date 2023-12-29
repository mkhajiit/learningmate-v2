import axios from "axios";
import { useCallback, useEffect, useRef, useState } from "react";
import { Button, ButtonGroup, Container } from "react-bootstrap";
import { serverDomain } from "../config/config.jsx";

function ImageUploader() {
    const [image, setImage] = useState(
        `${process.env.PUBLIC_URL}/img/Hani.jpg`
    );
    const [file, setFile] = useState("");
    const [imageUrl, setImageUrl] = useState("");

    const fn_read_imageUrl = useCallback(async () => {
        const resdata = await axios.get(`${serverDomain}/users/imagetest/41`);
        console.log(resdata);
        setImageUrl((current) => (current = resdata.data.data[0].profile_name));
    }, []);

    const fn_upload_image = useCallback((evt) => {
        const uploadfile = evt.target.files[0];
        setFile((current) => (current = uploadfile));
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
        const formdata = new FormData();
        formdata.append("image", file);
        await axios.post(`${serverDomain}/users/image/41`, formdata, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
    }, [file]);

    useEffect(() => {}, []);
    //useRef()훅을 이용하여 input을 inputRef에 저장한후 가져와서 사용합니다
    let inputRef = useRef();
    return (
        <>
            <Container className=" d-flex justify-content-center align-items-center flex-column">
                <img src={imageUrl} alt="Test_Img" width={200} height={200} />

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
                    name="image"
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
                    <Button
                        variant="success"
                        size="sm"
                        onClick={fn_read_imageUrl}
                    >
                        읽어오기 테스트
                    </Button>
                </ButtonGroup>
            </Container>
        </>
    );
}

export default ImageUploader;
