import React, { useState, useEffect } from "react";
import { useGetMemberFeed } from "../../../react-query/useProfile";
import Feed from "../../feed/main/Feed";
import { ProfileDayFilter } from "./ProfileDayFilter";

export const ProfileMyFeedList = ({ memberId, filterType, start, end }) => {
  let filter;
  if (filterType == "최신순") {
    filter = "newest";
  } else if (filterType == "오래된 순") {
    filter = "oldest";
  } else if (filterType == "날짜 선택") {
    filter = "period";
  } else if (filterType == "좋아요 많은 순") {
    filter = "like";
  }

  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useGetMemberFeed(memberId, filter, start, end);

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
    return item1?.map((item) => ({
      mentions: item.mentions,
      hashtags: item.hashtags,
      memberId: item.postMember?.id,
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
    mentions: item.mentions,
    hashtags: item.hashtags,
    memberId: item.memberId,
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
  }));

  return (
    <div
      className="ProfileMyFeedList"
      onScroll={handleScroll}
      style={{ height: "100vh", overflowY: "scroll", padding: "20px" }}
    >
      {feedList?.map((item, idx) => (
        <Feed feedList={item} key={item.id}></Feed>
      ))}
      {isFetchingNextPage && (
        <div style={{ textAlign: "center" }}>게시글 불러오는중 ...</div>
      )}
    </div>
  );
};
