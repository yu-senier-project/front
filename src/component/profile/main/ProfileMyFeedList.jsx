import React from "react";
import { useGetMemberFeed } from "../../../react-query/useProfile";

export const ProfileMyFeedList = ({
  memberId,
  filterType,
  startDate,
  endDate,
}) => {
  let filter;
  let start = 0;
  let end = 0;
  if (filterType == "최신순") {
    filter = "newest";
  } else if (filterType == "오래된 순") {
    filter = "oldest";
  } else if (filterType == "날짜 선택") {
    filter = "period";
    start = startDate;
    end = endDate;
  }

  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useGetMemberFeed(memberId, filter, start, end);

  return <div>ProfileMyFeedList</div>;
};
