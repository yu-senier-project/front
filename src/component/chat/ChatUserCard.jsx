import "../../styles/chat/chatUserCard.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsis } from "@fortawesome/free-solid-svg-icons";
import { ChatReply } from "./ChatReply";
import {
  postCommentLike,
  deleteCommentLike,
  deleteComment,
} from "../../apis/feedApis";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { FaHeart } from "react-icons/fa6";
import { FaRegHeart } from "react-icons/fa";
import { Setting } from "../basic/Setting";
import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { renderContent } from "../../util/MentionHashText";
const ChatUserCard = ({
  mentions,
  memberId,
  liked,
  userName,
  comment,
  imgWidth,
  img,
  commentWidth,
  loveNum,
  replyNum,
  onClickReply,
  commentId,
  postId,
}) => {
  const nav = useNavigate();
  const myName = localStorage.getItem("userNickName");
  const imgClassName = `width-${imgWidth}`;
  const textClassName = `ChatUserCard-text width-${commentWidth}`;
  const queryClient = useQueryClient();
  const [onSetting, setOnSetting] = useState(false);

  const backgroundRef = useRef(null);

  const onSettingBtn = () => {
    setOnSetting(!onSetting);
  };

  const onDeleteClick = () => {
    const data = {
      postId: postId,
      commentId: commentId,
    };
    deleteChatMutate(data);
    setOnSetting(false);
  };

  // 댓글 삭제
  const { mutate: deleteChatMutate } = useMutation({
    mutationFn: deleteComment,
    onSuccess: (data) => {
      queryClient.invalidateQueries(["feedComment", postId]);
    },
    onMutate: (newData) => {
      console.log(newData);
      const prevData = queryClient.getQueryData(["feedComment", postId]);
      const currentData = {
        data: prevData.data.filter(
          (item) => item.commentId !== newData.commentId
        ),
      };

      queryClient.setQueryData(["feedComment", postId], () => {
        return currentData;
      });
      return () => queryClient.setQueryData(["feedComment", postId], prevData);
    },
  });

  // 댓글 좋아요 삭제
  const { mutate: deleteMutate } = useMutation({
    mutationFn: deleteCommentLike,
    onSuccess: (data) => {
      queryClient.invalidateQueries(["feedComment", postId]);
    },
    onMutate: (newData) => {
      const prevData = queryClient.getQueryData(["feedComment", postId]);
      const currentData = {
        data: prevData.data.map((item) => {
          if (item.commentId == newData.commentId) {
            return {
              commentId: item.commentId,
              commentReplyCnt: item.commentReplyCnt,
              content: item.content,
              createAt: [2024, 1, 1, 1, 1, 1, 1],
              likeCnt: item.likeCnt - 1,
              liked: false,
              postMember: {
                id: item.postMember.id,
                nickname: item.postMember.nickname,
                profile: item.postMember.profile,
              },
            };
          } else {
            return item;
          }
        }),
      };
      queryClient.setQueryData(["feedComment", postId], () => {
        return currentData;
      });
      return () => queryClient.setQueryData(["feedComment", postId], prevData);
    },
  });

  // 댓글 좋아요
  const { mutate: likeMutate } = useMutation({
    mutationFn: postCommentLike,
    onSuccess: () => {
      queryClient.invalidateQueries(["feedComment", postId]);
    },
    onError: (e) => {
      console.log(e);
    },
    onMutate: (newData) => {
      const prevData = queryClient.getQueryData(["feedComment", postId]);
      console.log(prevData);
      const currentData = {
        data: prevData.data.map((item) => {
          if (item.commentId == newData.commentId) {
            return {
              commentId: item.commentId,
              commentReplyCnt: item.commentReplyCnt,
              content: item.content,
              createAt: [2024, 1, 1, 1, 1, 1, 1],
              likeCnt: item.likeCnt + 1,
              liked: true,
              postMember: {
                id: item.postMember.id,
                nickname: item.postMember.nickname,
                profile: item.postMember.profile,
              },
            };
          } else {
            return item;
          }
        }),
      };
      queryClient.setQueryData(["feedComment", postId], () => {
        return currentData;
      });
      return () => queryClient.setQueryData(["feedComment", postId], prevData);
    },
  });

  // 댓글 좋아요 버튼 눌렀을때
  const onLikeClick = () => {
    const data = {
      commentId: commentId,
    };
    if (liked) {
      deleteMutate(data);
    } else {
      likeMutate(data);
    }
  };

  const onClick = (e) => {
    if (e.target !== backgroundRef.current && onSetting) {
      setOnSetting(false);
    }
  };

  const onProfileCilick = () => {
    nav(`/Profile/${memberId}`);
  };

  let likeClassName = `${liked ? "like-red" : null}`;

  return (
    <div style={{ marginBottom: "15px" }} onClick={onClick}>
      <div className="ChatUserCard">
        <img
          id="ChatUserCard-img"
          height={`${imgWidth}px`}
          className={imgClassName}
          src={img}
          alt="프로필사진"
          onClick={() => {
            onProfileCilick();
          }}
        />
        <div className={textClassName}>
          <span className="ChatUserCard-userName" onClick={onProfileCilick}>
            {userName}
          </span>
          <span className="ChatUserCard-commnet">
            {renderContent(comment, [], mentions, null, true)}
          </span>
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
              <span
                className="ChatUserCard-chat-grey"
                style={{ marginRight: "10px" }}
              >
                좋아요 {loveNum}개
              </span>
            )}
            {myName == userName ? (
              <span className="ChatUserCard-setting-btn" onClick={onSettingBtn}>
                <FontAwesomeIcon icon={faEllipsis} />
              </span>
            ) : null}
            {onSetting ? (
              <div className="ChatUserCard-Setting" ref={backgroundRef}>
                <Setting
                  width={150}
                  settingTitleList={[
                    { title: "삭제하기", onClick: onDeleteClick },
                  ]}
                ></Setting>
              </div>
            ) : null}
          </div>
        </div>
        <div className="ChatUserCard-HeartBtn">
          <button onClick={onLikeClick} className={likeClassName}>
            {liked ? <FaHeart /> : <FaRegHeart />}
          </button>
        </div>
      </div>
      <div className="ChatUserCard-reply">
        <div>
          <ChatReply
            postId={postId}
            commentId={commentId}
            replyNum={replyNum}
            onClickReply={onClickReply}
          ></ChatReply>
        </div>
      </div>
    </div>
  );
};

export default ChatUserCard;
