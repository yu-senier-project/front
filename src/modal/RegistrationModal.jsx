import React, { useState, useCallback } from "react";
import Modal from "@mui/material/Modal";
import "../styles/registerModal.scss";
import useTimer from "../hooks/useTimer";
import { useNavigate } from "react-router-dom";
import { debounce } from "lodash";
import StepCompanySelection from "../component/registration/StepCompanySelection";
import StepUserDetails from "../component/registration/StepUserDetails";
import StepAuthVerification from "../component/registration/StepAuthVerification";
// import "../apis/registerApis.js";

import axios from "axios";
import { BaseUrl } from "../util/BaseUrl.jsx";
import {
  checkAuthCode,
  sendAuthCode,
  getCompanyEmail,
} from "../apis/registerApis.js";

const initialFormData = {
  firstName: "",
  secondName: "",
  userNickName: "",
  password: "",
  checkPassword: "",
  email: "",
  authCode: "",
  position: "",
};

const initialDate = {
  year: "",
  month: "",
  day: "",
};

function RegistrationModal({ open, handleClose }) {
  const { minutes, seconds, isActive, toggle } = useTimer(5, 0); // 타이머 훅
  const navigate = useNavigate();
  const [formData, setFormData] = useState(initialFormData);
  const [date, setDate] = useState(initialDate);
  const [modalStep, setModalStep] = useState(0);
  const [selectedCompany, setSelectedCompany] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [companys, setCompanys] = useState([]);
  const [companyEmail, setCompanyEmail] = useState("");
  const [isSend, setIsSend] = useState(false);
  const [isDuplicate, setIsDuplicate] = useState(false);

  const years = Array.from({ length: 2024 - 1900 + 1 }, (v, i) => ({
    value: 2024 - i,
    label: `${2024 - i}년`,
  }));

  const months = Array.from({ length: 12 }, (v, i) => ({
    value: i + 1,
    label: `${i + 1}월`,
  }));

  const days = Array.from({ length: 31 }, (v, i) => ({
    value: i + 1,
    label: `${i + 1}일`,
  }));

  const resetForm = () => {
    setFormData(initialFormData);
    setDate(initialDate);
    setModalStep(0);
    setSelectedCompany("");
    setCompanyName("");
    setCompanys([]);
    setCompanyEmail("");
    setIsSend(false);
    setIsDuplicate(false);
  };

  const handleCloseWithReset = () => {
    resetForm();
    handleClose();
  };

  const handleCompanyName = useCallback(
    debounce((e) => {
      const value = e.target.value;
      setCompanyName(value);
      if (value.trim()) {
        axios
          .get(`${BaseUrl}/api/v1/company/search?keyword=${value}`)
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
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleDateChange = (type, value) => {
    setDate((prevState) => ({ ...prevState, [type]: value }));
  };

  const handleSendAuthCode = () => {
    sendAuthCode(formData, companyEmail, toggle)
      .then((response) => {
        if (response.statusCode === 200) {
          setIsSend(true);
        }
      })
      .catch((err) => {
        console.error("이메일 전송 실패:", err);
        alert("이메일 전송에 실패했습니다.");
      });
  };

  const sendUserInfo = () => {
    if (!isDuplicate) {
      alert("ID 중복확인을 진행해 주세요");
      return;
    }
    if (!isSend) {
      alert("이메일을 먼저 전송하세요.");
      return;
    }
    checkAuthCode(formData, isDuplicate, isSend, isActive, companyEmail)
      .then((response) => {
        if (response.statusCode === 200) {
          const data = {
            firstName: formData.firstName,
            lastName: formData.secondName,
            nickname: formData.userNickName,
            password: formData.password,
            email: `${formData.email}@${companyEmail}`,
            position: formData.position,
            companyName: selectedCompany,
            birth: `${date.year}-${String(date.month).padStart(
              2,
              "0"
            )}-${String(date.day).padStart(2, "0")}`,
          };
          console.log("@@:", data);
          axios
            .post(`${BaseUrl}/api/v1/auth/register`, data)
            .then((res) => {
              if (res.status === 200) {
                alert("회원가입 성공");
                handleCloseWithReset();
              } else {
                alert("회원가입 실패");
                handleCloseWithReset();
              }
            })
            .catch((err) => {
              console.error("회원가입 요청 실패:", err);
              alert("회원가입 요청에 실패했습니다.");
            });
          console.log(data);
        } else {
          alert("인증 실패");
        }
      })
      .catch((err) => {
        console.error("인증 요청 실패:", err);
        alert("인증 요청에 실패했습니다.");
      });
  };

  let content;
  switch (modalStep) {
    case 0:
      content = (
        <StepCompanySelection
          handleCompanyName={handleCompanyName}
          companyName={companyName}
          companys={companys}
          getCompanyEmail={(companyName) =>
            getCompanyEmail(companyName, setCompanyEmail, setSelectedCompany)
          }
          selectedCompany={selectedCompany}
          setModalStep={setModalStep}
          handleCloseWithReset={handleCloseWithReset}
        />
      );
      break;
    case 1:
      content = (
        <StepUserDetails
          handleInputChange={handleInputChange}
          formData={formData}
          setModalStep={setModalStep}
          handleCloseWithReset={handleCloseWithReset}
          handleDateChange={handleDateChange}
          date={date}
          years={years}
          months={months}
          days={days}
        />
      );
      break;
    case 2:
      content = (
        <StepAuthVerification
          handleInputChange={handleInputChange}
          formData={formData}
          companyEmail={companyEmail}
          sendAuthCode={handleSendAuthCode}
          isSend={isSend}
          isActive={isActive}
          minutes={minutes}
          seconds={seconds}
          sendUserInfo={sendUserInfo}
          setModalStep={setModalStep}
          setIsDuplicate={setIsDuplicate}
          handleCloseWithReset={handleCloseWithReset}
        />
      );
      break;
    default:
      break;
  }

  return (
    <Modal
      open={open}
      onClose={handleCloseWithReset}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      {content}
    </Modal>
  );
}

export default RegistrationModal;
