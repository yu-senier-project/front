import React from "react";

// 연도 선택 옵션 생성 함수
export const generateYearOptions = (selectYear) => {
  const yearOptions = [];
  const currentYear = new Date().getFullYear();
  for (let year = 1950; year <= currentYear; year++) {
    yearOptions.push(
      <option key={year} value={year} selected={selectYear === year}>
        {year}
      </option>
    );
  }
  return yearOptions;
};

// 월 선택 옵션 생성 함수
export const generateMonthOptions = (selectMonth) => {
  const monthOptions = [];
  for (let month = 1; month <= 12; month++) {
    monthOptions.push(
      <option key={month} value={month} selected={selectMonth === month}>
        {month}
      </option>
    );
  }
  return monthOptions;
};

// 일 선택 옵션 생성 함수
export const generateDayOptions = (selectDay) => {
  const dayOptions = [];
  for (let day = 1; day <= 31; day++) {
    dayOptions.push(
      <option key={day} value={day} selected={selectDay === day}>
        {day}
      </option>
    );
  }
  return dayOptions;
};
