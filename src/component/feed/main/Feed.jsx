import { useState } from "react";
import "../../../styles/feed/main/feed.scss";
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
import { width } from "@fortawesome/free-brands-svg-icons/fa42Group";

const Feed = ({ feedList }) => {
  const { isLoading, data } = useQuery({
    queryKey: ["feedImg", feedList.id],
    queryFn: () => getFeedImg(feedList.id),
    refetchOnWindowFocus: false, // 포커스 변경시에는 자동 새로 고침이 발생하지 않습니다.
    staleTime: 1000 * 60 * 5, // 데이터가 5분 후에 스테일하다고 판단합니다.
  });

  let imgList = data?.data;

  const [isChatOpen, setIsChatOpen] = useState(false);

  const [isSettingOpen, setIsSettingOpen] = useState(false);

  const [isUpdate, setIsUpdate] = useState(false);

  const [falseLoveNum, setFalseLoveNum] = useState(feedList.loveNum);

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
    <div className="Feed">
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
      <UserInfo
        clock={feedList.createdAt}
        username={feedList.nickname}
        Icon={faEllipsis}
        handleSettingButtonClick={handleSettingButtonClick}
      ></UserInfo>
      {imgList?.length !== 0 ? (
        <div>
          <div className="Feed-userInfo"></div>
          <div className="Feed-texts">
            <div className="main-img">
              <Imgs imgList={imgList} style={{ width: "500px" }}></Imgs>
              <Buttons
                postId={feedList.id}
                like={feedList.liked}
                setFalseLoveNum={setFalseLoveNum}
                falseLoveNum={falseLoveNum}
              ></Buttons>
              <Texts
                comment={feedList.content}
                loveNum={feedList.loveNum}
                nickname={feedList.nickname}
                falseLoveNum={falseLoveNum}
              ></Texts>
              {feedList.isCommentEnabled ? (
                <ChatButton
                  onClick={handleChatButtonClick}
                  chatNum={feedList.commentCnt}
                ></ChatButton>
              ) : null}
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
      ) : (
        <div>
          <div>
            <p style={{ marginBottom: "10px", whiteSpace: "pre-wrap" }}>
              {feedList.content}
            </p>
            <Buttons
              postId={feedList.id}
              like={feedList.liked}
              setFalseLoveNum={setFalseLoveNum}
              falseLoveNum={falseLoveNum}
            ></Buttons>
            <Texts
              comment={""}
              loveNum={feedList.loveNum}
              nicknamse={""}
              falseLoveNum={falseLoveNum}
            ></Texts>
            {feedList.isCommentEnabled ? (
              <ChatButton
                onClick={handleChatButtonClick}
                chatNum={feedList.commentCnt}
              ></ChatButton>
            ) : null}
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
      )}
    </div>
  );
};

export default Feed;
