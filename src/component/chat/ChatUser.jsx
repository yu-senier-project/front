import ChatUserCard from "./ChatUserCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import "../../styles/chat/chatUser.scss";
const ChatUser = () => {
  return (
    <div className="ChatUser">
      <ChatUserCard
        img="public/image/dp.jpg"
        imgWidth={40}
        userName={"yenogi"}
        comment={"안녕하세요"}
        commentWidth={270}
      ></ChatUserCard>
    </div>
  );
};

export default ChatUser;
