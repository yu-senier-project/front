import React from "react";
import Input from "../basic/Input";
import Button from "../basic/Button";
import SelectComponent from "../basic/Select";
import CloseButton from "../basic/CloseButton";
import axios from "axios";
import { useState } from "react";
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
  handleDateChange,
  sendUserInfo,
  date,
  years,
  months,
  days,
  setModalStep,
  setIsDuplicate,
  handleCloseWithReset,
}) {
  const [isDuplicate, setIsDuplicateLocal] = useState(false);

  const handleDuplicateCheck = () => {
    axios
      .get(
        `http://43.203.69.159/api/v1/auth/register/check/${formData.userNickName}`
      )
      .then((res) => {
        if (res.data.isExist === false) {
          alert("사용가능한 아이디입니다");
          setIsDuplicateLocal(true);
          setIsDuplicate(true); // Set parent state as well
        } else {
          alert("중복된 아이디입니다");
          setIsDuplicateLocal(false);
          setIsDuplicate(false); // Set parent state as well
        }
      });
  };

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
          value={`${formData.userNickName}`}
          name={"userNickName"}
        />
        <button className="duplication_button" onClick={handleDuplicateCheck}>
          중복확인
        </button>
      </div>
      <div className="password-space">
        <Input
          size="Small"
          placeholder={"비밀번호"}
          onChange={handleInputChange}
          name={"password"}
          value={formData.password}
        />
        <Input
          size="Small"
          placeholder={"비밀번호 확인"}
          onChange={handleInputChange}
          name={"checkPassword"}
          value={formData.checkPassword}
        />
      </div>
      <div className="auth_container">
        <div className="email_input">
          <Input
            placeholder={"이메일"}
            size={"Large"}
            name={"email"}
            value={formData.email}
            onChange={handleInputChange}
          />
          {"@" + companyEmail}
          <button
            className="auth_button"
            onClick={sendAuthCode}
            disabled={isSend}
          >
            인증
          </button>
        </div>
        <div className="authcode_input">
          <Input
            placeholder={"인증번호"}
            size={"Large"}
            name={"authCode"}
            value={formData.authCode}
            onChange={handleInputChange}
            disabled={!isSend}
          />

          {isActive ? (
            <span className="auth_time">{`${minutes}:${
              seconds < 10 ? `0${seconds}` : seconds
            }`}</span>
          ) : (
            <></>
          )}
        </div>
      </div>
      <div className="birthday-selecter">
        <h3 className="birthday">생년월일</h3>
        <SelectComponent
          id="year-select"
          placeholder="년도 선택"
          onChange={(value) => handleDateChange("year", value)}
          data={years}
        />
        <SelectComponent
          id="month-select"
          placeholder="월 선택"
          onChange={(value) => handleDateChange("month", value)}
          data={months}
        />
        <SelectComponent
          id="day-select"
          placeholder="일 선택"
          onChange={(value) => handleDateChange("day", value)}
          data={days}
        />
      </div>
      <Button text={"다음"} size={"Large"} onClick={sendUserInfo} />
    </div>
  );
}

export default StepAuthVerification;
