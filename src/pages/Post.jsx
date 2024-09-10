import React, { useEffect, useState } from "react";
import { useGetOnePost, useGetOnePostImg } from "../react-query/useAlarm";
import { useParams, useNavigate } from "react-router-dom";
import FeedSkeleton from "../component/skeleton/feedSkeleton";
import ChatModal from "../component/chat/ChatModal";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { deleteFeed } from "../apis/feedApis";
import { UpdateFeed } from "../component/feed/delete/UpdateFeed";

export const Post = () => {
  // 게시물 정보 저장할 state
  const [feedList, setFeedList] = useState(null);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isSettingOpen, setIsSettingOpen] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);
  const [falseLoveNum, setFalseLoveNum] = useState(null);
  const [falseLike, setFalseLike] = useState(null);

  const { id } = useParams();
  const nav = useNavigate();

  const { data, isLoading } = useGetOnePost({ postId: id });
  const { data: imgData, isLoading: imgLoading } = useGetOnePostImg({
    postId: id,
  });

  useEffect(() => {
    if (data) {
      let newFeedList = {
        mentions: data.mentions,
        hashtags: data.hashtags,
        memberId: data.postMember?.id,
        id: data.id,
        content: data.content,
        isCommentEnabled: data.isCommentEnabled,
        fileCnt: data.fileCnt,
        createdAt: data.createdAt,
        loveNum: data.likeCnt,
        nickname: data.postMember?.nickname,
        commentCnt: data.commentCnt,
        liked: data.liked,
        profile: data.postMember?.profile,
        hashList: ["#하이요"],
      };
      setFalseLike(newFeedList.liked);
      setFalseLoveNum(newFeedList.loveNum);
      setFeedList(newFeedList);
    }
  }, [data]);

  const handleChatButtonClick = () => {
    setIsChatOpen(!isChatOpen);
  };

  const handleSettingButtonClick = () => {
    setIsSettingOpen(!isSettingOpen);
  };

  const handleUpdateButtonClick = () => {
    if (!isUpdate) {
      setIsSettingOpen(false);
      setIsUpdate(true);
    }
  };

  const hanldUpdateCloseButtonClick = () => {
    setIsUpdate(false);
  };

  const queryClient = useQueryClient();
  const { status, mutate } = useMutation({
    mutationFn: deleteFeed,
    onSuccess: () => {
      queryClient.invalidateQueries(["feeds"]);
      nav(-1); // Navigate back after successful deletion
    },
    onError: (e) => {
      console.log(e);
    },
  });

  const handleOnDelete = () => {
    const confirmDelete = window.confirm("정말로 삭제하시겠습니까?");
    if (confirmDelete && feedList) {
      mutate(feedList.id);
      setIsSettingOpen(false);
    }
  };

  if (isLoading || imgLoading) {
    return <FeedSkeleton />;
  }

  return (
    <div>
      {feedList && (
        <>
          {isUpdate && (
            <UpdateFeed
              setIsUpdate={setIsUpdate}
              hanldUpdateCloseButtonClick={hanldUpdateCloseButtonClick}
              feedList={feedList}
              imgList={imgData} // imgList를 imgData로 변경
            />
          )}
          {isSettingOpen && (
            <div className="Feed-setting">
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
              />
            </div>
          )}
          <ChatModal
            profile={feedList.profile}
            imgList={imgData}
            feedList={feedList}
            handleUpdateButtonClick={handleUpdateButtonClick}
            handleOnDelete={handleOnDelete}
            handleChatButtonClick={handleChatButtonClick}
            falseLoveNum={falseLoveNum}
            falseLike={falseLike}
            setFalseLike={setFalseLike}
            setFalseLoveNum={setFalseLoveNum}
            chatModal={false}
          />
        </>
      )}
    </div>
  );
};
