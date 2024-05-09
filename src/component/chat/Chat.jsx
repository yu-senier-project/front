import "../../styles/chat/chat.scss";
import "../UserCard";

import ChatInput from "./ChatInput";
import { useState } from "react";
import ChatUserCard from "./ChatUserCard";

const Chat = ({ id }) => {
  // 답글 달기 클릭했을 때 인풋창에 해당 유저 띄우게 하는거
  const [replyUser, setReplyUser] = useState("");

  const onClickReply = (username) => {
    const value = `@${username}`;
    setReplyUser(value);
  };

  return (
    <div className="Chat width-400">
      <div className="chat-userCard">
        <ChatUserCard
          img="public/image/dp.jpg"
          userName={"yeongi"}
          comment={"안녕하세요"}
          loveNum={5}
          replyNum={5}
          imgWidth={40}
          commentWidth={280}
          onClickReply={onClickReply}
        ></ChatUserCard>
        <ChatUserCard
          img="public/image/dp.jpg"
          userName={"yeongi"}
          comment={"안녕하세요"}
          loveNum={5}
          replyNum={5}
          imgWidth={40}
          commentWidth={280}
          onClickReply={onClickReply}
        ></ChatUserCard>
        <ChatUserCard
          img="public/image/dp.jpg"
          userName={"yeongi"}
          comment={"안녕하세요"}
          loveNum={5}
          replyNum={5}
          imgWidth={40}
          commentWidth={280}
          onClickReply={onClickReply}
        ></ChatUserCard>
      </div>
      <ChatInput replyUser={replyUser}></ChatInput>
    </div>
  );
};

export default Chat;
