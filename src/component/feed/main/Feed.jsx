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
import { useNavigate } from "react-router-dom";

const Feed = ({ feedList }) => {
  const { isLoading, data } = useQuery({
    queryKey: ["feedImg", feedList.id],
    queryFn: () => getFeedImg(feedList.id),
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
    staleTime: 1000 * 60 * 5,
  });

  const nav = useNavigate();
  const imgList = data?.data;

  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isSettingOpen, setIsSettingOpen] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);
  const [falseLoveNum, setFalseLoveNum] = useState(feedList.loveNum);
  const [falseLike, setFalseLike] = useState(feedList.liked);
  const backgroundRef = useRef();
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: deleteFeed,
    onSuccess: () => queryClient.invalidateQueries(["feeds"]),
    onError: (e) => console.log(e),
  });

  // 핸들러 함수들
  const handleChatButtonClick = () => setIsChatOpen(!isChatOpen);
  const handleSettingButtonClick = () => setIsSettingOpen(!isSettingOpen);
  const handleUpdateButtonClick = () => {
    setIsSettingOpen(false);
    setIsUpdate(true);
  };
  const handleOnDelete = () => {
    if (window.confirm("정말로 삭제하시겠습니까?")) {
      mutate(feedList.id);
      setIsSettingOpen(false);
    }
  };
  const handleClickBackground = (e) => {
    if (e.target !== backgroundRef.current && isSettingOpen) {
      setIsSettingOpen(false);
    }
  };

  // 컴포넌트 공통 로직을 별도 함수로 분리
  const renderButtonsAndTexts = () => (
    <>
      <Buttons
        isCommentEnabled={feedList.isCommentEnabled}
        handleChatButtonClick={handleChatButtonClick}
        postId={feedList.id}
        like={feedList.liked}
        setFalseLoveNum={setFalseLoveNum}
        falseLoveNum={falseLoveNum}
        falseLike={falseLike}
        setFalseLike={setFalseLike}
      />
      <Texts
        comment={feedList.content}
        loveNum={feedList.loveNum}
        nickname={feedList.nickname}
        falseLoveNum={falseLoveNum}
        hashtags={feedList.hashtags}
        mentions={feedList.mentions}
      />
      {feedList.isCommentEnabled && (
        <ChatButton
          onClick={handleChatButtonClick}
          chatNum={feedList.commentCnt}
        />
      )}
    </>
  );

  const renderChatModal = () =>
    isChatOpen && (
      <ChatModal
        profile={feedList.profile}
        imgList={imgList}
        feedList={feedList}
        falseLoveNum={falseLoveNum}
        falseLike={falseLike}
        setFalseLoveNum={setFalseLoveNum}
        setFalseLike={setFalseLike}
        handleChatButtonClick={handleChatButtonClick}
      />
    );

  return (
    <div className="Feed" onClick={handleClickBackground}>
      {isUpdate && (
        <UpdateFeed
          setIsUpdate={setIsUpdate}
          feedList={feedList}
          imgList={imgList}
        />
      )}

      {isSettingOpen && (
        <div ref={backgroundRef} className="Feed-setting">
          <Setting
            width={150}
            settingTitleList={[
              { title: "삭제하기", onClick: handleOnDelete },
              { title: "수정하기", onClick: handleUpdateButtonClick },
            ]}
          />
        </div>
      )}

      <UserInfo
        id={feedList.memberId}
        profile={feedList.profile}
        clock={feedList.createdAt}
        username={feedList.nickname}
        Icon={faEllipsis}
        handleSettingButtonClick={handleSettingButtonClick}
      />

      {imgList?.length ? (
        <div className="main-img">
          <Imgs imgList={imgList} style={{ width: "500px" }} />
          {renderButtonsAndTexts()}
          {renderChatModal()}
        </div>
      ) : (
        <div>
          <p
            className="Feed-content"
            style={{ marginBottom: "10px", whiteSpace: "pre-wrap" }}
          >
            {renderContent(
              feedList.content,
              feedList.hashtags,
              feedList.mentions,
              nav
            )}
          </p>
          {renderButtonsAndTexts()}
          {renderChatModal()}
        </div>
      )}
    </div>
  );
};

export default Feed;
