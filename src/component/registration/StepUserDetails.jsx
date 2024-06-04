import React from "react";
import Input from "../basic/Input";
import Button from "../basic/Button";
import CloseButton from "../basic/CloseButton";

function StepUserDetails({
  handleInputChange,
  formData,
  setModalStep,
  handleCloseWithReset,
}) {
  return (
    <div className="register-modal">
      <div className="header">
        <button
          className="close-button"
          onClick={() => {
            setModalStep(0);
          }}
        >
          <h1>←</h1>
        </button>
        <button className="close-button">
          <CloseButton onCloseButton={handleCloseWithReset} />
        </button>
      </div>
      <h2 className="title">가입하기</h2>
      <div style={{ height: "10vh" }}></div>
      <div className="name-space">
        <Input
          size="Large"
          placeholder={"성"}
          onChange={handleInputChange}
          name={"firstName"}
          id="input-error"
        />
        <Input
          size="Large"
          placeholder={"이름"}
          onChange={handleInputChange}
          name={"secondName"}
        />
      </div>
      <div className="position-space">
        <Input
          size="Large"
          placeholder={"직무"}
          onChange={handleInputChange}
          name={"position"}
        />
      </div>
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
}

export default StepUserDetails;
