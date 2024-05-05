import { useEffect, useState, useRef } from "react";
import Input from "../basic/Input";
import "../../styles/search/searchInput.scss";
import SearchIcon from "../../util/SearchIcon";
import CloseButton from "../basic/CloseButton";
const SearchInput = () => {
  const [text, setText] = useState("");
  const inputFocus = useRef(null);
  const onChange = (e) => {
    setText(e.target.value);
  };

  const onDelete = () => {
    setText("");
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
      ></Input>
      <SearchIcon style={iconStyle}></SearchIcon>
      <div id="searchIcon-deleteBtn">
        <CloseButton onCloseButton={onDelete}></CloseButton>
      </div>
    </div>
  );
};

export default SearchInput;
