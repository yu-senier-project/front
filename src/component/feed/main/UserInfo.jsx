import UserCard from "../../UserCard";
import "../../../styles/feed/main/UserInfo.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsis } from "@fortawesome/free-solid-svg-icons";
const UserInfo = ({ username, img, clock, handleSettingButtonClick }) => {
  return (
    <div className="UserInfo" style={{ height: "50px" }}>
      <UserCard
        userName={username}
        width={"width-40"}
        img="public/image/dp.jpg"
      ></UserCard>
      <p className="UserInfo-clock">{clock}</p>
      <button
        className="UserInfo-setting-btn"
        onClick={handleSettingButtonClick}
      >
        <FontAwesomeIcon icon={faEllipsis} />
      </button>
    </div>
  );
};

export default UserInfo;
