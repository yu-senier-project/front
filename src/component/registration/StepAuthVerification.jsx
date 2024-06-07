import React, { useState } from "react";
import Input from "../basic/Input";
import Button from "../basic/Button";
import CloseButton from "../basic/CloseButton";
import axios from "axios";
import "../../styles/find/find.scss";

function StepAuthVerification({
  handleInputChange,
  formData,
  companyEmail,
  sendAuthCode,
  isSend,
  isActive,
  minutes,
  seconds,
  sendUserInfo,
  setModalStep,
  setIsDuplicate,
  handleCloseWithReset,
}) {
  const [isDuplicate, setIsDuplicateLocal] = useState(false);
  const [errors, setErrors] = useState({});

  const handleDuplicateCheck = () => {
    axios
      .get(
        `http://43.203.69.159/api/v1/auth/register/check/${formData.userNickName}`
      )
      .then((res) => {
        if (res.data.isExist === false) {
          alert("사용가능한 아이디입니다");
          setIsDuplicateLocal(true);
          setIsDuplicate(true);
        } else {
          alert("중복된 아이디입니다");
          setIsDuplicateLocal(false);
          setIsDuplicate(false);
        }
      });
  };

  const handleNextClick = () => {
    const newErrors = {};

    if (!formData.userNickName) {
      newErrors.userNickName = "아이디를 입력해주세요";
    }
    if (!formData.password) {
      newErrors.password = "비밀번호를 입력해주세요";
    }
    if (!formData.checkPassword) {
      newErrors.checkPassword = "비밀번호 확인을 입력해주세요";
    }
    if (!formData.email) {
      newErrors.email = "이메일을 입력해주세요";
    }
    if (!formData.authCode) {
      newErrors.authCode = "인증번호를 입력해주세요";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    sendUserInfo();
  };

  const firstErrorField = Object.keys(errors)[0];

  return (
    <div className="register-modal">
      <div className="header">
        <button
          className="close-button"
          onClick={() => {
            setModalStep(1);
          }}
        >
          <h1>←</h1>
        </button>
        <button className="close-button">
          <CloseButton onCloseButton={handleCloseWithReset} />
        </button>
      </div>
      <h2 className="title">가입하기</h2>
      <div className="id-space">
        <Input
          size="Large"
          placeholder={"아이디"}
          onChange={handleInputChange}
          value={formData.userNickName}
          name={"userNickName"}
          autocomplete={'off'}

        />
        <button className="duplication_button" onClick={handleDuplicateCheck}>
          중복확인
        </button>
        {firstErrorField === "userNickName" && (
          <div className="error-message" style={{ color: 'red', marginTop: '5px' }}>
            *{errors.userNickName}
          </div>
        )}
      </div>
      <div className="password-space">
        <Input
          size="Large"
          placeholder={"비밀번호"}
          onChange={handleInputChange}
          name={"password"}
          value={formData.password}
          type="password" 
          autocomplete={'off'}

        />
        {firstErrorField === "password" && (
          <div className="error-message" style={{ color: 'red', marginTop: '5px' }}>
            *{errors.password}
          </div>
        )}
        <Input
          size="Large"
          placeholder={"비밀번호 확인"}
          onChange={handleInputChange}
          name={"checkPassword"}
          value={formData.checkPassword}
          type="password"
          autocomplete={'off'}

        />
        {firstErrorField === "checkPassword" && (
          <div className="error-message" style={{ color: 'red', marginTop: '5px' }}>
            *{errors.checkPassword}
          </div>
        )}
      </div>
      <div className="auth_container">
        <div className="email_input">
          <Input
            placeholder={"이메일"}
            size={"Large"}
            name={"email"}
            value={formData.email}
            onChange={handleInputChange}
          autocomplete={'off'}

          />
         {companyEmail?"@" + companyEmail:""}
          <button
            className="auth_button"
            onClick={sendAuthCode}
            disabled={isActive}
          >
            인증
          </button>
        </div>
        {firstErrorField === "email" && (
          <div className="error-message" style={{ color: 'red', marginTop: '5px' }}>
            *{errors.email}
          </div>
        )}
        <div className="authcode_input">
          <Input
            placeholder={"인증번호"}
            size={"Large"}
            name={"authCode"}
            value={formData.authCode}
            onChange={handleInputChange}
            disabled={!isActive}
          autocomplete={'off'}

          />
          {isActive ? (
            <span className="auth_time">{`${minutes}:${
              seconds < 10 ? `0${seconds}` : seconds
            }`}</span>
          ) : (
            <></>
          )}
        </div>
        {firstErrorField === "authCode" && (
          <div className="error-message" style={{ color: 'red', marginTop: '5px' }}>
            *{errors.authCode}
          </div>
        )}
      </div>
      <div className="next_button">
        <Button text={"다음"} size={"Large"} onClick={handleNextClick} />
      </div>
    </div>
  );
}

export default StepAuthVerification;
