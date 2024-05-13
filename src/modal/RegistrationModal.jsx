import React, { useState, useCallback } from "react";
import Modal from "@mui/material/Modal";
import "../styles/registerModal.scss";
import Input from "../component/basic/Input";
import axios from "axios";
import { debounce } from "lodash"; // lodash에서 debounce를 임포트합니다
import Button from "../component/basic/Button";
import SelectComponent from "../component/basic/Select";
import CloseButton from "../component/basic/CloseButton";
const style = {};

function RegistrationModal({ open, handleClose }) {
  const [formData, setFormData] = useState({
    firstName: "",
    secondName: "",
    userNickName: "",
    password: "",
    checkPassword: "",
    email: "",
    authCode: "",
  });
  const [date, setDate] = useState({
    year: '',
    month: '',
    day: ''
  });
  // 년도 데이터 생성
  const years = Array.from({ length: 2024 - 1900 + 1 }, (v, i) => ({
    value: 1900 + i,
    label: `${1900 + i}년`
  }));

  // 월 데이터 생성
  const months = Array.from({ length: 12 }, (v, i) => ({
    value: i + 1,
    label: `${i + 1}월`
  }));

  // 일 데이터 생성
  const days = Array.from({ length: 31 }, (v, i) => ({
    value: i + 1,
    label: `${i + 1}일`
  }));

  const [modalStep, setModalStep] = useState(0);
  const [selectedCompany, setSelectedCompany] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [companys, setCompanys] = useState([]);
  const [companyEmail, setCompanyEmail] = useState("");



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
      // 전체 이메일 주소에서 '@' 기호 앞의 사용자 입력 부분만 추출
      const userEmailPart = value.split("@")[0];
      setFormData((prevState) => ({ ...prevState, [name]: userEmailPart }));
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
        console.log(response.data);
        setCompanyEmail(response.data.email);
        setSelectedCompany(companyName);
      })
      .catch((error) => {
        console.error("Error fetching company email:", error);
      });
  };

  const sendUserInfo = () => {
    const data = {
      "firstName": formData.firstName,
      "lastName": formData.secondName,
      "nickname": formData.userNickName,
      "password": formData.password,
      "email": formData.email,
      "position": "",
      "companyName": selectedCompany,
      "birth": date.year.toString()+'-'+date.month.toString().padStart(2,'0')+'-'+date.day.toString()
    }
    console.log(data)

  }
  let content;
  switch(modalStep){
    case 0: content = <div className="register-modal">
    <div className="header">
     
      <button className="close-button" onClick={handleClose}>
       <CloseButton/>
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
    <p>선택된 회사:{selectedCompany}</p>
    <Button text={"다음"} size={"Large"} onClick={() => {
      if (selectedCompany) {
        setModalStep(1);
        console.log(modalStep);
      } else {
        alert("회사를 선택해 주세요");
      }
    }} />
  </div>
  break;
    case 1:
     content =  <div className="register-modal">
        <div className="header">
          <button className="close-button" onClick={() => { setModalStep(true); }}><h1>←</h1></button>
          <button className="close-button" onClick={handleClose}>
          <CloseButton/>
          </button>
        </div>
        <h2 className="title">가입하기</h2>

        <div className="name-space">
          <Input size="Small" placeholder={"성"} onChange={handleInputChange} name={"firstName"} id="input-error"/>
          <Input size="Small" placeholder={"이름"} onChange={handleInputChange} name={"secondName"} />
        </div>
        <Input size="Large" placeholder={"아이디"} onChange={handleInputChange} name={"userNickName"} />
        <div className="password-space">
          <Input size="Small" placeholder={"비밀번호"} onChange={handleInputChange} name={"password"} />
          <Input size="Small" placeholder={"비밀번호 확인"} onChange={handleInputChange} name={"checkPassword"} />
        </div>
        <Input size="Large" placeholder={"이메일"} value={formData.email+"@" + companyEmail} onChange={handleInputChange} name={"email"} />
        <Input size="Large" placeholder={"인증번호"} onChange={handleInputChange} name={"authCode"} />
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
  break;
    case 2: content = <p>asdf</p>
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
