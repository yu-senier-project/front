import React, { useState, useCallback } from "react";
import Modal from "@mui/material/Modal";
import "../styles/registerModal.scss";
import Input from "../component/basic/Input";
import axios from "axios";
import { debounce } from "lodash"; // lodash에서 debounce를 임포트합니다
import Button from "../component/basic/Button";
import SelectComponent from "../component/basic/Select";
import CloseButton from "../component/basic/CloseButton";
import useTimer from "../hooks/useTimer";
import useFindStore from "../store/find/useFindStore";

function RegistrationModal({ open, handleClose }) {
  const { minutes, seconds, isActive, toggle } = useTimer(5, 0); // 타이머 훅
  const [formData, setFormData] = useState({
    firstName: "",
    secondName: "",
    userNickName: "",
    password: "",
    checkPassword: "",
    email: "",
    authCode: "",
    position: "",
  });
  const [date, setDate] = useState({
    year: "",
    month: "",
    day: "",
  });
  const years = Array.from({ length: 2024 - 1900 + 1 }, (v, i) => ({
    value: 1900 + i,
    label: `${1900 + i}년`,
  }));

  const months = Array.from({ length: 12 }, (v, i) => ({
    value: i + 1,
    label: `${i + 1}월`,
  }));

  const days = Array.from({ length: 31 }, (v, i) => ({
    value: i + 1,
    label: `${i + 1}일`,
  }));

  const [modalStep, setModalStep] = useState(0);
  const [selectedCompany, setSelectedCompany] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [companys, setCompanys] = useState([]);
  const [companyEmail, setCompanyEmail] = useState("");
  const [isSend, setIsSend] = useState(false);

  const checkAuthCode = async () => {
    if (!isSend) {
      alert("이메일을 먼저 전송하세요.");
      return;
    }
    const data = {
      email: formData.email,
      authCode: formData.authCode,
    };
    console.log(data);
    if (isActive) {
      try {
        const res = await axios.post(
          BaseUrl + `/api/v1/email-auth/confirm`,
          data
        );
        if (res.status === 200) {
          await setCheckId(data.email);
          navigate("/CheckId");
        } else {
          alert("유효하지 않은 인증번호");
        }
      } catch (err) {
        console.error("Error in checking auth code:", err);
        alert("인증번호 확인에 실패했습니다.");
      }
    } else {
      alert("인증시간이 만료되었습니다.");
    }
  };

  const sendAuthCode = () => {
    if (formData.email === "") {
      alert("이메일을 작성해주세요");
      return;
    }
    toggle();
    axios
      .get(BaseUrl + "/api/v1/email-auth/request/" + formData.email)
      .then((res) => {
        console.log(res);
        setIsSend(true);
      })
      .catch((err) => {
        console.error("Error in sending email:", err);
        alert("이메일 전송에 실패했습니다.");
      });
  };

  const handleCompanyName = useCallback(
    debounce((e) => {
      const value = e.target.value;
      setCompanyName(value);
      if (value.trim()) {
        axios
          .get(
            `http://13.51.99.142:8080/api/v1/company/search?keyword=${value}`
          )
          .then((response) => {
            setCompanys(response.data);
          })
          .catch((error) => {
            console.error("Error fetching companies:", error);
          });
      } else {
        setCompanys([]);
      }
    }, 300),
    []
  );

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    if (name === "email") {
      setFormData((prevState) => ({ ...prevState, [name]: value }));
    } else {
      setFormData((prevState) => ({ ...prevState, [name]: value }));
    }
  };

  const handleDateChange = (type, value) => {
    setDate((prevState) => ({ ...prevState, [type]: value }));
  };

  const getCompanyEmail = (companyName) => {
    axios
      .get(`http://13.51.99.142:8080/api/v1/company/${companyName}/email`)
      .then((response) => {
        setCompanyEmail(response.data.email);
        setSelectedCompany(companyName);
      })
      .catch((error) => {
        console.error("Error fetching company email:", error);
      });
  };

  const sendUserInfo = () => {
    const data = {
      firstName: formData.firstName,
      lastName: formData.secondName,
      nickname: formData.userNickName,
      password: formData.password,
      email: `${formData.email}@${companyEmail}`,
      position: formData.position,
      companyName: selectedCompany,
      birth: `${date.year}-${String(date.month).padStart(2, "0")}-${String(
        date.day
      ).padStart(2, "0")}`,
    };
    console.log(data);
  };

  let content;
  switch (modalStep) {
    case 0:
      content = (
        <div className="register-modal">
          <div className="header">
            <button className="close-button" onClick={handleClose}>
              <CloseButton />
            </button>
          </div>
          <h2 className="title">가입하기</h2>
          <Input size="Large" name="companyName" onChange={handleCompanyName} />
          <div className="company-list">
            {companys.length > 0 ? (
              <ul>
                {companys.map((company, index) => (
                  <li key={index}>
                    {company.name}
                    <button onClick={() => getCompanyEmail(company.name)}>
                      선택
                    </button>
                  </li>
                ))}
              </ul>
            ) : companyName.length > 0 ? (
              <p>검색 결과가 없습니다.</p>
            ) : (
              <></>
            )}
          </div>
          <p>선택된 회사: {selectedCompany}</p>
          <Button
            text={"다음"}
            size={"Large"}
            onClick={() => {
              if (selectedCompany) {
                setModalStep(1);
              } else {
                alert("회사를 선택해 주세요");
              }
            }}
          />
        </div>
      );
      break;
    case 1:
      content = (
        <div className="register-modal">
          <div className="header">
            <button
              className="close-button"
              onClick={() => {
                setModalStep(modalStep - 1);
              }}
            >
              <h1>←</h1>
            </button>
            <button className="close-button" onClick={handleClose}>
              <CloseButton />
            </button>
          </div>
          <h2 className="title">가입하기</h2>
          <div style={{ height: "10vh" }}></div>
          <div className="name-space">
            <Input
              size="Small"
              placeholder={"성"}
              onChange={handleInputChange}
              name={"firstName"}
              id="input-error"
            />
            <Input
              size="Small"
              placeholder={"이름"}
              onChange={handleInputChange}
              name={"secondName"}
            />
          </div>
          <Input
            size="Large"
            placeholder={"직무"}
            onChange={handleInputChange}
            name={"position"}
          />
          <div style={{ height: "30vh" }}></div>
          <Button
            text={"다음"}
            size={"Large"}
            onClick={() => {
              setModalStep(2);
            }}
          />
        </div>
      );
      break;
    case 2:
      content = (
        <div className="register-modal">
          <div className="header">
            <button
              className="close-button"
              onClick={() => {
                setModalStep(modalStep - 1);
              }}
            >
              <h1>←</h1>
            </button>
            <button className="close-button" onClick={handleClose}>
              <CloseButton />
            </button>
          </div>
          <h2 className="title">가입하기</h2>

          <Input
            size="Large"
            placeholder={"아이디"}
            onChange={handleInputChange}
            value={`${formData.userNickName}`}
            name={"userNickName"}
          />
          <div className="password-space">
            <Input
              size="Small"
              placeholder={"비밀번호"}
              onChange={handleInputChange}
              name={"password"}
            />
            <Input
              size="Small"
              placeholder={"비밀번호 확인"}
              onChange={handleInputChange}
              name={"checkPassword"}
            />
          </div>
          <div className="auth_container">
            <div className="email_input">
              <Input
                placeholder={"이메일"}
                size={"Small"}
                name={"email"}
                value={formData.email}
                onChange={handleInputChange}
              />
              <b className="company_email">{"@" + companyEmail}</b>
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
                size={"Small"}
                name={"authCode"}
                value={formData.authCode}
                onChange={handleInputChange}
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
      break;
    default:
  }

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      {content}
    </Modal>
  );
}

export default RegistrationModal;
