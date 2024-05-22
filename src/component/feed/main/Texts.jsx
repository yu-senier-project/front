import "../../../styles/feed/main/texts.scss";
const Texts = ({ loveNum, nickname, comment, falseLoveNum }) => {
  return (
    <div className="Texts">
      <p className="Texts-good">좋아요 {falseLoveNum}개</p>
      {nickname !== "" && (
        <div>
          <span className="Texts-id">{nickname}</span>
          <span className="Texts-content" style={{ whiteSpace: "pre-wrap" }}>
            {comment}
          </span>
        </div>
      )}
    </div>
  );
};

export default Texts;
