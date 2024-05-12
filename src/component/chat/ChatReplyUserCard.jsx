import React, { useState } from "react";
import "../../styles/chat/chatUserCard.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsis } from "@fortawesome/free-solid-svg-icons";
import {
  postCommentLike,
  deleteCommentLike,
  deleteComment,
} from "../../apis/feedApis";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { FaHeart } from "react-icons/fa6";
import { FaRegHeart } from "react-icons/fa";
import { Setting } from "../basic/Setting";
export const ChatReplyUserCard = ({
  userName,
  comment,
  imgWidth,
  img,
  commentWidth,
  loveNum,
  onClickReply,
  postId,
  commentId,
  liked,
  replyId,
}) => {
  const imgClassName = `width-${imgWidth}`;
  const myName = localStorage.getItem("userNickName");
  const textClassName = `ChatUserCard-text width-${commentWidth}`;
  const queryClient = useQueryClient();

  const [onSetting, setOnSetting] = useState(false);

  const onSettingBtn = () => {
    setOnSetting(!onSetting);
  };

  const { mutate: deleteChatMutate } = useMutation({
    mutationFn: deleteComment,
    onSuccess: (data) => {
      queryClient.invalidateQueries(["feedComment", postId]);
    },
  });

  const { mutate: deleteMutate } = useMutation({
    mutationFn: deleteCommentLike,
    onSuccess: (data) => {
      queryClient.invalidateQueries(["feedComment", postId]);
    },
  });

  const { mutate: likeMutate } = useMutation({
    mutationFn: postCommentLike,
    onSuccess: () => {
      queryClient.invalidateQueries(["feedComment", postId]);
    },
    onError: (e) => {
      console.log(e);
    },
  });

  const onLikeClick = () => {
    const data = {
      commentId: replyId,
    };
    if (liked) {
      deleteMutate(data);
    } else {
      likeMutate(data);
    }
  };

  const onDeleteClick = () => {
    const data = {
      postId: postId,
      commentId: replyId,
    };
    deleteChatMutate(data);
    setOnSetting(false);
  };

  let likeClassName = `${liked ? "like-red" : null}`;

  return (
    <div className="ChatUserCard" style={{ marginBottom: "10px" }}>
      <img
        id="ChatUserCard-img"
        height={`${imgWidth}px`}
        className={imgClassName}
        src={img}
        alt="프로필사진"
        onClick={() => {
          handleModal();
        }}
      />
      <div className={textClassName}>
        <span className="ChatUserCard-userName">{userName}</span>{" "}
        <span className="ChatUserCard-commnet">{comment}</span>
        <div className="ChatUserCard-chat">
          <span
            className="ChatUserCard-chat-grey"
            style={{ marginRight: "10px" }}
            onClick={() => {
              onClickReply(userName, commentId);
            }}
          >
            답글 달기
          </span>
          {myName == userName ? (
            <span className="ChatUserCard-setting-btn" onClick={onSettingBtn}>
              <FontAwesomeIcon icon={faEllipsis} />{" "}
            </span>
          ) : null}
          {loveNum == 0 ? null : (
            <span className="ChatUserCard-chat-grey">좋아요 {loveNum}개</span>
          )}
        </div>
      </div>
      <div className="ChatUserCard-HeartBtn ">
        <button onClick={onLikeClick} className={likeClassName}>
          {liked ? <FaHeart /> : <FaRegHeart />}
        </button>
      </div>
      {onSetting ? (
        <Setting
          width={150}
          settingTitleList={[{ title: "삭제하기", onClick: onDeleteClick }]}
        ></Setting>
      ) : null}
    </div>
  );
};
