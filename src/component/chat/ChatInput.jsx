import "../../styles/chat/chatInput.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useRef, useState } from "react";
import { MentionInput } from "./MentionInput";

const ChatInput = ({ replyUser }) => {
  const [value, setValue] = useState(replyUser);
  const mentionList = useRef([]);
  const hashList = useRef([]);
  const inputRef = useRef(null);
  console.log(mentionList.current, hashList.current);

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

  return (
    <div className="ChatInput">
      <MentionInput
        value={value}
        onChange={onChange}
        inputRef={inputRef}
        replyUser={replyUser}
        mentionList={mentionList}
        hashList={hashList}
      ></MentionInput>

      <div className="ChatInput-submit">
        <button>
          <FontAwesomeIcon icon={faPaperPlane} />
        </button>
      </div>
    </div>
  );
};

export default ChatInput;
