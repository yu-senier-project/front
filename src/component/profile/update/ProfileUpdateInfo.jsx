import React, { useState } from "react";
import "../../../styles/profile/update/ProfileUpdateInfo.scss";
import {
  generateYearOptions,
  generateMonthOptions,
  generateDayOptions,
} from "./getYearMonthDay";
import { useMemberDataUpdate } from "../../../react-query/useProfile";

export const ProfileUpdateInfo = ({
  setOneIntro,
  oneIntro,
  date,
  memberId,
  handleCloseBtn,
}) => {
  const { mutate, status } = useMemberDataUpdate(memberId);

  // 생년월일 저장 state
  const [selectedDate, setSelectedDate] = useState({
    year: date[0],
    month: date[1],
    day: date[2],
  });

  // year 변경 함수
  const onChangeYear = (e) => {
    const year = {
      year: e.target.value,
      month: selectedDate.month,
      day: selectedDate.day,
    };
    setSelectedDate(year);
  };

  // month 변경 함수
  const onChangeMonth = (e) => {
    const month = {
      year: selectedDate.year,
      month: e.target.value,
      day: selectedDate.day,
    };
    setSelectedDate(month);
  };

  // day 변경 함수
  const onChangeDay = (e) => {
    const day = {
      year: selectedDate.year,
      month: selectedDate.month,
      day: e.target.value,
    };
    setSelectedDate(day);
  };

  const onSubmit = () => {
    if (oneIntro.length > 30) {
      alert("한 줄 소개는 30글자 이하로 입력해주세요!");
      return;
    }
    if (oneIntro.length === 0) {
      setOneIntro("");
    }
    const birth = new Date(
      `${selectedDate.year}-${selectedDate.month}-${selectedDate.day}`
    );

    const data = {
      introduction: oneIntro,
      birth: birth,
    };
    mutate(data);
    handleCloseBtn();
  };

  return (
    <div className="ProfileUpdateInfo">
      <div className="ProfileUpdateInfo-intro">
        <p>한줄 소개</p>
        <input
          type="text"
          placeholder="한줄소개를 입력해주세요!"
          value={oneIntro}
          onChange={(e) => {
            setOneIntro(e.target.value);
          }}
        />
      </div>
      <div className="ProfileUpdateInfo-birth">
        <p>생년 월일</p>
        <div>
          <select name="year" onChange={onChangeYear}>
            {generateYearOptions(selectedDate.year)}
          </select>
          <select name="month" onChange={onChangeMonth}>
            {generateMonthOptions(selectedDate.month)}
          </select>
          <select name="day" onChange={onChangeDay}>
            {generateDayOptions(selectedDate.day)}
          </select>
        </div>
      </div>
      <div className="ProfileUpdateInfo-btn">
        <div>
          <button onClick={onSubmit}>완료</button>
        </div>
      </div>
    </div>
  );
};
