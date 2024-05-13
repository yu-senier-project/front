import React, { useState, useCallback } from "react";
import Modal from "@mui/material/Modal";
import "../styles/registerModal.scss";
import Input from "../component/basic/Input";
import axios from "axios";
import { debounce } from "lodash"; // lodash에서 debounce를 임포트합니다
import Button from "../component/basic/Button";
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
  const [modalStep, setModalStep] = useState(true);
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
    setFormData((prevState) => ({ ...prevState, [name]: value }));
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

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
     {modalStep? <div className="register-modal">
        <div className="header">
          <h1>가입하기</h1>
          <button className="close-button" onClick={handleClose}>
            <h1>X</h1>
          </button>
        </div>
        <Input size="Big" name="companyName" onChange={handleCompanyName} />
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
        <Button text={"다음"} size={"Big"} onClick={() =>{
          if(selectedCompany){
            setModalStep(false);
            console.log(modalStep);
          }else{
            alert("회사를 선택해 주세요");
          }
        }} />
        </div>:
        
        <div className="register-modal">
        <div className="header">
          <button className="close-button" onClick={() =>{setModalStep(true);}}><h1>←</h1></button>
          <h1>가입하기</h1>
          <button className="close-button" onClick={handleClose}>
            <h1>X</h1>
          </button>
        </div>
       <div className="name-space">
        <Input size="Small"/>
        <Input size="Large"/>
        </div>
        
        


        <Button text={"다음"} size={"Big"} />
        </div>
      }
    </Modal>
  );
}

export default RegistrationModal;
