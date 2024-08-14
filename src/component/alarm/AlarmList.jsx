import React, { useEffect, useRef } from "react";
import { useGetAlarmAll } from "../../react-query/useAlarm";
import { AlarmItem } from "./AlarmItem";
import { useIntersectionObserve } from "../../hooks/useIntersectionObserve";

export const AlarmList = () => {
  // 알람 데이터 받아오기
  const { data, isLoading, hasNextPage, fetchNextPage, isFetchingNextPage } =
    useGetAlarmAll();

  // 감시할 요소 저장할 ref
  const nextFetchTargetRef = useRef(null);

  // IntersectionObserve 커스텀 훅 가져옴
  useIntersectionObserve({
    ref: nextFetchTargetRef,
    fetchNextPage,
    hasNextPage,
    data,
  });

  if (isLoading) return "로딩중...";

  return (
    <div className="AlarmList">
      {data &&
        Array.isArray(data) &&
        data
          .flat()
          .map((item) => (
            <AlarmItem
              id={item.notificationId}
              text={item.message}
              createdAt={item.createdAt}
              postId={item.subjectId}
              type={item.type}
            />
          ))}
      {isFetchingNextPage && "로딩중..."}
      {!isFetchingNextPage && hasNextPage && (
        <div ref={nextFetchTargetRef}>더 불러오기</div>
      )}
    </div>
  );
};
