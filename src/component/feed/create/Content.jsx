import "../../../styles/feed/create/content.scss";
import { useEffect, useState } from "react";
import UserCard from "../../UserCard";
import CreateFeedFindUser from "./CreateFeedFindUser";
import HashMentionInput from "../../basic/HashMentionInput";
const Content = () => {
  const [value, setValue] = useState("");
  const [findUser, setFindUser] = useState(false); //  @ 입력했는지 안했는지 확인

  const [hashSearch, setHashSearch] = useState("");

  // 멘션하는지 확인하는 부분

  const onChange = (e) => {
    setValue(e.target.value);
  };

  return (
    <div className="Content">
      {findUser && (
        <CreateFeedFindUser hashSearch={hashSearch}></CreateFeedFindUser>
      )}
      <UserCard
        userName={"yeongi0111"}
        width="width-40"
        img="public/image/dp.jpg"
      ></UserCard>
      <HashMentionInput value={value} onChange={setValue}></HashMentionInput>

      <p>{value.length}/100</p>
    </div>
  );
};

export default Content;
