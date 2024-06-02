// 해시태그랑 멘션 텍스트 스타일링 주는 함수
import { Link } from "react-router-dom";
export const renderContent = (text, hashtags, mentions, nav) => {
  // 공백을 포함한 분할
  const parts = text?.split(/(\s+)/);

  return parts?.map((part, index) => {
    if (part.startsWith("@")) {
      let member = mentions?.find((item) => {
        return `@${item.nickname}` == part;
      });
      return (
        <Link to={`/profile/${member?.memberId}`}>
          <span key={index} className="metionHighlight">
            {part}
          </span>
        </Link>
      );
    } else if (part.startsWith("#")) {
      // console.log(part);
      return (
        <span key={index} className="hashHighlight">
          {part}
        </span>
      );
    }
    return part;
  });
};
