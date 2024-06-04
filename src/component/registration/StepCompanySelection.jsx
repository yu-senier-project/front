import React from "react";
import Input from "../basic/Input";
import Button from "../basic/Button";
import CloseButton from "../basic/CloseButton";

function StepCompanySelection({
  handleCompanyName,
  companyName,
  companys,
  getCompanyEmail,
  selectedCompany,
  setModalStep,
  handleCloseWithReset,
}) {
  return (
    <div className="register-modal">
      <div className="header">
        <button className="close-button">
          <CloseButton onCloseButton={handleCloseWithReset} />
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
}

export default StepCompanySelection;
