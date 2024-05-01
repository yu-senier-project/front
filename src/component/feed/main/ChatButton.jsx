import "../../../styles/feed/main/chatButton.scss";

const ChatButton = () => {
  let chatNum = 2;
  return (
    <div className="ChatButton">
      {chatNum == 0 ? null : <p>댓글 {chatNum}개 보기</p>}
      <p>댓글 달기</p>
    </div>
  );
};

export default ChatButton;
