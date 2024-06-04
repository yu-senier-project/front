import "../../../styles/feed/main/texts.scss";
import { renderContent } from "../../../util/MentionHashText";
import { useNavigate } from "react-router-dom";

const Texts = ({
  loveNum,
  nickname,
  comment,
  falseLoveNum,
  hashtags,
  mentions,
}) => {
  const nav = useNavigate();
  return (
    <div className="Texts">
      <p className="Texts-good">좋아요 {falseLoveNum}개</p>
      <div>
        <span className="Texts-id">{nickname}</span>
        <span className="Texts-content" style={{ whiteSpace: "pre-wrap" }}>
          {renderContent(comment, hashtags, mentions, nav)}
        </span>
      </div>
    </div>
  );
};

export default Texts;

// export const renderContent = (text, hashtags, mentions) => {
//   // console.log(hashtags, mentions);
//   // console.log(text, mentions);
//   // 공백을 포함한 분할
//   const parts = text?.split(/(\s+)/);
//   console.log(text);

//   return parts?.map((part, index) => {
//     if (part.startsWith("@")) {
//       let member = mentions?.find((item) => {
//         return `@${item.nickname}` == part;
//       });
//       // console.log(text, mentions);
//       return (
//         <span key={index} className="metionHighlight">
//           {part}
//         </span>
//       );
//     } else if (part.startsWith("#")) {
//       // console.log(part);
//       return (
//         <span key={index} className="hashHighlight">
//           {part}
//         </span>
//       );
//     }
//     return part;
//   });
// };
