import React, { useEffect, useState, useRef } from "react";
import "../../styles/chat/MentionInput.scss";
import { SearchUser } from "./SearchUser";

export const MentionInput = ({
  value,
  onChange,
  inputRef,
  replyUser,
  mentionList,
}) => {
  // @ 입력시 검색 창
  const [onMention, setOnMention] = useState(false);

  // 멘션에서 검색할 값
  const [metionValue, setMentionValue] = useState("");

  //현재 커서 위치 검색
  const [currentCusor, setCurrentCusor] = useState(0);

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  useEffect(() => {
    if (value[value.length - 1] == " ") {
      setOnMention(false);
      setMentionValue("");
      return;
    }

    if (!value.includes("@")) {
      setOnMention(false);
      setMentionValue("");
      return;
    }

    if (onMention) {
      let mention = value.substring(currentCusor + 1);
      setMentionValue(mention);
    }

    mentionList.current = mentionList.current.filter((item) =>
      value.includes(item)
    );
  }, [value, onMention, currentCusor]);

  const onChangeInput = (e) => {
    onChange(e.target.value);
    if (value[value.length - 1] == "@") {
      if (value.length > 1) {
        if (value[value.length - 2] != " ") {
          return;
        }
      }
      setCurrentCusor(e.target.selectionStart - 1);
      setOnMention(true);
      return;
    }
  };

  const onMentionClick = (userName) => {
    mentionList.current.push(`@${userName}`);
    console.log(mentionList.current);
    let newValue = value.substring(0, currentCusor) + userName + " ";
    setOnMention(false);
    onChange(newValue);

    inputRef.current.focus();
  };

  return (
    <div className="MentionInput">
      {onMention ? (
        <SearchUser
          onMentionClick={onMentionClick}
          metionValue={metionValue}
        ></SearchUser>
      ) : null}
      <input
        type="text"
        value={value}
        onChange={onChangeInput}
        ref={inputRef}
      />
    </div>
  );
};
