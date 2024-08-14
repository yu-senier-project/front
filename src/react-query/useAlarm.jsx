import { useInfiniteQuery } from "@tanstack/react-query";
import { getAllAlarms } from "../apis/alarmApis";

// 무한 스크롤로 알람 데이터 가져오기
export const useGetAlarmAll = () => {
  const { data, isLoading, ...rest } = useInfiniteQuery({
    queryKey: ["alarmAll", localStorage.getItem("userName")],
    queryFn: ({ pageParam }) => getAllAlarms(pageParam),
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => {
      if (
        lastPage &&
        allPages &&
        Array.isArray(lastPage) &&
        // 알람 갯수가 15개 이므로 15개보다 적으면 다음 페이지가 없다는 뜻
        lastPage.length === 15
      ) {
        return lastPage[lastPage.length - 1]?.notificationId;
      } else return undefined;
    },
    refetchOnWindowFocus: false,
    retry: 0,
  });

  // 여기서 데이터 가공하면 좋을 듯

  return { data: data?.pages, isLoading, ...rest };
};
