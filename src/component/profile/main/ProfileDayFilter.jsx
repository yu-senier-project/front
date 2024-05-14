import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useState, forwardRef } from "react";
export const ProfileDayFilter = ({
  endDate,
  startDate,
  setStartDate,
  setEndDate,
}) => {
  const ExampleCustomInput = forwardRef(({ value, onClick }, ref) => (
    <button
      className="example-custom-input"
      onClick={onClick}
      ref={ref}
      style={{
        backgroundColor: "white",
        border: "none",
        padding: "7px",
        borderRadius: "10px",
      }}
    >
      {value}
    </button>
  ));

  console.log(startDate);

  return (
    <div>
      <DatePicker
        dateFormat="yyyy-MM-dd"
        selected={startDate}
        minDate={new Date("2020-01-01")}
        maxDate={new Date()}
        onChange={(date) => setStartDate(date)}
        customInput={<ExampleCustomInput />}
      />
      ~
      <DatePicker
        dateFormat="yyyy-MM-dd"
        selected={endDate}
        minDate={startDate}
        maxDate={new Date()}
        onChange={(date) => setEndDate(date)}
        customInput={<ExampleCustomInput />}
      />
    </div>
  );
};
