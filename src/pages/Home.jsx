import SmallNav from "../component/nav/SmallNav";
import Feed from "../component/feed/main/Feed";
import useCreateFeed from "../store/feed/useCreateFeed";
import CreateFeed from "../component/feed/create/CreateFeed";
const Home = () => {
  const { toggle } = useCreateFeed((state) => state);

  return (
    <div className="Home">
      {toggle && <CreateFeed></CreateFeed>}
      <Feed></Feed>
      <Feed></Feed>
      <Feed></Feed>
    </div>
  );
};

export default Home;
