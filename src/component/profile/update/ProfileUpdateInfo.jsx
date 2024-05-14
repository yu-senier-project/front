import React, { useState } from "react";
import "../../../styles/profile/update/ProfileUpdateInfo.scss";
import {
  generateYearOptions,
  generateMonthOptions,
  generateDayOptions,
} from "./getYearMonthDay";

export const ProfileUpdateInfo = ({ setOneIntro, oneIntro }) => {
  const [selectedDate, setSelectedDate] = useState({
    year: null,
    month: null,
    day: null,
  });
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
          <select name="year">{generateYearOptions()}</select>
          <select name="month">{generateMonthOptions()}</select>
          <select name="day">{generateDayOptions()}</select>
        </div>
      </div>
      <div className="ProfileUpdateInfo-btn">
        <div>
          <button>완료</button>
        </div>
      </div>
    </div>
  );
};
