import UserInfo from "../feed/main/UserInfo";
import Imgs from "../feed/main/Imgs";
import Buttons from "../feed/main/Buttons";
import Chat from "./Chat";
import Texts from "../feed/main/Texts";
import "../../styles/chat/chatModal.scss";
import { faX } from "@fortawesome/free-solid-svg-icons";
import CloseButton from "../basic/CloseButton";
import { useRef } from "react";

const ChatModal = ({ feedList, handleChatButtonClick, imgList }) => {
  const backgroundRef = useRef();

  // 모달 바깥 클릭했을 때 닫는 코드
  const handleClickBackground = (e) => {
    if (e.target === backgroundRef.current) {
      handleChatButtonClick();
    }
  };

  return (
    <div
      className="ChatModal ChatModal-animation"
      ref={backgroundRef}
      onClick={handleClickBackground}
    >
      <div className="ChatModal-wrap">
        <div className="Feed-userInfo ChatModalUser">
          <UserInfo
            clock={feedList.clock}
            username={feedList.nickname}
            Icon={faX}
          ></UserInfo>
          <div className="ChatModalCloseButton">
            <CloseButton
              size={20}
              onCloseButton={handleChatButtonClick}
            ></CloseButton>
          </div>
        </div>
        <div className="Feed-texts">
          <div className="main-img">
            <Imgs imgList={imgList}></Imgs>
            <Buttons></Buttons>
            <Texts
              comment={feedList.comment}
              loveNum={feedList.loveNum}
              nickname={feedList.nickname}
            ></Texts>
          </div>
          <div>{<Chat id={feedList.id}></Chat>}</div>
        </div>
      </div>
    </div>
  );
};

export default ChatModal;
