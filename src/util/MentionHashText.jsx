// 해시태그랑 멘션 텍스트 스타일링 주는 함수

export const renderContent = (text, hashtags, mentions) => {
  // console.log(hashtags, mentions);

  // 공백을 포함한 분할
  const parts = text?.split(/(\s+)/);

  return parts?.map((part, index) => {
    if (part.startsWith("@")) {
      // console.log(part);
      return (
        <span key={index} className="metionHighlight">
          {part}
        </span>
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
