import React, { useState } from "react";
import Input from "../basic/Input";
import Button from "../basic/Button";
import CloseButton from "../basic/CloseButton";
import SelectComponent from "../basic/Select";

function StepUserDetails({
  handleInputChange,
  formData,
  setModalStep,
  handleCloseWithReset,
  handleDateChange,
  date,
  years,
  months,
  days,
}) {
  const [errors, setErrors] = useState({});

  const handleNextClick = () => {
    const newErrors = {};

    if (!formData.position) {
      newErrors.position = "직무를 작성해주세요";
    }
    if (!formData.firstName) {
      newErrors.firstName = "성을 작성해주세요";
    }
    if (!formData.secondName) {
      newErrors.secondName = "이름을 작성해주세요";
    }
    if (!date.year || !date.month || !date.day) {
      newErrors.date = "생일을 입력해주세요";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setModalStep(2);
  };

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
      <div className="position-space">
        <Input
          size="Large"
          placeholder={"무직일 경우 희망 직무"}
          onChange={handleInputChange}
          value={formData.position}
          name={"position"}
          autocomplete={"off"}
        />
        {errors.position && (
          <div
            className="error-message"
            style={{ color: "red", fontSize: "10px" }}
          >
            *{errors.position}
          </div>
        )}
      </div>
      <div className="name-space">
        <Input
          size="Large"
          placeholder={"성"}
          onChange={handleInputChange}
          value={formData.firstName}
          name={"firstName"}
          id="input-error"
          autocomplete={"off"}
        />
        {errors.firstName && (
          <div
            className="error-message"
            style={{ color: "red", fontSize: "10px" }}
          >
            *{errors.firstName}
          </div>
        )}
        <Input
          size="Large"
          placeholder={"이름"}
          value={formData.secondName}
          onChange={handleInputChange}
          name={"secondName"}
          autocomplete={"off"}
        />
        {errors.secondName && (
          <div
            className="error-message"
            style={{ color: "red", fontSize: "10px" }}
          >
            *{errors.secondName}
          </div>
        )}
      </div>

      <div className="birthday-selecter">
        <h3 className="birthday">생년월일</h3>
        <SelectComponent
          id="year-select"
          placeholder="년도 선택"
          value={date.year}
          onChange={(value) => handleDateChange("year", value)}
          data={years}
        />
        <SelectComponent
          id="month-select"
          placeholder="월 선택"
          value={date.month}
          onChange={(value) => handleDateChange("month", value)}
          data={months}
        />
        <SelectComponent
          id="day-select"
          placeholder="일 선택"
          value={date.day}
          onChange={(value) => handleDateChange("day", value)}
          data={days}
        />
        {errors.date && (
          <div
            className="error-message"
            style={{ color: "red", fontSize: "10px" }}
          >
            *{errors.date}
          </div>
        )}
      </div>
      <div className="next_button">
        <Button text={"다음"} size={"Large"} onClick={handleNextClick} />
      </div>
    </div>
  );
}

export default StepUserDetails;
