import "../../../styles/feed/create/craeteFeed.scss";
import Content from "./Content";
import Setting from "./Setting";
import Image from "./Image";
import CloseButton from "../../basic/CloseButton";
import Button from "../../basic/Button";
import useCreateFeed from "../../../store/feed/useCreateFeed";
const CreateFeed = () => {
  const { setToggle } = useCreateFeed((state) => state);
  const onClose = () => {
    setToggle();
  };
  return (
    <div className="CreateFeed">
      <div className="wrap">
        <div className="top">
          <h3>새 게시물 만들기</h3>
          <div id="createFeed-closeButton">
            <CloseButton size={"18"} onCloseButton={onClose}></CloseButton>
          </div>
        </div>
        <div className="img">
          <Image></Image>
        </div>
        <div className="createFeed-content">
          <Content></Content>
        </div>
        <div className="setting">
          <Setting></Setting>
          <div className="btn-wrap">
            <Button text={"게시글 등록"} fontSize={16}></Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateFeed;
