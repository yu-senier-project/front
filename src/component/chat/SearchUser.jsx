import React, { useState, useEffect, useRef } from "react";
import "../../styles/chat/searchUser.scss";
import UserCard from "../UserCard";

export const SearchUser = ({ onMentionClick }) => {
  const [selectedIndex, setSelectedIndex] = useState(0); // 현재 선택된 항목의 인덱스
  const [users, setUsers] = useState([
    { userName: "user1", img: "image/dp.jpg" },
    { userName: "user2", img: "image/dp.jpg" },
    { userName: "user3", img: "image/dp.jpg" },
    { userName: "user3", img: "image/dp.jpg" },
    { userName: "user3", img: "image/dp.jpg" },
    { userName: "user3", img: "image/dp.jpg" },
    { userName: "user3", img: "image/dp.jpg" },
    // 나머지 유저 데이터
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
          const newIndex = prevIndex === 0 ? users.length - 1 : prevIndex - 1;
          scrollToItem(newIndex);
          e.stopPropagation();
          return newIndex;
        });
      } else if (e.key === "ArrowDown") {
        setSelectedIndex((prevIndex) => {
          const newIndex = prevIndex === users.length - 1 ? 0 : prevIndex + 1;
          scrollToItem(newIndex);
          e.stopPropagation();
          return newIndex;
        });
      } else if (e.key === "Enter") {
        const selectedUser = users[selectedIndexRef.current];
        onMentionClick(selectedUser.userName);
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
        {users.map((user, index) => (
          <li
            key={index}
            className={index === selectedIndex ? "selected" : ""}
            onClick={() => {
              onMentionClick(user.userName);
            }}
          >
            <UserCard
              userName={user.userName}
              width={"width-30"}
              img={user.img}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};
