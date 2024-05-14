import React from "react";
import "../../../styles/profile/profileFilterMenu.scss";
import { ProfileDayFilter } from "./ProfileDayFilter";

export const ProfileFilterMenu = ({
  setOnFilter,
  setValue,
  value,
  setOnDaySelect,
}) => {
  const onChange = (e) => {
    if (e.target.value === "날짜 선택") {
      setOnDaySelect(true);
    }
    setValue(e.target.value);
    setOnFilter(false);
  };

  return (
    <div className="ProfileFilterMenu">
      <div className="ProfileFilterMenu-title">게시물 필터</div>
      <div className="ProfileFilterMenu-menu">
        <label htmlFor="current">
          <div>최신</div>
        </label>
        <div>
          <input
            onChange={onChange}
            type="radio"
            name="filter"
            id="current"
            value={"최신순"}
            checked={value == "최신순"}
          />
        </div>
      </div>
      <div className="ProfileFilterMenu-menu">
        <label htmlFor="old">
          <div>오래된</div>
        </label>
        <div>
          <input
            type="radio"
            name="filter"
            id="old"
            value={"오래된 순"}
            onChange={onChange}
            checked={value == "오래된 순"}
          />
        </div>
      </div>
      <div className="ProfileFilterMenu-menu">
        <label htmlFor="manyLike">
          <div>좋아요 많은</div>
        </label>
        <div>
          <input
            type="radio"
            name="filter"
            id="manyLike"
            value={"좋아요 많은 순"}
            onChange={onChange}
            checked={value == "좋아요 많은 순"}
          />
        </div>
      </div>
      <div className="ProfileFilterMenu-menu">
        <label htmlFor="day">
          <div>날짜 선택</div>
        </label>
        <div>
          <input
            type="radio"
            name="filter"
            id="day"
            onChange={onChange}
            value={"날짜 선택"}
            checked={value == "날짜 선택"}
          />
        </div>
      </div>
    </div>
  );
};
