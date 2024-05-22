import React from "react";
import Buttons from "./Buttons";
import Imgs from "./Imgs";
import Texts from "./Texts";
import ChatButton from "./ChatButton";
import UserInfo from "./UserInfo";
import ChatModal from "../../chat/ChatModal";
import { Setting } from "../../basic/Setting";
import { UpdateFeed } from "../delete/UpdateFeed";
import { faEllipsis } from "@fortawesome/free-solid-svg-icons";
import { useQuery } from "@tanstack/react-query";
import { getFeedImg } from "../../../apis/feedApis";
export const NoImageFeed = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);

  const [isSettingOpen, setIsSettingOpen] = useState(false);

  const [isUpdate, setIsUpdate] = useState(false);
  const handleChatButtonClick = () => {
    setIsChatOpen(!isChatOpen);
  };

  const handleSettingButtonClick = () => {
    setIsSettingOpen(!isSettingOpen);
  };

  const handleUpdateButtonClick = () => {
    if (isUpdate) {
      return;
    }
    setIsSettingOpen(false);
    setIsUpdate(true);
  };

  const hanldUpdateCloseButtonClick = () => {
    setIsUpdate(false);
  };

  return (
    <div className="NoImageFeed">
      {/* <UpdateFeed></UpdateFeed> */}
      {isUpdate ? (
        <UpdateFeed
          hanldUpdateCloseButtonClick={hanldUpdateCloseButtonClick}
          feedList={feedList}
          imgList={imgList}
        ></UpdateFeed>
      ) : null}
      {isSettingOpen ? (
        <Setting
          width={150}
          handleUpdateButtonClick={handleUpdateButtonClick}
        ></Setting>
      ) : null}
      <div className="Feed-userInfo">
        <UserInfo
          clock={feedList.createdAt}
          username={feedList.nickname}
          Icon={faEllipsis}
          handleSettingButtonClick={handleSettingButtonClick}
        ></UserInfo>
      </div>
      <div className="Feed-texts">
        <div className="main-img">
          {imgList?.length !== 0 ? <Imgs imgList={imgList}></Imgs> : null}

          <Buttons></Buttons>
          <Texts
            comment={feedList.content}
            loveNum={feedList.loveNum}
            nickname={feedList.nickname}
          ></Texts>
          <ChatButton onClick={handleChatButtonClick}></ChatButton>
        </div>
        <div>
          {isChatOpen ? (
            <ChatModal
              imgList={imgList}
              feedList={feedList}
              handleChatButtonClick={handleChatButtonClick}
            ></ChatModal>
          ) : null}
        </div>
      </div>
    </div>
  );
};
