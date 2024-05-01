import "../../../styles/feed/main/texts.scss";
const Texts = () => {
  let good = 25;
  let id = "yeongi0111";
  let content = "하이하이";
  return (
    <div className="Texts">
      <p className="Texts-good">좋아요 {good}개</p>
      <p className="Texts-id">{id}</p>
      <p className="Texts-content">{content}</p>
    </div>
  );
};

export default Texts;
