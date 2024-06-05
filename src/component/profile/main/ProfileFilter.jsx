import React, { useEffect, useState } from "react";
import { CiFilter } from "react-icons/ci";
import "../../../styles/profile/ProfileFilter.scss";
import { ProfileFilterMenu } from "./ProfileFilterMenu";
import { ProfileDayFilter } from "./ProfileDayFilter";

export const ProfileFilter = ({
  value,
  setValue,
  setEndDate,
  endDate,
  startDate,
  setStartDate,
  setStart,
  setEnd,
}) => {
  const [onFilter, setOnFilter] = useState(false);

  const [onDaySelect, setOnDaySelect] = useState(false);

  useEffect(() => {
    if (value !== "날짜 선택") {
      setOnDaySelect(false);
    }
  }, [value]);

  const applyDateFilter = () => {
    const startYear = startDate.getFullYear();
    const startMonth = String(startDate.getMonth() + 1).padStart(2, "0");
    const startDays = String(startDate.getDate()).padStart(2, "0");
    const endYear = endDate.getFullYear();
    const endMonth = String(endDate.getMonth() + 1).padStart(2, "0");
    const endDays = String(endDate.getDate()).padStart(2, "0");
    setStart(`${startYear}-${startMonth}-${startDays}`);
    setEnd(`${endYear}-${endMonth}-${endDays}`);
  };

  return (
    <div className="ProfileFilter">
      <div
        className="ProfileFilter-icon"
        onClick={() => {
          setOnFilter(!onFilter);
        }}
      >
        <CiFilter size="30" />
      </div>
      <p
        style={{
          cursor: "pointer",
        }}
        onClick={() => {
          setOnFilter(!onFilter);
        }}
      >
        {value}
      </p>
      {onFilter ? (
        <ProfileFilterMenu
          setOnFilter={setOnFilter}
          setValue={setValue}
          value={value}
          setOnDaySelect={setOnDaySelect}
        ></ProfileFilterMenu>
      ) : null}
      {onDaySelect ? (
        <div
          style={{
            display: "flex",
            marginLeft: "10px",
            position: "relative",
            zIndex: "100000",
          }}
        >
          <div style={{ marginRight: "10px" }}>
            <ProfileDayFilter
              startDate={startDate}
              endDate={endDate}
              setStartDate={setStartDate}
              setEndDate={setEndDate}
            ></ProfileDayFilter>
          </div>
          <button className="ProfileFilter-btn" onClick={applyDateFilter}>
            조회
          </button>
        </div>
      ) : null}
    </div>
  );
};
