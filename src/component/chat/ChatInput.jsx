import Input from "../basic/Input";
import "../../styles/chat/chatInput.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useRef } from "react";

const ChatInput = () => {
  const inputFocus = useRef();
  const style = {
    backgroundColor: "lightgrey",
    paddingRight: "35px",
    border: "none",
  };

  useEffect(() => {
    inputFocus.current.focus();
  }, []);

  return (
    <div className="ChatInput">
      <Input
        width={360}
        placeholder={"댓글 달기..."}
        style={style}
        reference={inputFocus}
      ></Input>
      <div className="ChatInput-submit">
        <button>
          <FontAwesomeIcon icon={faPaperPlane} />
        </button>
      </div>
    </div>
  );
};

export default ChatInput;
