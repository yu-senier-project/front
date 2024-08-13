import React, { useEffect, useRef } from "react";
import { useGetAlarmAll } from "../../react-query/useAlarm";
import { AlarmItem } from "./AlarmItem";

export const AlarmList = () => {
  // 알람 데이터 받아오기
  const { data, isLoading, hasNextPage, fetchNextPage } = useGetAlarmAll();

  const nextFetchTargetRef = useRef(null);

  useEffect(() => {
    const options = {
      root: null, // 뷰포트, Null일 땐 뷰포트는 브라우저창이 기준이 된다.
      rootMargin: "0px",
      threshold: 0.5, // 대상 요소가 얼마나 보일 때 콜백할 것인지 정하는데, 0.5 나는 50%가 보일 때 콜백함수가 실행되도록 했다.
    };

    // entries: IntersectionObserverEntry 객체의 배열
    // observer: IntersectionObserver 인스턴스
    const fetchCallback = (entries, observer) => {
      // 각 항목을 반복하며, 뷰포트와 교차하며 hasNextPage가 true인 경우, fetchNextPage 함수를 호출하고 현재 대상 요소 관찰을 중지!
      entries.forEach((entry) => {
        // entry는 감시중인 요소를 가짐
        if (entry.isIntersecting && hasNextPage) {
          fetchNextPage?.();
          observer.unobserve(entry.target);
        }
      });
    };

    // 지정된 fetchCallback과 options 객체를 이용해서 관찰 객체 인스턴스를 새로 생성한다.
    const observer = new IntersectionObserver(fetchCallback, options);

    // ref 객체가 마운트 될 때
    if (nextFetchTargetRef.current) {
      observer.observe(nextFetchTargetRef.current);
    }

    // ref 객체가 언마운트 될 때
    return () => {
      if (nextFetchTargetRef.current) {
        observer.unobserve(nextFetchTargetRef.current);
      }
    };
  }, [data]);

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
      {!isLoading && hasNextPage && (
        <div ref={nextFetchTargetRef}>더 불러오기</div>
      )}
    </div>
  );
};
