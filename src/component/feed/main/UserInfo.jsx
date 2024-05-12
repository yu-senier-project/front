import UserCard from "../../UserCard";
import "../../../styles/feed/main/UserInfo.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsis } from "@fortawesome/free-solid-svg-icons";
import { getTime } from "./getTime";

const UserInfo = ({ username, img, clock, handleSettingButtonClick }) => {
  let time = `${clock[0]}-${clock[1]}-${clock[2]} ${clock[3]}:${clock[4]}:${clock[5]}`;
  time = new Date(time).getTime();
  let currentTime = new Date().getTime();
  let diffTime = (currentTime - time) / (1000 * 60);
  // 시간 저장
  time = getTime(diffTime);

  const myName = localStorage.getItem("userNickName");

  return (
    <div className="UserInfo" style={{ height: "50px" }}>
      <UserCard
        userName={username}
        width={"width-40"}
        img="public/image/dp.jpg"
      ></UserCard>
      <p className="UserInfo-clock">{time}</p>
      {myName == username ? (
        <button
          className="UserInfo-setting-btn"
          onClick={handleSettingButtonClick}
        >
          <FontAwesomeIcon icon={faEllipsis} />
        </button>
      ) : null}
    </div>
  );
};

export default UserInfo;
