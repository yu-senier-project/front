import "../../../styles/feed/main/texts.scss";
const Texts = ({ loveNum, nickname, comment }) => {
  let good = 25;
  let id = "yeongi0111";
  let content = "하이하이";
  return (
    <div className="Texts">
      <p className="Texts-good">좋아요 {loveNum}개</p>
      <p className="Texts-id">{nickname}</p>
      <p className="Texts-content">{comment}</p>
    </div>
  );
};

export default Texts;
