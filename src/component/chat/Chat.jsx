import "../../styles/chat/chat.scss";
import "../UserCard";
import ChatUser from "./ChatUser";
import ChatInput from "./ChatInput";

const Chat = ({ id }) => {
  return (
    <div className="Chat width-400">
      <div className="chat-userCard">
        <ChatUser></ChatUser>
        <ChatUser></ChatUser>
        <ChatUser></ChatUser>
        <ChatUser></ChatUser>
        <ChatUser></ChatUser>
        <ChatUser></ChatUser>
        <ChatUser></ChatUser>
        <ChatUser></ChatUser>
        <ChatUser></ChatUser>
        <ChatUser></ChatUser>
        <ChatUser></ChatUser>
        <ChatUser></ChatUser>
        <ChatUser></ChatUser>
      </div>
      <ChatInput></ChatInput>
    </div>
  );
};

export default Chat;
