import "../../styles/chat/chatInput.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useRef, useState } from "react";
import { MentionInput } from "./MentionInput";
import { postComment, postCommentReply } from "../../apis/feedApis";
import { useMutation } from "@tanstack/react-query";
import { Loading } from "../basic/Loading";
import { useQueryClient } from "@tanstack/react-query";

const ChatInput = ({
  replyUser,
  postId,
  commentId,
  setReplyUser,
  setCommentId,
}) => {
  const [value, setValue] = useState(replyUser == "" ? "" : replyUser);

  const mentionList = useRef([]);
  const hashList = useRef([]);
  const inputRef = useRef(null);
  const queryClient = useQueryClient();

  useEffect(() => {
    // 답글 달기 눌렀을 때 해당 사용자 닉네임 인풋창에 추가하고, 멘션 리스트에 넣기 이 값은 나중에 서버로 보낼것
    mentionList.current = [];
    if (replyUser !== "") {
      mentionList.current.push(replyUser);
    }
    setValue(replyUser + " ");
    inputRef.current.focus();
  }, [replyUser]);

  const onChange = (e) => {
    setValue(e);
  };

  // 댓글 달기
  const { mutate: commentMutate, status: commentStatus } = useMutation({
    mutationFn: postComment,
    onError: (e) => {
      console.log(e);
    },
    onMutate: async (newComment) => {
      // 캐시에 있는 이전 댓글을 저장
      const previousComments = queryClient.getQueryData([
        "feedComment",
        postId,
      ]);

      let newData = {
        commentId: 0,
        commentReplyCnt: 0,
        content: newComment.content,
        createAt: [2024, 1, 1, 1, 1, 1, 752664000],
        likeCnt: 0,
        postMember: {
          id: localStorage.getItem("memberId"),
          nickname: localStorage.getItem("userNickName"),
          profile:
            previousComments.data.length !== 0
              ? previousComments?.data[0].postMember.profile
              : "/image/dp.jpg",
        },
      };

      // 새 댓글을 캐시에 추가
      queryClient.setQueryData(["feedComment", postId], (old) => {
        return { data: [...old.data, newData] };
      });

      return () =>
        queryClient.setQueryData(["feedComment", postId], previousComments);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["feedComment", postId]);
    },
  });

  // 답글 달기기
  const { mutate: replyMutate, status: replyStatus } = useMutation({
    mutationFn: postCommentReply,
    onMutate: async (newComment) => {
      // 캐시에 있는 이전 댓글을 저장합니다.
      const previousCommentsReply = queryClient.getQueryData([
        "feedReplys",
        postId,
        commentId,
      ]);

      let newData = {
        commentId: 0,
        commentReply: 0,
        content: newComment.content,
        createAt: [2024, 1, 1, 1, 1, 1, 752664000],
        likeCnt: 0,
        postMember: {
          id: localStorage.getItem("memberId"),
          nickname: localStorage.getItem("userNickName"),
          profile:
            previousCommentsReply?.data.length !== 0
              ? previousCommentsReply?.data[0].postMember.profile
              : "/image/dp.jpg",
        },
      };

      // 새 댓글을 캐시에 추가합니다.
      queryClient.setQueryData(["feedReplys", postId, commentId], (old) => {
        if (old) {
          return { data: [...old.data, newData] };
        } else {
          return { data: [newData] };
        }
      });

      // 롤백 함수를 반환합니다. 이 함수는 뮤테이션 실패 시 호출됩니다.
      return () =>
        queryClient.setQueryData(
          ["feedReplys", postId, commentId],
          previousCommentsReply
        );
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["feedComment", postId]);
    },
    onError: (err, newComment, rollback) => {
      console.log(err);
      rollback();
    },
  });

  const onSubmit = () => {
    if (value == "" || value == null || value == undefined) {
      alert("댓글을 입력하세요.");
      return;
    }
    let data;
    let reply = false;
    if (commentId == 0) {
      data = {
        postId: postId,
        content: value,
        mention: mentionList.current,
      };
      reply = true;
    } else {
      data = {
        commentId: commentId,
        postId: postId,
        content: value,
        mention: mentionList.current,
      };
    }
    if (reply) {
      commentMutate(data);
    } else {
      replyMutate(data);
    }
    setCommentId(0);
    setValue("");
    setReplyUser("");
  };

  const onKeyDown = (e) => {
    if (e.key == "Enter") {
      e.preventDefault();
      if (value.trim() === "") {
        alert("댓글을 입력하세요.");
        return;
      }
      onSubmit();
    }
  };

  return (
    <div className="ChatInput">
      <MentionInput
        value={value}
        onChange={onChange}
        inputRef={inputRef}
        replyUser={replyUser}
        mentionList={mentionList}
        hashList={hashList}
        onKeyDown={onKeyDown}
      ></MentionInput>

      <div className="ChatInput-submit">
        <button onClick={onSubmit}>
          <FontAwesomeIcon icon={faPaperPlane} />
        </button>
      </div>
    </div>
  );
};

export default ChatInput;
