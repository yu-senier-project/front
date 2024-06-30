import "../../../styles/feed/create/content.scss";
import { useEffect, useState } from "react";
import UserCard from "../../UserCard";
import CreateFeedFindUser from "./CreateFeedFindUser";
import HashMentionInput from "../../basic/HashMentionInput";
import { MentionTextarea } from "../../basic/MentionTextarea";
import { SearchUser } from "../../chat/SearchUser";
import { SearchHashTag } from "../../chat/SearchHashTag";
const Content = ({
  onChangeContent,
  content,
  hashList,
  mentionList,
  inputRef,
}) => {
  // 멘션하는지 확인하는 부분

  const img =
    localStorage.getItem("profile") == "null"
      ? "/image/dp.jpg"
      : localStorage.getItem("profile");

  return (
    <div className="Content">
      <UserCard
        userName={localStorage.getItem("userNickName")}
        width="width-40"
        img={img}
      ></UserCard>
      <MentionTextarea
        inputRef={inputRef}
        hashList={hashList}
        mentionList={mentionList}
        value={content}
        onChange={onChangeContent}
      ></MentionTextarea>
      <p> {content.length} / 1000</p>
    </div>
  );
};

export default Content;
