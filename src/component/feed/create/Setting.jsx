import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown, faCaretUp } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import "../../../styles/feed/create/setting.scss";

const Setting = () => {
  const [toggle, setToggle] = useState(false);

  const onClick = () => {
    setToggle(!toggle);
  };

  const className = `table-wrap ${toggle ? "up" : "down"}`;

  return (
    <div className="Setting">
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
          <table>
            <tr>
              <label htmlFor="normal">
                <td>일반</td>
              </label>
              <td className="empty"></td>
              <td>
                <input type="radio" id="normal" name="setting" />
              </td>
            </tr>
            <tr>
              <label htmlFor="promotion">
                <td>홍보</td>
              </label>
              <td className="empty"></td>
              <td>
                <input type="radio" name="setting" id="promotion" />
              </td>
            </tr>
            <tr>
              <label htmlFor="recruitment">
                <td>구인구직</td>
              </label>
              <td className="empty"></td>
              <td>
                <input type="radio" name="setting" id="recruitment" />
              </td>
            </tr>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Setting;
