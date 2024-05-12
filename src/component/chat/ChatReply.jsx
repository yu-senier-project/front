import React from "react";
import { useState } from "react";
import { ChatReplyUserCard } from "./ChatReplyUserCard";
import { getFeedCommentReply } from "../../apis/feedApis";
import { useQuery } from "@tanstack/react-query";
export const ChatReply = ({ replyNum, onClickReply, postId, commentId }) => {
  const [isOpen, setIsOpen] = useState(false);

  const onOpen = () => {
    setIsOpen(!isOpen);
  };

  const { isLoading, data, isError } = useQuery({
    queryKey: ["feedReplys", postId, commentId],
    queryFn: () => getFeedCommentReply(postId, commentId),
    onSuccess: (data) => {
      console.log(data);
    },
    enabled: !!isOpen,
    staleTime: 1000 * 60 * 5,
  });

  return (
    <div className="ChatReply">
      <div className="ChatReply-openButton">
        {replyNum !== 0 ? (
          !isOpen ? (
            <span onClick={onOpen} className="ChatUserCard-chat-grey">
              ㅡ 답글 {replyNum}개 보기
            </span>
          ) : (
            <span onClick={onOpen} className="ChatUserCard-chat-grey">
              ㅡ 답글 숨기기
            </span>
          )
        ) : null}
      </div>
      {isOpen ? (
        <div
          className="ChatReply-user"
          style={{ marginTop: "10px", width: "100%" }}
        >
          {data?.data?.map((item) => (
            <ChatReplyUserCard
              onClickReply={onClickReply}
              img="public/image/dp.jpg"
              imgWidth={30}
              commentWidth={235}
              userName={item.postMember.nickname}
              comment={item.content}
              loveNum={item.likeCnt}
            ></ChatReplyUserCard>
          ))}

          {/* <ChatReplyUserCard
            onClickReply={onClickReply}
            img="public/image/dp.jpg"
            imgWidth={30}
            commentWidth={235}
            userName={"yeosdfngi"}
            comment={"안녕하세요"}
            loveNum={5}
          ></ChatReplyUserCard>
          <ChatReplyUserCard
            onClickReply={onClickReply}
            img="public/image/dp.jpg"
            imgWidth={30}
            commentWidth={235}
            userName={"yeagi"}
            comment={"안녕하세요"}
            loveNum={5}
          ></ChatReplyUserCard> */}
        </div>
      ) : null}
    </div>
  );
};
