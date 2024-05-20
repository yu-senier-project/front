import { useState, useRef } from "react";
import "../styles/userCard.css";

export default function UserCard({
  userName,
  comment,
  width,
  img,
  height,
  onClick,
}) {
  const className = `${width} ${height}`;
  return (
    <div id="usercard" onClick={onClick}>
      <img id="userImg" className={className} src={img} alt="프로필사진" />
      <div className="usercard-comment">
        <span>
          <b>{userName}</b>
        </span>
        {comment ? (
          <div
            style={{
              marginLeft: "10px",
              width: "100px",
              overflowWrap: "break-word",
            }}
          >
            {comment}{" "}
          </div>
        ) : null}
      </div>
    </div>
  );
}
