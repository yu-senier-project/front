import "../../../styles/feed/create/content.scss";
import { useState } from "react";
import UserCard from "../../UserCard";

const Content = () => {
  const [content, setContent] = useState("");
  const onChange = (e) => {
    setContent(e.target.value);
  };
  return (
    <div className="Content">
      <UserCard
        userName={"yeongi0111"}
        width="width-40"
        img="public/image/dp.jpg"
      ></UserCard>
      <textarea
        id="custom_textarea"
        placeholder="문구를 입력하세요..."
        value={content}
        onChange={onChange}
      ></textarea>
      <p>{content.length}/100</p>
    </div>
  );
};

export default Content;
