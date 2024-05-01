import "../../../styles/feed/main/feed.scss";
import Buttons from "./Buttons";
import Imgs from "./Imgs";
import Texts from "./Texts";
import ChatButton from "./ChatButton";
import UserInfo from "./UserInfo";
const Feed = () => {
  return (
    <div className="Feed">
      <div className="Feed-userInfo">
        <UserInfo></UserInfo>
      </div>
      <div className="main-img">
        <Imgs></Imgs>
        <Buttons></Buttons>
        <Texts></Texts>
        <ChatButton></ChatButton>
      </div>
    </div>
  );
};

export default Feed;
