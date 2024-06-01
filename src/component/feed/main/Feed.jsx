import { useState, useRef } from "react";
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
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getFeedImg, deleteFeed } from "../../../apis/feedApis";
import { renderContent } from "../../../util/MentionHashText";

const Feed = ({ feedList }) => {
  const { isLoading, data } = useQuery({
    queryKey: ["feedImg", feedList.id],
    queryFn: () => getFeedImg(feedList.id),
    refetchOnWindowFocus: false, // 포커스 변경시에는 자동 새로 고침이 발생하지 않습니다.
    refetchOnMount: false,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 5, // 데이터가 5분 후에 스테일하다고 판단합니다.
  });

  let imgList = data?.data;

  const [isChatOpen, setIsChatOpen] = useState(false);

  const [isSettingOpen, setIsSettingOpen] = useState(false);

  const [isUpdate, setIsUpdate] = useState(false);

  const [falseLoveNum, setFalseLoveNum] = useState(feedList.loveNum);

  const [falseLike, setFalseLike] = useState(feedList.liked);

  const backgroundRef = useRef();

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

  const queryClient = useQueryClient();
  const { status, mutate } = useMutation({
    mutationFn: deleteFeed,
    onSuccess: () => {
      queryClient.invalidateQueries(["feeds"]);
    },
    onError: (e) => {
      console.log(e);
    },
  });

  const handleOnDelete = () => {
    mutate(feedList.id);
    setIsSettingOpen(false);
  };

  const handleClickBackground = (e) => {
    if (e.target !== backgroundRef.current && isSettingOpen) {
      setIsSettingOpen(false);
    }
  };

  return (
    <div className="Feed" onClick={handleClickBackground}>
      {isUpdate ? (
        <UpdateFeed
          setIsUpdate={setIsUpdate}
          hanldUpdateCloseButtonClick={hanldUpdateCloseButtonClick}
          feedList={feedList}
          imgList={imgList}
        ></UpdateFeed>
      ) : null}
      {isSettingOpen ? (
        <div ref={backgroundRef} className="Feed-setting">
          <Setting
            width={150}
            settingTitleList={[
              {
                title: "삭제하기",
                onClick: handleOnDelete,
              },
              {
                title: "수정하기",
                onClick: handleUpdateButtonClick,
              },
            ]}
          ></Setting>
        </div>
      ) : null}
      <UserInfo
        id={feedList.memberId}
        profile={feedList.profile}
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
                isCommentEnabled={feedList.isCommentEnabled}
                handleChatButtonClick={handleChatButtonClick}
                postId={feedList.id}
                like={feedList.liked}
                setFalseLoveNum={setFalseLoveNum}
                falseLoveNum={falseLoveNum}
                falseLike={falseLike}
                setFalseLike={setFalseLike}
              ></Buttons>
              <Texts
                hashtags={feedList.hashtags}
                mentions={feedList.mentions}
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
                  profile={feedList.profile}
                  handleUpdateButtonClick={handleUpdateButtonClick}
                  handleOnDelete={handleOnDelete}
                  imgList={imgList}
                  feedList={feedList}
                  handleChatButtonClick={handleChatButtonClick}
                  falseLoveNum={falseLoveNum}
                  falseLike={falseLike}
                  setFalseLike={setFalseLike}
                  setFalseLoveNum={setFalseLoveNum}
                ></ChatModal>
              ) : null}
            </div>
          </div>
        </div>
      ) : (
        <div>
          <div>
            <p
              style={{ marginBottom: "10px", whiteSpace: "pre-wrap" }}
              className="Feed-content"
            >
              {renderContent(feedList.content)}
            </p>
            <Buttons
              isCommentEnabled={feedList.isCommentEnabled}
              handleChatButtonClick={handleChatButtonClick}
              postId={feedList.id}
              like={feedList.liked}
              setFalseLoveNum={setFalseLoveNum}
              falseLoveNum={falseLoveNum}
              falseLike={falseLike}
              setFalseLike={setFalseLike}
            ></Buttons>
            <Texts
              hashtags={feedList.hashtags}
              mentions={feedList.mentions}
              comment={""}
              loveNum={feedList.loveNum}
              nickname={""}
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
                profile={feedList.profile}
                handleUpdateButtonClick={handleUpdateButtonClick}
                handleOnDelete={handleOnDelete}
                imgList={imgList}
                feedList={feedList}
                handleChatButtonClick={handleChatButtonClick}
                falseLoveNum={falseLoveNum}
                setFalseLoveNum={setFalseLoveNum}
                falseLike={falseLike}
                setFalseLike={setFalseLike}
              ></ChatModal>
            ) : null}
          </div>
        </div>
      )}
    </div>
  );
};

export default Feed;
