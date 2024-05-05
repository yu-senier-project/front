import { useState } from "react";
import "../../../styles/feed/main/feed.scss";
import Buttons from "./Buttons";
import Imgs from "./Imgs";
import Texts from "./Texts";
import ChatButton from "./ChatButton";
import UserInfo from "./UserInfo";
import Chat from "../../chat/Chat";

const Feed = ({ feedList }) => {
  const [isChatOpen, setIsChatOpen] = useState(false);

  const handleChatButtonClick = () => {
    setIsChatOpen(!isChatOpen);
  };

  return (
    <div className="Feed">
      <div className="Feed-userInfo">
        <UserInfo
          clock={feedList.clock}
          username={feedList.nickname}
        ></UserInfo>
      </div>
      <div className="Feed-texts">
        <div className="main-img">
          <Imgs></Imgs>
          <Buttons></Buttons>
          <Texts
            comment={feedList.comment}
            loveNum={feedList.loveNum}
            nickname={feedList.nickname}
          ></Texts>
          <ChatButton onClick={handleChatButtonClick}></ChatButton>
        </div>
        <div>{isChatOpen ? <Chat id={feedList.id}></Chat> : null}</div>
      </div>
    </div>
  );
};

export default Feed;
