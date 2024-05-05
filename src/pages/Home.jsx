import Feed from "../component/feed/main/Feed";

const Home = () => {
  const feedList = [
    {
      id: 1,
      nickname: "yeongi",
      clock: "1시간전",
      loveNum: "20",
      comment: "하이하이",
    },
    {
      id: 2,
      nickname: "park",
      clock: "1시간전",
      loveNum: "10",
      comment: "betebet",
    },
    {
      id: 3,
      nickname: "yeongi",
      clock: "1시간전",
      loveNum: "20",
      comment: "하이하이",
    },
  ];

  return (
    <div className="Home">
      {feedList.map((item, idx) => (
        <Feed feedList={item} key={item.id}></Feed>
      ))}
    </div>
  );
};

export default Home;
