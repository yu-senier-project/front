import React from "react";
import "../../styles/project/User.scss";
import CloseButton from "../basic/CloseButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faXmark } from "@fortawesome/free-solid-svg-icons";

export const User = ({
  width,
  button,
  imgWidht,
  imgHeight,
  fontSize,
  memberId,
  nickname,
  profile,
  onClick,
}) => {
  const className = `User-name width-${width} font-${fontSize}`;

  const imgClassName = `User-img width-${imgWidht} height-${imgHeight}`;

  const imgSrc = profile ?? "/public/image/dp.jpg";

  return (
    <div className="User">
      <div className={imgClassName}>
        <img src={imgSrc} alt="" />
      </div>
      <div className={className}>{nickname}</div>
      {button === "close" ? (
        <div
          className="User-button-plus"
          onClick={() => {
            onClick(memberId, profile, nickname);
          }}
        >
          <FontAwesomeIcon icon={faXmark} />
        </div>
      ) : (
        <div
          className="User-button-plus"
          onClick={() => {
            onClick(memberId, profile, nickname);
          }}
        >
          <FontAwesomeIcon icon={faPlus} />
        </div>
      )}
    </div>
  );
};
