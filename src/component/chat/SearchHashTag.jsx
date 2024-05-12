import React, { useState, useEffect, useRef } from "react";
import "../../styles/chat/searchUser.scss";
import UserCard from "../UserCard";
import apiClient from "../../util/BaseUrl";
import { debounce } from "lodash";

export const SearchHashTag = ({ onHashClick, hashValue }) => {
  const [selectedIndex, setSelectedIndex] = useState(0); // 현재 선택된 항목의 인덱스
  const [hash, setHash] = useState([]);

  const fetchData = async () => {
    try {
      let data = await apiClient.get(`/api/v1/hashtag/${hashValue}`);
      setHash(
        data?.data.map((item) => ({
          hash: item.name.substr(1),
          postCnt: item.postCnt,
          img: "image/images.png",
        }))
      );
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }; // 300ms 동안의 연속적인 요청을 하나로 그룹화합니다.

  useEffect(() => {
    const timeoutExecute = setTimeout(() => fetchData(), 1000);
    return () => clearTimeout(timeoutExecute);
  }, [hashValue]);

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
      } else if (e.key === " ") {
        const selectedUser = hash[selectedIndexRef.current];
        onHashClick(selectedUser.hash);
        e.stopPropagation();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [hash]);
  return (
    <div className="SearchUser">
      <ul>
        {hash?.map((user, index) => (
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
