import UserCard from "../../UserCard";
import "../../../styles/feed/main/UserInfo.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsis } from "@fortawesome/free-solid-svg-icons";
const UserInfo = () => {
  return (
    <div className="UserInfo">
      <UserCard
        userName="yeongi011"
        width={"width-45"}
        img="public/image/dp.jpg"
      ></UserCard>
      <p className="UserInfo-clock">1시간전</p>
      <button className="UserInfo-setting-btn">
        <FontAwesomeIcon icon={faEllipsis} />
      </button>
    </div>
  );
};

export default UserInfo;
