// 해시태그랑 멘션 텍스트 스타일링 주는 함수
import { Link } from "react-router-dom";
export const renderContent = (text, hashtags, mentions, nav, chat) => {
  // 공백을 포함한 분할
  const parts = text?.split(/(\s+)/);

  const onHashClick = (hash) => {
    nav(`/SearchPost`, { state: { hashtag: hash } });
  };

  return parts?.map((part, index) => {
    if (part.startsWith("@")) {
      let member = mentions?.find((item) => {
        return `@${item.nickname}` == part;
      });

      if (member) {
        return (
          <Link to={`/profile/${member?.memberId}`}>
            <span
              key={index}
              className="metionHighlight"
              style={{ wordBreak: "break-word" }}
            >
              {part}
            </span>
          </Link>
        );
      } else {
        return <span key={index}>{part}</span>;
      }
    } else if (part.startsWith("#")) {
      if (!chat) {
        return (
          <span
            key={index}
            className="hashHighlight"
            style={{ wordBreak: "break-word" }}
            onClick={() => {
              onHashClick(part.substr(1));
            }}
          >
            {part}
          </span>
        );
      }
    }

    return part;
  });
};
