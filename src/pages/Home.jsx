import Feed from "../component/feed/main/Feed";
import { UpdateFeed } from "../component/feed/delete/UpdateFeed";
const Home = () => {
  const feedList = [
    {
      id: 1,
      nickname: "yeongi",
      clock: "1시간전",
      loveNum: "20",
      comment: "하이하이",
      mention: ["userone", "usertwo"],
      hashtag: ["모이프"],
      isChatOpne: true,
    },
    {
      id: 2,
      nickname: "park",
      clock: "1시간전",
      loveNum: "10",
      comment: "betebet",
      isChatOpne: false,
    },
    {
      id: 3,
      nickname: "yeongi",
      clock: "1시간전",
      loveNum: "20",
      comment: "하이하이",
      isChatOpne: true,
    },
  ];

  const imgList = [
    ["car1.png", "car2.png", "car3.png"],
    ["car1.png", "car2.png", "car3.png"],
    ["car1.png", "car2.png", "car3.png"],
  ];

  return (
    <div className="Home">
      {/* <UpdateFeed></UpdateFeed> */}
      {feedList.map((item, idx) => (
        <Feed feedList={item} key={item.id} imgList={imgList[idx]}></Feed>
      ))}
    </div>
  );
};

export default Home;
