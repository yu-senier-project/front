import "../../css/register/RegisterCompanyPositionSearch.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const RegisterCompanyPositionSearch = ({ setPositon, 회원가입단계변경 }) => {
  const nav = useNavigate();

  const [position, setPosition] = useState("");

  const check = () => {};

  const onNextButton = () => {
    if (position.length <= 1) {
      alert("2글자 이상 입력해주세요");
      return;
    } else {
      setPositon(position);
      회원가입단계변경(2);
    }
  };

  const handleEnter = (e) => {
    if (e.key == "Enter") {
      onNextButton();
    }
  };

  return (
    <div className="RegisterCompanyPositionSearch">
      <input
        type="text"
        placeholder="직무를 입력해주세요"
        value={position}
        onChange={(e) => {
          setPosition(e.target.value);
        }}
        onKeyDown={handleEnter}
      />
      <FontAwesomeIcon
        icon={faMagnifyingGlass}
        className="RegisterCompanyPositionSearch-searchIcon"
      />
      <button
        className="register-modal-nextBtn RegisterCompanyPositionSearch-button"
        onClick={onNextButton}
      >
        다음
      </button>
    </div>
  );
};

export default RegisterCompanyPositionSearch;
