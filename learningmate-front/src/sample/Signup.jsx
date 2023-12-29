import React, { useCallback } from 'react'
import { useNavigate } from 'react-router-dom';

import axios from 'axios';
import { useForm } from 'react-hook-form';
import { useDaumPostcodePopup } from 'react-daum-postcode';
import { postcodeScriptUrl } from 'react-daum-postcode/lib/loadPostcode';

//react-hook-form 공부
function Signup() {
  const navigate = useNavigate();

  const { register, handleSubmit, setValue, formState: { errors } } = useForm({
    defaultValues: {},
    mode: 'onBlur'
  });

  const daum = useDaumPostcodePopup(postcodeScriptUrl);
  const handleComplete = (data) => {
    let address = '';
    let extraAddress = '';

    if (data.userSelectedType === 'R') address = data.roadAddress;
    else address = data.jibunAddress;

    if (data.userSelectedType === 'R') {
      if (data.bname !== '' && /[동|로|가]$/g.test(data.bname)) extraAddress += data.bname;
      // 건물명이 있고, 공동주택일 경우 추가한다.
      if (data.buildingName !== '' && data.apartment === 'Y') {
        extraAddress += (extraAddress !== '' ? ', ' + data.buildingName : data.buildingName);
      }
      // 표시할 참고항목이 있을 경우, 괄호까지 추가한 최종 문자열을 만든다.
      if (extraAddress !== '') extraAddress = ' (' + extraAddress + ')';

      /*
      document.getElementById('postcode').value = data.zonecode;
      document.getElementById("address").value = address;
      document.getElementById("addressExtra").value = extraAddress;
      */

      setValue('address.postcode', data.zonecode, { shouldValidate: true, shouldTouch: true, shouldDirty: true })
      setValue('address.main', address, { shouldValidate: true, shouldTouch: true, shouldDirty: true })
      setValue('address.extra', extraAddress, { shouldValidate: true, shouldTouch: true, shouldDirty: true });
      // 커서를 상세주소 필드로 이동한다.
      document.getElementById("addressDetail").focus();
    }
  }
  const getAddress = () => {
    daum({ onComplete: handleComplete })
  }

  const submitEvent = useCallback(async (data) => {
    console.log(data)
    try {
      const formData = new FormData();
      const files = document.querySelector('input[name="profile"]').files;
      formData.append('data', JSON.stringify(data))
      formData.append('profile', files[0])

      // eslint-disable-next-line no-unused-vars
      const resp = await axios({
        method: 'POST',
        url: 'http://localhost:8000/users/signup',
        headers: { "Content-type": "multipart/form-data" },
        data: formData
      })
      // console.log(resp);
      navigate('/login');
    } catch (error) {
      console.error(error)
    }
  }, [navigate]);
  const errorEvent = (error) => console.error(error)


  return (
    <main id="main">
      {/* ======= About Section ======= */}
      <section className="section-about">
        <div className="container">
          <form className="row" onSubmit={handleSubmit(submitEvent, errorEvent)}>

            <div className="col-sm-12 mb-3">
              <label htmlFor="email" className="form-label">
                이메일: <span style={{ color: 'orange' }}>{errors.email?.message}</span>
              </label>
              <input type="text" className="form-control" id="email" name="email" {...register('email', {
                required: { value: true, message: '이메일은 필수 입력 사항입니다' },
                pattern: { value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, message: '이메일 형식이 아닙니다' }
              })}
              />
            </div>

            <div className="col-sm-12 mb-3">
              <label htmlFor="password" className="form-label">
                패스워드: <span style={{ color: 'orange' }}>{errors.password?.message}</span>
              </label>
              <input type="password" className="form-control" id="password" {...register('password', {
                required: { value: true, message: '패스워드는 필수 입력 사항입니다' },
                pattern: { value: /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/, message: '영문, 숫자, 특수문자를 조합하여 8글자 이상 입력해 주세요' },
              })} />
            </div>
            <div className="col-sm-12 mb-3">
              <label htmlFor="name" className="form-label">
                이름: <span style={{ color: 'orange' }}>{errors.name?.message}</span>
              </label>
              <input type="text" className="form-control" id="name" {...register('name', {
                required: { value: true, message: '이름은 필수 입력 사항입니다' },
              })} />
            </div>

            <div className="col-sm-12 form-group mb-3">
              <div className="row">
                <label htmlFor="phone" className="form-label">전화번호: </label>
                <div className="col-sm">
                  <input type="text" className="form-control" id="phone" {...register('phone.one')} />
                </div>
                <div className="col-sm-5">
                  <input type="text" className="form-control" {...register('phone.two')} />
                </div>
                <div className="col-sm-5">
                  <input type="text" className="form-control" {...register('phone.three')} />
                </div>
              </div>
            </div>

            <div className="col-sm-12 form-group mb-3">
              <div className="row">
                <label htmlFor="address" className="form-label">
                  주소: <span style={{ color: 'orange' }}>{errors.address?.main?.message}</span>
                </label>
                <div className="col-sm-2 mb-1">
                  <input type="text" className="form-control" id="postcode" readOnly {...register('address.postcode')} />
                </div>
                <div className="col-sm-10 input-group mb-2">
                  <input type="text" className="form-control" id="address" readOnly {...register('address.main', {
                    required: { value: true, message: '주소는 필수 입력 사항입니다' },
                  })} />
                  <button type="button" className="btn btn-outline-secondary" onClick={getAddress}>주소찾기</button>
                </div>
                <div className="col-6">
                  <input type="text" className="form-control" id="addressDetail" {...register('address.detail')} placeholder="상세 주소를 입력해 주세요" />
                </div>
                <div className="col-6">
                  <input type="text" className="form-control" id="addressExtra" readOnly {...register('address.extra')} />
                </div>
              </div>
            </div>

            <div className="col-sm-12 mb-3">
              <label htmlFor="profile" className="form-label">프로파일 이미지</label>
              <input type="file" className="form-control" id="profile" name="profile" accept="image/*" {...register('profile')} />
            </div>
            <div className="col-sm-12">
              <button type="submit" className="btn btn-danger" style={{ paddingTop: '10px' }}>SEND</button>{' '}
              <button type="reset" className="btn btn-primary" style={{ paddingTop: '10px' }}>RESET</button>
            </div>
          </form>
        </div>
      </section>

    </main>
  )
}

export default Signup;

Signup.defaultProps = {
  sub: ''
};