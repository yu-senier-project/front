import { throttle } from "lodash";
import Feed from "../component/feed/main/Feed";
import {
  useQuery,
  useQueryClient,
  useInfiniteQuery,
} from "@tanstack/react-query";
import { getAllFeed } from "../apis/feedApis";
import { useState } from "react";
import { Loading } from "../component/basic/Loading";
const Home = () => {
  const fetchFeeds = ({ pageParam = 0 }) => getAllFeed(pageParam);
  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
    isLoading,
  } = useInfiniteQuery({
    queryKey: ["feeds"],
    queryFn: fetchFeeds,
    getNextPageParam: (lastPage, pages) => {
      return lastPage
        ? lastPage.data[lastPage.data.length - 1].id ?? false
        : false;
    },
    staleTime: 1000 * 60 * 5,
  });

  const handleScroll = (e) => {
    const { scrollTop, clientHeight, scrollHeight } = e.currentTarget;
    if (scrollHeight - scrollTop === clientHeight) {
      if (hasNextPage && !isLoading) {
        console.log("게시물 불러오기");
        fetchNextPage();
      }
    }
  };

  if (isLoading) {
    return (
      <div>
        <Loading text={"게시물 불러오는중 ..."}></Loading>
      </div>
    );
  }
  console.log(data);

  let list = data?.pages.map((item) => item.data);
  list = list.map((item1) => {
    return item1.map((item) => ({
      id: item.id,
      content: item.content,
      isCommentEnabled: item.isCommentEnabled,
      fileCnt: item.fileCnt,
      createdAt: item.createdAt,
      loveNum: item.likeCnt,
      nickname: item.postMember?.nickname,
      commentCnt: item.commentCnt,
      liked: item.liked,
    }));
  });

  let spreadList;
  spreadList = [...list[0]];
  if (list.length > 1) {
    for (let i = 1; i < list.length; i++) {
      spreadList = [...spreadList, ...list[i]];
    }
  }

  const feedList = spreadList?.map((item) => ({
    id: item.id,
    content: item.content,
    isCommentEnabled: item.isCommentEnabled,
    fileCnt: item.fileCnt,
    createdAt: item.createdAt,
    loveNum: item.loveNum,
    nickname: item.nickname,
    commentCnt: item.commentCnt,
    liked: item.liked,
  }));

  console.log(feedList);

  return (
    <div
      className="Home"
      onScroll={handleScroll}
      style={{ height: "100vh", overflow: "auto" }}
    >
      {feedList?.map((item, idx) => (
        <Feed feedList={item} key={item.id}></Feed>
      ))}
      {!isLoading && isFetchingNextPage && (
        <div style={{ textAlign: "center" }}>게시글 불러오는중 ...</div>
      )}
    </div>
  );
};

export default Home;
