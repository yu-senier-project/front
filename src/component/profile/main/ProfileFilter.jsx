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
}) => {
  const [onFilter, setOnFilter] = useState(false);

  const [onDaySelect, setOnDaySelect] = useState(false);

  useEffect(() => {
    if (value !== "날짜 선택") {
      setOnDaySelect(false);
    }
  }, [value]);

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
      <p>{value}</p>
      {onFilter ? (
        <ProfileFilterMenu
          setOnFilter={setOnFilter}
          setValue={setValue}
          value={value}
          setOnDaySelect={setOnDaySelect}
        ></ProfileFilterMenu>
      ) : null}
      {onDaySelect ? (
        <div style={{ display: "flex", marginLeft: "10px" }}>
          <div style={{ marginRight: "10px" }}>
            <ProfileDayFilter
              startDate={startDate}
              endDate={endDate}
              setStartDate={setStartDate}
              setEndDate={setEndDate}
            ></ProfileDayFilter>
          </div>
          <button className="ProfileFilter-btn">조회</button>
        </div>
      ) : null}
    </div>
  );
};
