import "../../styles/search/searchUserList.scss";
import UserCard from "../UserCard";
import useSearchStore from "../../store/search/useSearchStore";
const SearchUserList = () => {
  const { tap } = useSearchStore((state) => state);
  const userList = [
    {
      id: "yeongi",
      img: "public/image/dp.jpg",
    },
    {
      id: "aaaaaa",
      img: "public/image/dp.jpg",
    },
    {
      id: "hello",
      img: "public/image/dp.jpg",
    },
    {
      id: "byebye",
      img: "public/image/dp.jpg",
    },
  ];
  const hashTagList = [
    {
      msg: "해시태그",
      img: "public/image/images.png",
    },
    {
      msg: "해시태그",
      img: "public/image/images.png",
    },
    {
      msg: "해시태그",
      img: "public/image/images.png",
    },
  ];

  return (
    <div className="SearchUserList width-370">
      {tap &&
        userList.map((item) => (
          <UserCard
            comment={item.id}
            img={item.img}
            width={"width-50"}
          ></UserCard>
        ))}

      {!tap &&
        hashTagList.map((item) => (
          <UserCard
            comment={item.msg}
            img={item.img}
            width={"width-50"}
          ></UserCard>
        ))}
    </div>
  );
};

export default SearchUserList;
