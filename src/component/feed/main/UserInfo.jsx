import UserCard from "../../UserCard";
import "../../../styles/feed/main/UserInfo.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsis } from "@fortawesome/free-solid-svg-icons";
const UserInfo = ({ username, img, clock }) => {
  return (
    <div className="UserInfo">
      <UserCard
        userName={username}
        width={"width-45"}
        img="public/image/dp.jpg"
      ></UserCard>
      <p className="UserInfo-clock">{clock}</p>
      <button className="UserInfo-setting-btn">
        <FontAwesomeIcon icon={faEllipsis} />
      </button>
    </div>
  );
};

export default UserInfo;
