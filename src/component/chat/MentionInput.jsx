import React, { useEffect, useState, useRef } from "react";
import "../../styles/chat/MentionInput.scss";
import { SearchHashTag } from "./SearchHashTag";
import { SearchUser } from "./SearchUser";

export const MentionInput = ({
  value,
  onChange,
  inputRef,
  mentionList,
  hashList,
  onKeyDown,
}) => {
  // @ 입력시 검색 창
  const [onMention, setOnMention] = useState(false);

  // # 입력시 검색 창
  const [onHash, setOnHash] = useState(false);

  // 해쉬태그 검색할 값
  const [hashValue, setHashValue] = useState("");

  // 멘션에서 검색할 값
  const [metionValue, setMentionValue] = useState("");

  //현재 커서 위치 검색
  const [currentCusor, setCurrentCusor] = useState(0);

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  useEffect(() => {
    if (!value.includes("@")) {
      setOnHash(false);
      setOnMention(false);
      setHashValue("");
      setMentionValue("");
      return;
    }

    // 없는 해시태그 입력시
    if (hashValue !== "") {
      if (value[value.length - 1] == " ") {
        hashList.current.push(`#${hashValue}`);
        setHashValue("");
        setOnHash(false);
      }
    }

    // 멘션
    if (value[value.length - 1] == " ") {
      setOnMention(false);
      setMentionValue("");
      setOnHash(false);
      setHashValue("");
      return;
    }

    if (onMention) {
      let mention = value.substring(currentCusor);

      setMentionValue(mention);
    }

    mentionList.current = mentionList.current.filter((item) =>
      value.includes(item)
    );

    // 해시태그
    if (onHash) {
      let hash = value.substring(currentCusor);
      setHashValue(hash);
    }

    hashList.current = hashList.current.filter((item) => value.includes(item));

    if (!value.includes("#")) {
      setOnHash(false);
      setHashValue("");
      return;
    }

    if (!value.includes("@")) {
      setOnMention(false);
      setMentionValue("");
      return;
    }
  }, [value, onMention, currentCusor, onHash]);

  const onChangeInput = (e) => {
    onChange(e.target.value);
    // 멘션
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

    //해시태그
    if (value[value.length - 1] == "#") {
      if (value.length > 1) {
        if (value[value.length - 2] != " ") {
          return;
        }
      }
      // setCurrentCusor(e.target.selectionStart - 1);
      // setOnHash(true);
      return;
    }
  };

  const onMentionClick = (userName) => {
    mentionList.current.push(`@${userName}`);
    let newValue = value.substring(0, currentCusor) + userName + " ";
    setOnMention(false);
    onChange(newValue);

    inputRef.current.focus();
  };

  const onHashClick = (hash) => {
    hashList.current.push(`#${hash}`);
    let newValue = value.substring(0, currentCusor) + hash + " ";
    setHashValue("");
    setOnHash(false);
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
      {onHash ? (
        <SearchHashTag
          onHashClick={onHashClick}
          hashValue={hashValue}
        ></SearchHashTag>
      ) : null}
      <input
        onKeyDown={onKeyDown}
        type="text"
        value={value}
        onChange={onChangeInput}
        ref={inputRef}
      />
    </div>
  );
};
