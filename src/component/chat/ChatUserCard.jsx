import "../../styles/chat/chatUserCard.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
const ChatUserCard = ({ userName, comment, imgWidth, img, commentWidth }) => {
  const imgClassName = `width-${imgWidth}`;
  const textClassName = `ChatUserCard-text width-${commentWidth}`;
  return (
    <div className="ChatUserCard">
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
          <span style={{ marginRight: "10px" }}>답글 달기</span>
          <span>좋아요 10개</span>
        </div>
      </div>
      <div className="ChatUser-HeartBtn">
        <button>
          <FontAwesomeIcon icon={faHeart} />
        </button>
      </div>
    </div>
  );
};

export default ChatUserCard;
