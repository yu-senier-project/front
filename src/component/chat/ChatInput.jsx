import "../../styles/chat/chatInput.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useRef, useState } from "react";
import { MentionInput } from "./MentionInput";
import { postComment, postCommentReply } from "../../apis/feedApis";
import { useMutation } from "@tanstack/react-query";
import { Loading } from "../basic/Loading";
import { useQueryClient } from "@tanstack/react-query";

const ChatInput = ({ replyUser, postId, commentId }) => {
  const [value, setValue] = useState(replyUser);
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

  const { mutate: commentMutate, status: commentStatus } = useMutation({
    mutationFn: postComment,
    onSuccess: () => {
      queryClient.invalidateQueries(["feedComment", postId]);
    },
    onError: (e) => {
      console.log(e);
    },
  });

  const { mutate: replyMutate, status: replyStatus } = useMutation({
    mutationFn: postCommentReply,
    onSuccess: () => {
      queryClient.invalidateQueries(["feedComment", postId]);
    },
    onError: (e) => {
      console.log(e);
    },
  });

  const onSubmit = () => {
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
    setValue("");
  };

  const onKeyDown = (e) => {
    if (e.key == "Enter") {
      e.preventDefault();
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
