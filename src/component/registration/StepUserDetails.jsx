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
    <div className="register_modal">
      <div className="register_modal__header">
        <button
          onClick={() => {
            setModalStep(0);
          }}
        >
          ←
        </button>

        <p className="title">가입하기</p>

        <CloseButton onCloseButton={handleCloseWithReset} />
      </div>
      <div className="register_modal__section">
        <div className="register_section__position">
          <Input
            size="Large"
            placeholder={"직무 (무직일 경우 '희망 직무')"}
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
        <div className="register_section__name">
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

        <div className="register_section__birthday">
          <p className="birthday_text">생년월일</p>
          <div>
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
          </div>
          {errors.date && (
            <div
              className="error-message"
              style={{ color: "red", fontSize: "10px" }}
            >
              *{errors.date}
            </div>
          )}
        </div>
      </div>
      <div className="register_modal__footer">
        <Button text={"다음"} size={"Large"} onClick={handleNextClick} />
      </div>
    </div>
  );
}

export default StepUserDetails;
