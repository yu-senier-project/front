import React from "react";
import { useGetLikeFeed } from "../../../react-query/useProfile";
import Feed from "../../feed/main/Feed";

export const ProfileLikeFeedList = ({ memberId }) => {
  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useGetLikeFeed(memberId);

  if (isLoading) {
    return "로딩중...";
  }

  // 화면 끝에 도달했는지 확인하는 함수
  const handleScroll = (e) => {
    const { scrollTop, clientHeight, scrollHeight } = e.currentTarget;

    if (scrollHeight - scrollTop <= clientHeight + 50) {
      if (hasNextPage && !isFetchingNextPage) {
        console.log("게시물 불러오기");
        fetchNextPage();
      }
    }
  };

  // 서버에서 받아온 데이터 저장
  let list = data?.pages.map((item) => item.data);

  list = list?.map((item1) => {
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
      profile: item.postMember?.profile,
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
    profile: item.profile,
    hashList: ["#하이요"],
  }));

  return (
    <div onScroll={handleScroll} style={{ height: "100vh", overflow: "auto" }}>
      {feedList?.map((item, idx) => (
        <Feed feedList={item} key={item.id}></Feed>
      ))}
      {isFetchingNextPage && (
        <div style={{ textAlign: "center" }}>게시글 불러오는중 ...</div>
      )}
    </div>
  );
};
