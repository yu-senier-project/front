import Feed from "../component/feed/main/Feed";
import { useInfiniteQuery } from "@tanstack/react-query";
import { getAllFeed } from "../apis/feedApis";
import FeedSkeletonList from "../component/skeleton/feedSkeletonList";

const Home = () => {
  // 게시물 받아오는 함수
  const fetchFeeds = ({ pageParam = { lastId: 0, nextPage: 1 } }) => {
    const { lastId, nextPage } = pageParam;
    return getAllFeed(lastId, nextPage);
  };

  // 무한 스크롤 구현 부분
  const { isLoading, data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ["feeds"],
      queryFn: fetchFeeds,
      getNextPageParam: (lastPage, pages) => {
        const lastId = lastPage?.data?.length
          ? lastPage.data[lastPage.data.length - 1].id
          : -1;
        if (lastPage.data.length !== 10) return undefined;
        return lastId !== -1
          ? { lastId, nextPage: pages.length + 1 }
          : undefined;
      },
      staleTime: 5 * 60 * 1000, // 5 minutes
      retry: 3,
      refetchOnMount: true,
      refetchOnWindowFocus: true,
      refetchOnReconnect: true,
    });

  // 초기 로딩 상태
  if (isLoading) {
    return <FeedSkeletonList num={5} />;
  }

  // 화면 끝에 도달했는지 확인하는 함수
  const handleScroll = (e) => {
    const { scrollTop, clientHeight, scrollHeight } = e.currentTarget;
    if (hasNextPage && !isFetchingNextPage) {
      if (scrollHeight - scrollTop <= clientHeight + 50) {
        fetchNextPage();
      }
    }
  };

  // 서버에서 받아온 데이터 리스트로 변환
  const feedList = data?.pages.flatMap((page) =>
    page.data.map((item) => ({
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
      hashList: ["#하이요"],
    }))
  );

  return (
    <div
      className="Home"
      onScroll={handleScroll}
      style={{ height: "100vh", overflow: "auto" }}
    >
      {feedList?.map((item) => (
        <Feed feedList={item} key={item.id} />
      ))}
      {isFetchingNextPage && <FeedSkeletonList num={5} />}
    </div>
  );
};

export default Home;
