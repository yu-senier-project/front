import { useState, useEffect, useRef } from "react";
import Input from "../basic/Input";
import "../../styles/search/searchInput.scss";
import SearchIcon from "../../util/SearchIcon";
import CloseButton from "../basic/CloseButton";

const SearchInput = ({ onSearch, onButtonClick }) => {
  const [text, setText] = useState("");
  const inputFocus = useRef(null);

  const onChange = (e) => {
    setText(e.target.value);
    onSearch(e.target.value);
  };

  const onDelete = () => {
    setText("");
    onSearch(""); // 검색어 초기화
  };

  const handleButtonClick = () => {
    onButtonClick(); // 버튼 클릭 시 부모 컴포넌트로 알림
  };

  const Inputstyle = {
    padding: "0px 35px",
  };

  const iconStyle = {
    top: "6px",
    left: "10px",
    color: "grey",
  };

  useEffect(() => {
    inputFocus.current.focus();
  }, []);

  return (
    <div className="SearchInput">
      <Input
        reference={inputFocus}
        onChange={onChange}
        value={text}
        id="SearchInput-input"
        width={370}
        placeholder={"검색"}
        font={18}
        style={Inputstyle}
      />
      <SearchIcon style={iconStyle} />
      <div id="searchIcon-deleteBtn">
        <CloseButton onCloseButton={onDelete} />
      </div>
      <button onClick={handleButtonClick}>콘솔에 출력</button>
    </div>
  );
};

export default SearchInput;
