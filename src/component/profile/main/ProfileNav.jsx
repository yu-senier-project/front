import React, { useState } from "react";
import "../../../styles/profile/profileNav.scss";

export const ProfileNav = ({ selectMenu, setSelectMenu }) => {
  selectMenu; // 내가 작성한 글 calssName
  const myClassName = `${selectMenu == 1 ? "select" : null}`;

  // 좋아요 누른 글 calssName
  const likeClassName = `${selectMenu == 2 ? "select" : null}`;

  const onMyClick = () => {
    if (selectMenu == 2) {
      setSelectMenu(1);
      return;
    }
  };

  const onLikeClick = () => {
    if (selectMenu == 1) {
      setSelectMenu(2);
      return;
    }
  };

  return (
    <div className="ProfileNav">
      <ul>
        <li className={myClassName} onClick={onMyClick}>
          내가 작성한 글
        </li>
        <li className={likeClassName} onClick={onLikeClick}>
          좋아요를 누른 글
        </li>
      </ul>
    </div>
  );
};
