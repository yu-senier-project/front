import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown, faCaretUp } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import "../../../styles/feed/create/createSetting.scss";

const CreateSetting = ({ onSetIsChat }) => {
  const [toggle, setToggle] = useState(true);

  // 글설정 누르면 글자 나타나도록
  const onClick = () => {
    setToggle(!toggle);
  };
  const className = `table-wrap ${toggle ? "up" : "down"}`;

  const onChange = (e) => {
    onSetIsChat(JSON.parse(e.target.value));
  };

  return (
    <div className="CreateSetting">
      <div className="setting-text">
        <label htmlFor="set-toggle" className="setting-label">
          <span style={{ marginRight: "10px" }}>글 설정</span>
        </label>
        <input
          type="checkbox"
          id="set-toggle"
          style={{ display: "none" }}
          onClick={onClick}
        />
        <FontAwesomeIcon
          onClick={onClick}
          icon={toggle ? faCaretUp : faCaretDown}
          className="arrow"
        />
      </div>
      <div className="radio">
        <div className={className}>
          <div className="radio-item">
            <label htmlFor="open">댓글 열기</label>
            <div>
              <input
                type="radio"
                id="open"
                name="setting"
                value={true}
                onChange={onChange}
              />
            </div>
          </div>
          <div className="radio-item">
            <label htmlFor="close">댓글 닫기</label>
            <div>
              <input
                type="radio"
                name="setting"
                id="close"
                value={false}
                onChange={onChange}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateSetting;
