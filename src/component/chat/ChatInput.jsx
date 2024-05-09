import "../../styles/chat/chatInput.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useRef, useState } from "react";
import { MentionInput } from "./MentionInput";

const ChatInput = ({ replyUser }) => {
  const [value, setValue] = useState(replyUser);
  const mentionList = useRef([]);
  const inputRef = useRef(null);

  useEffect(() => {
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
