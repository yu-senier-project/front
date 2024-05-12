import React from "react";
import "../../styles/chat/chatUserCard.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import { postCommentReply } from "../../apis/feedApis";

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
}) => {
  const imgClassName = `width-${imgWidth}`;
  const textClassName = `ChatUserCard-text width-${commentWidth}`;
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
          {loveNum == 0 ? null : (
            <span className="ChatUserCard-chat-grey">좋아요 {loveNum}개</span>
          )}
        </div>
      </div>
      <div className="ChatUserCard-HeartBtn ">
        <button>
          <FontAwesomeIcon icon={faHeart} />
        </button>
      </div>
    </div>
  );
};
