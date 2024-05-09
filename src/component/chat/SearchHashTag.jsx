import React, { useState, useEffect, useRef } from "react";
import "../../styles/chat/searchUser.scss";
import UserCard from "../UserCard";

export const SearchHashTag = ({ onHashClick }) => {
  const [selectedIndex, setSelectedIndex] = useState(0); // 현재 선택된 항목의 인덱스
  const [hash, setHash] = useState([
    { hash: "모이프", img: "image/images.png" },
    { hash: "하이요", img: "image/images.png" },
    { hash: "바이요", img: "image/images.png" },
    { hash: "집에가자", img: "image/images.png" },
    { hash: "오늘 휴강", img: "image/images.png" },
    { hash: "대박이네", img: "image/images.png" },
    { hash: "와우", img: "image/images.png" },
    { hash: "오늘 대박", img: "image/images.png" },
  ]);

  const selectedIndexRef = useRef(selectedIndex);
  selectedIndexRef.current = selectedIndex;

  const scrollToItem = (index) => {
    const item = document.querySelector(
      `.SearchUser li:nth-child(${index + 1})`
    );
    if (item) {
      item.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "ArrowUp") {
        setSelectedIndex((prevIndex) => {
          const newIndex = prevIndex === 0 ? hash.length - 1 : prevIndex - 1;
          scrollToItem(newIndex);
          e.stopPropagation();
          return newIndex;
        });
      } else if (e.key === "ArrowDown") {
        setSelectedIndex((prevIndex) => {
          const newIndex = prevIndex === hash.length - 1 ? 0 : prevIndex + 1;
          scrollToItem(newIndex);
          e.stopPropagation();
          return newIndex;
        });
      } else if (e.key === "Enter") {
        const selectedUser = hash[selectedIndexRef.current];
        onHashClick(selectedUser.hash);
        e.stopPropagation();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);
  return (
    <div className="SearchUser">
      <ul>
        {hash.map((user, index) => (
          <li
            key={index}
            className={index === selectedIndex ? "selected" : ""}
            onClick={() => {
              onHashClick(user.hash);
            }}
          >
            <UserCard userName={user.hash} width={"width-30"} img={user.img} />
          </li>
        ))}
      </ul>
    </div>
  );
};
