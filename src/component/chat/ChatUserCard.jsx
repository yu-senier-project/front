import "../../styles/chat/chatUserCard.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import { faEllipsis } from "@fortawesome/free-solid-svg-icons";
import { ChatReply } from "./ChatReply";

const ChatUserCard = ({
  userName,
  comment,
  imgWidth,
  img,
  commentWidth,
  loveNum,
  replyNum,
  onClickReply,
  commentId,
  postId,
}) => {
  const myName = localStorage.getItem("userNickName");
  const imgClassName = `width-${imgWidth}`;
  const textClassName = `ChatUserCard-text width-${commentWidth}`;
  return (
    <div style={{ marginBottom: "15px" }}>
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
            <span
              className="ChatUserCard-chat-grey"
              style={{ marginRight: "10px" }}
              onClick={() => {
                onClickReply(userName, commentId);
              }}
            >
              답글 달기
            </span>
            {myName == userName ? (
              <span className="ChatUserCard-setting-btn">
                <FontAwesomeIcon icon={faEllipsis} />{" "}
              </span>
            ) : null}
            {loveNum == 0 ? null : (
              <span className="ChatUserCard-chat-grey">좋아요 {loveNum}개</span>
            )}
          </div>
        </div>
        <div className="ChatUserCard-HeartBtn">
          <button>
            <FontAwesomeIcon icon={faHeart} />
          </button>
        </div>
      </div>
      <div className="ChatUserCard-reply">
        <div>
          <ChatReply
            postId={postId}
            commentId={commentId}
            replyNum={replyNum}
            onClickReply={onClickReply}
          ></ChatReply>
        </div>
      </div>
    </div>
  );
};

export default ChatUserCard;
