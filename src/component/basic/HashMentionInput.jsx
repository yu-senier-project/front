import React, { useEffect, useState } from "react";
import { MentionsInput, Mention } from "react-mentions";
import "../../styles/basic/HashMentionInput.scss";

const HashMentionInput = ({ value, onChange }) => {
  const [mentionText, setMentionText] = useState([]);
  const [hashText, setHashText] = useState([]);
  const style = {
    width: "100%",
    height: "180px",
    input: {
      // backgroundColor: '#121212',
      // color: '#FFF',
      color: "inherit",
      minHeight: "32px",
      outline: "none",
      width: "100%",
      borderRadius: "6px 6px 0 6px",
      border: `none`,
      // fontSize: 18,
      display: "block",
      // lineHeight: 1.5,
    },

    suggestions: {
      list: {
        backgroundColor: "#555",
        border: "1px solid rgba(0,0,0,0.15)",
        fontSize: 14,
      },
      item: {
        padding: "5px 15px",
        borderBottom: "1px solid rgba(0,0,0,0.15)",
        "&focused": {
          backgroundColor: "#cee4e5",
        },
      },
    },
  };

  // @와 # 없애는 함수
  const onClick = () => {
    const result = value.replace(/@\[([\w\s]+)\]\(\d+\)/g, "$1");
    console.log(result);
  };

  // 사용자 추천을 렌더링하는 함수
  const renderUserSuggestion = (suggestion, search, highlightedDisplay) => (
    <div className="user-suggestion">{highlightedDisplay}</div>
  );

  // 입력값이 변경될 때 호출되는 핸들러
  const handleChange = (event, newValue, newPlainTextValue, mentions) => {
    onChange(newValue);
  };

  const handleAddMention = (mention, plainTextValue, index, start, end) => {
    setMentionText([...mentionText, plainTextValue]);
  };

  const handleAddHash = (mention, plainTextValue, index, start, end) => {
    setHashText([...hashText, plainTextValue]);
  };

  return (
    <div>
      <MentionsInput
        placeholder="문구를 입력하세요..."
        id="HashMentionInput"
        value={value}
        onChange={handleChange}
        style={style}
      >
        {/* 사용자 멘션 */}
        <Mention
          style={{ color: "lightblue" }}
          trigger="@"
          data={[
            { id: "1", display: "UserOne" },
            { id: "2", display: "UserTwo" },
            { id: "3", display: "Uswo" },
            { id: "4", display: "UsasdfasdTwo" },
            { id: "5", display: "Userss" },
          ]} // 예
          renderSuggestion={renderUserSuggestion}
          onAdd={handleAddMention}
          appendSpaceOnAdd={true}
        />
        <Mention
          trigger="#"
          data={[
            { id: "1", display: "UserOne" },
            { id: "2", display: "UserTwo" },
            { id: "3", display: "Uswo" },
            { id: "4", display: "UsasdfasdTwo" },
            { id: "5", display: "Userss" },
          ]} // 예
          renderSuggestion={renderUserSuggestion}
          onAdd={handleAddHash}
          appendSpaceOnAdd={true}
        />
      </MentionsInput>
    </div>
  );
};

export default HashMentionInput;
