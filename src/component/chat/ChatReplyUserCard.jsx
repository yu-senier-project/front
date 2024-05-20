import React, { useState, useRef } from "react";
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
  id,
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

  // 대댓글 삭제
  const { mutate: deleteChatMutate } = useMutation({
    mutationFn: deleteComment,
    onSuccess: (data) => {
      queryClient.invalidateQueries(["feedComment", postId]);
    },
    onMutate: (newData) => {
      console.log(newData);
      const prevData = queryClient.getQueryData([
        "feedReplys",
        postId,
        commentId,
      ]);
      const currentData = {
        data: prevData.data.filter(
          (item) => item.commentId !== newData.commentId
        ),
      };

      queryClient.setQueryData(["feedReplys", postId, commentId], () => {
        return currentData;
      });
      return () =>
        queryClient.setQueryData(["feedReplys", postId, commentId], prevData);
    },
  });

  // 대댓글 좋아요 삭제
  const { mutate: deleteMutate } = useMutation({
    mutationFn: deleteCommentLike,
    onSuccess: (data) => {
      queryClient.invalidateQueries(["feedComment", postId], { exact: true });
    },
    onMutate: (newData) => {
      console.log(newData);
      const prevData = queryClient.getQueryData([
        "feedReplys",
        postId,
        commentId,
      ]);
      console.log(prevData);
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

      console.log(currentData);
      queryClient.setQueryData(["feedReplys", postId, commentId], () => {
        return currentData;
      });
      return () =>
        queryClient.setQueryData(["feedReplys", postId, commentId], prevData);
    },
  });

  // 대댓글 좋아요
  const { mutate: likeMutate } = useMutation({
    mutationFn: postCommentLike,
    onSuccess: () => {
      queryClient.invalidateQueries(["feedComment", postId], { exact: true });
    },
    onError: (e) => {
      console.log(e);
    },
    onMutate: (newData) => {
      const prevData = queryClient.getQueryData([
        "feedReplys",
        postId,
        commentId,
      ]);
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
      console.log(currentData);

      queryClient.setQueryData(["feedReplys", postId, commentId], () => {
        return currentData;
      });
      return () =>
        queryClient.setQueryData(["feedReplys", postId, commentId], prevData);
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

  const backgroundRef = useRef(null);
  const onClick = (e) => {
    console.log(e.target, backgroundRef.current);
    if (e.target !== backgroundRef.current && onSetting) {
      setOnSetting(false);
    }
  };

  let likeClassName = `${liked ? "like-red" : null}`;

  return (
    <div
      className="ChatUserCard"
      style={{ marginBottom: "10px" }}
      onClick={onClick}
    >
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
        </div>
      </div>
      <div className="ChatUserCard-HeartBtn ">
        <button onClick={onLikeClick} className={likeClassName}>
          {liked ? <FaHeart /> : <FaRegHeart />}
        </button>
      </div>
      {onSetting ? (
        <div className="ChatReplyUserCard-Setting" ref={backgroundRef}>
          <Setting
            width={150}
            settingTitleList={[{ title: "삭제하기", onClick: onDeleteClick }]}
          ></Setting>
        </div>
      ) : null}
    </div>
  );
};
