import Feed from "../component/feed/main/Feed";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getAllFeed } from "../apis/feedApis";
import { useState } from "react";
import { Loading } from "../component/basic/Loading";
const Home = () => {
  const [images, setImages] = useState();
  const { isLoading, data, error } = useQuery({
    queryKey: ["feeds"],
    queryFn: getAllFeed,
    refetchOnWindowFocus: true, // 포커스 변경시에는 자동 새로 고침이 발생하지 않습니다.
    staleTime: 1000 * 60 * 5, // 데이터가 5분 후에 스테일하다고 판단합니다.
  });

  if (isLoading) {
    return (
      <div>
        <Loading text={"게시물 불러오는중 ..."}></Loading>
      </div>
    );
  }

  const list = data?.data;

  const feedList = list?.map((item) => ({
    id: item.id,
    content: item.content,
    isCommentEnabled: item.isCommentEnabled,
    fileCnt: item.fileCnt,
    createdAt: item.createdAt,
    loveNum: item.likeCnt,
    nickname: item.postMember.nickname,
    commentCnt: item.commentCnt,
  }));

  return (
    <div className="Home">
      {feedList?.map((item, idx) => (
        <Feed feedList={item} key={item.id}></Feed>
      ))}
    </div>
  );
};

export default Home;
