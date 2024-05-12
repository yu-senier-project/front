import React, { useState, useEffect, useRef } from "react";
import "../../styles/chat/searchUser.scss";
import UserCard from "../UserCard";
import apiClient from "../../util/BaseUrl";
import axios from "axios";

export const SearchUser = ({ onMentionClick, metionValue }) => {
  const [selectedIndex, setSelectedIndex] = useState(0); // 현재 선택된 항목의 인덱스

  const [users, setUsers] = useState([]);

  const fetchData = async () => {
    try {
      let data = await apiClient.get(
        `/api/v1/member/search-by-nickname?param=${metionValue}`
      );
      setUsers(
        data.data.map((item) => ({
          userName: item.nickname,
          memberId: item.memberId,
          img: "image/dp.jpg",
        }))
      );
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    const timeoutExecute = setTimeout(() => fetchData(), 1000);
    return () => clearTimeout(timeoutExecute);
  }, [metionValue]);

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
      } else if (e.key === " ") {
        e.stopPropagation();
        const selectedUser = users[selectedIndexRef.current];
        onMentionClick(selectedUser.userName);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [users]);

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
