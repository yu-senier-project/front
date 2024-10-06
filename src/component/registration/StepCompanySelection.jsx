import React, { useState } from "react";
import Input from "../basic/Input";
import Button from "../basic/Button";
import CloseButton from "../basic/CloseButton";

function StepCompanySelection({
  handleCompanyName,
  companyName,
  companys,
  getCompanyEmail,
  setModalStep,
  handleCloseWithReset,
}) {
  const [selectedCompanyName, setSelectedCompanyName] = useState("");

  const handleCompanyClick = (companyName) => {
    setSelectedCompanyName(companyName);
    getCompanyEmail(companyName);
  };

  return (
    <div className="register_modal">
      <div className="register_modal__header">
        <button>
          <CloseButton onCloseButton={handleCloseWithReset} />
        </button>
        <p className="title">가입하기</p>
      </div>

      <div className="register_modal__section">
        <div className="register_section__form">
          <Input
            size="Large"
            name="companyName"
            onChange={handleCompanyName}
            autocomplete={"off"}
            placeholder={"회사 검색(무직인 경우 '없음' 입력)"}
          />
          <div className="register_section__result">
            {companys.length > 0 ? (
              <ul>
                {companys.map((company, index) => (
                  <li key={index}>
                    {company.name}
                    <button
                      onClick={() => handleCompanyClick(company.name)}
                      style={{
                        backgroundColor:
                          selectedCompanyName === company.name
                            ? "#60aeb3"
                            : "#71c9ce",
                        color:
                          selectedCompanyName === company.name
                            ? "black"
                            : "white",
                      }}
                    >
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
        </div>
      </div>

      <div className="register_modal__footer">
        <Button
          text={"다음"}
          size={"Large"}
          onClick={() => {
            if (selectedCompanyName) {
              setModalStep(1);
            } else {
              alert("회사를 선택해 주세요");
            }
          }}
        />
      </div>
    </div>
  );
}

export default StepCompanySelection;
