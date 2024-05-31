import "../../styles/chat/chat.scss";
import "../UserCard";

import ChatInput from "./ChatInput";
import { useState } from "react";
import ChatUserCard from "./ChatUserCard";
import { SpinLoading } from "../basic/SpinLoading";

const Chat = ({ id, data, isLoading }) => {
  // 답글 달기 클릭했을 때 인풋창에 해당 유저 띄우게 하는거
  const [replyUser, setReplyUser] = useState("");

  const [commentId, setCommentId] = useState(0);

  const onClickReply = (username, id) => {
    const value = `@${username}`;
    setCommentId(id);
    setReplyUser(value);
  };

  return (
    <div className="Chat width-400">
      <div className="chat-userCard">
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {isLoading ? <SpinLoading size={20}></SpinLoading> : null}
        </div>
        {data?.length !== 0 ? (
          <div>
            {data?.map((item) => (
              <ChatUserCard
                memberId={item.postMember.id}
                liked={item.liked}
                img={
                  item.postMember.profile !== null
                    ? item.postMember.profile
                    : "/image/dp.jpg"
                }
                commentId={item.commentId}
                postId={id}
                userName={item.postMember.nickname}
                comment={item.content}
                replyNum={item.commentReplyCnt}
                loveNum={item.likeCnt}
                imgWidth={40}
                commentWidth={280}
                onClickReply={onClickReply}
              ></ChatUserCard>
            ))}
          </div>
        ) : (
          <div>댓글이 없습니다!</div>
        )}
      </div>
      <ChatInput
        setCommentId={setCommentId}
        postId={id}
        replyUser={replyUser}
        commentId={commentId}
        setReplyUser={setReplyUser}
      ></ChatInput>
    </div>
  );
};

export default Chat;
