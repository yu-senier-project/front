import "../../../styles/feed/create/content.scss";
import { useEffect, useState } from "react";
import UserCard from "../../UserCard";
import CreateFeedFindUser from "./CreateFeedFindUser";
import HashMentionInput from "../../basic/HashMentionInput";
const Content = ({ appendHash, appendMention, onChangeContent, content }) => {
  // 멘션하는지 확인하는 부분

  return (
    <div className="Content">
      <UserCard
        userName={"yeongi0111"}
        width="width-40"
        img="public/image/dp.jpg"
      ></UserCard>
      <HashMentionInput
        placeholder={"문구를 입력하세요..."}
        width={100}
        height={200}
        backgroundColor="white"
        value={content}
        onChange={onChangeContent}
        appendHash={appendHash}
        appendMention={appendMention}
        fontSize={16}
      ></HashMentionInput>
    </div>
  );
};

export default Content;
