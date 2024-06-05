import "../../styles/search/searchUserList.scss";
import { useEffect, useState } from "react";
import apiClient from "../../util/BaseUrl";
import UserCard from "../UserCard";
import { useNavigate } from "react-router-dom";
const SearchUserList = ({ searchQuery, tap, onResultsFetched }) => {
  const [userList, setUserList] = useState([]);
  const [hashTagList, setHashTagList] = useState([]);

  const nav = useNavigate();

  useEffect( () => {
    if (searchQuery.trim() !== "") { // 검색어가 빈 문자열이 아닌 경우에만 실행
      const url = tap ? `api/v1/member/search?nickname=${searchQuery}` : `/api/v1/hashtag/${searchQuery}`;
      console.log("검색시작");
        apiClient.get(url)
      
      .then(response => {
          const data = response.data;
          console.log(data);
          console.log(tap)
          if (tap) {
            setUserList(data || []); // 데이터가 없을 경우 빈 배열로 초기화
            onResultsFetched(data || []); // 데이터가 없을 경우 빈 배열로 초기화
          } else {
            setHashTagList(data || []); // 데이터가 없을 경우 빈 배열로 초기화
            onResultsFetched(data || []); // 데이터가 없을 경우 빈 배열로 초기화
          }
        })
        .catch(error => {
          console.error("Error fetching data:", error);
        });
    }
  }, [searchQuery, tap]);

  return (
    <div className="SearchUserList width-370">
  {tap &&
        userList.map((item) => (
          <UserCard
            key={item.memberId}
            onClick={() => nav(`/Profile/${item.memberId}`)}
            userName={item.nickname}
            width={"width-40"}
            height={"height-40"}
            img={item.profile?item.profile:"/public/image/dp.jpg"}
          />
        ))
        }

      {!tap &&
        hashTagList.map((item) => (
          <UserCard
          key={item.memberId}
          onClick={() => nav(`/SearchPost`,{state:{hashtag: item.name}})}
          userName={item.name}
          width={"width-40"}
          height={"height-40"}
          img={"/public/image/images.png"}
        />
        ))}
    </div>
  );
};

export default SearchUserList;
