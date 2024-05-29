import React, { useEffect, useState, useRef } from "react";
import { useParams, useNavigate, useSearchParams } from "react-router-dom";
import "dhtmlx-gantt/codebase/dhtmlxgantt.css";
import useProjectStore from "../../store/project/useProjectStore";
import { HiOutlineDotsVertical } from "react-icons/hi";
import "../../styles/project/ProjectPost.scss";
import apiClient from "../../util/BaseUrl";
import UserCard from "../../component/UserCard";
import { formatDistanceToNow } from 'date-fns';
import { FaRegFaceMeh, FaRegFaceSmile } from "react-icons/fa6";
import { FaRegAngry } from "react-icons/fa";
import { Loading } from "../../component/basic/Loading";

export default function ProjectPost() {
  const { setProjectId, setTitle: setProjectTitle } = useProjectStore();
  const { projectId } = useParams();
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [searchParams] = useSearchParams();
  const [loadingMore, setLoadingMore] = useState(false);
  const [title, setTitle] = useState(searchParams.get("title"));
  const [posts, setPosts] = useState([]);
  const [postContent, setPostContent] = useState('');
  const memberId = localStorage.getItem("memberId");
  const loaderRef = useRef(null);
  const nav = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);  // 데이터 로딩 시작
      try {
        const response = await apiClient.get(`/api/v1/project/${projectId}/post?cursorValue=${page}`);
        setPosts(response.data);  // 데이터 설정
        setLoading(false);  // 로딩 완료
      } catch (error) {
        console.error("Failed to fetch posts:", error);
        setLoading(false);  // 오류 발생 시 로딩 중단
      }
    };
    fetchData();
  }, [projectId]);

  const loadItems = async () => {
    console.log("loadItems 함수 실행");  // 확인용 로그
    if (!hasMore || loadingMore) return;  // 추가 데이터가 없거나 이미 로딩 중이면 함수 종료

    setLoadingMore(true);  // 데이터 로딩 시작
    try {
      const response = await apiClient.get((`/api/v1/project/${projectId}/post?cursorValue=${page + 1}`));
      console.log(response);
      if (response.data.length === 0) {
        setHasMore(false);
      } else {
        setPosts(prevPosts => [...prevPosts, ...response.data]);
        setPage(prevPage => prevPage + 1);
      }
    } catch (error) {
      console.error("무한스크롤 실패", error);
    }
    setLoadingMore(false);  // 데이터 로딩 완료
  };

  const handleObserver = (entries) => {
    const target = entries[0];
    console.log("IntersectionObserver 호출됨", target.isIntersecting);  // 확인용 로그
    if (target.isIntersecting && !loadingMore) {
      console.log("target이 교차됨");  // 확인용 로그
      loadItems();
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(handleObserver, {
      root: null,
      rootMargin: "20px",
      threshold: 1.0
    });

    console.log("IntersectionObserver 설정됨");  // 확인용 로그

    if (loaderRef.current) {
      console.log("loaderRef.current 있음", loaderRef.current);  // 확인용 로그
      observer.observe(loaderRef.current);
    }

    return () => {
      if (loaderRef.current) {
        observer.unobserve(loaderRef.current);
      }
    };
  }, [hasMore, loadingMore]);

  const parseDate = (dateArray) => {
    const [year, month, day, hour, minute, second, millisecond] = dateArray;
    return new Date(year, month - 1, day, hour, minute, second, millisecond / 1000000);
  };

  const formatDistanceToNowInKorean = (date) => {
    const distance = formatDistanceToNow(date, { addSuffix: true });
    const translations = {
      'about 1 hour ago': '1시간 전',
      'hours ago': '시간 전',
      'minute ago': '분 전',
      'minutes ago': '분 전',
      'day ago': '일 전',
      'days ago': '일 전',
      'month ago': '개월 전',
      'months ago': '개월 전',
      'year ago': '년 전',
      'years ago': '년 전',
    };
    const translated = distance
      .replace(/about /g, '')
      .replace(/ hours? ago/g, translations['hours ago'])
      .replace(/ minutes? ago/g, translations['minutes ago'])
      .replace(/ days? ago/g, translations['days ago'])
      .replace(/ months? ago/g, translations['months ago'])
      .replace(/ years? ago/g, translations['years ago'])
      .replace(/ minute ago/g, translations['minute ago'])
      .replace(/ day ago/g, translations['day ago'])
      .replace(/ month ago/g, translations['month ago'])
      .replace(/ year ago/g, translations['year ago']);

    return translated;
  };

  const createPost = async (content) => {
    try {
      const response = await apiClient.post(`/api/v1/project/${projectId}/post`, { content });
      console.log('Post created:', response);
      setPostContent('');
      window.location.reload();
    } catch (error) {
      console.error('Failed to create post:', error);
    }
  };

  const clickReaction = async (postId, buttonId) => {
    const postIndex = posts.findIndex(post => post.id === postId);
    if (postIndex === -1) return;  // 게시글을 찾지 못한 경우 함수 종료

    const post = posts[postIndex];
    const currentReaction = post.userReaction;
    const isRemovingReaction = currentReaction === buttonId;

    // 옵티미스틱 업데이트를 위해 먼저 UI를 업데이트
    const updatedPosts = [...posts]; // 게시물 배열 복사
    const updatedPost = {
      ...post,
      userReaction: isRemovingReaction ? null : buttonId,
      prosCnt: post.prosCnt + (buttonId === 'PROS' ? (isRemovingReaction ? -1 : 1) : 0),
      consCnt: post.consCnt + (buttonId === 'CONS' ? (isRemovingReaction ? -1 : 1) : 0),
      checkCnt: post.checkCnt + (buttonId === 'CHECK' ? (isRemovingReaction ? -1 : 1) : 0),
    };
    updatedPosts[postIndex] = updatedPost; // 업데이트된 게시글을 배열에 적용
    setPosts(updatedPosts); // 상태 업데이트

    try {
      if (isRemovingReaction) {
        // 반응 제거
        await apiClient.delete(`/api/v1/project/${projectId}/post/${postId}/opinion`);
      } else {
        // 반응 추가 또는 변경
        const data = { type: buttonId };
        await apiClient.post(`/api/v1/project/${projectId}/post/${postId}/opinion`, data);
      }
      // 성공적으로 반응을 업데이트 했으면 추가 작업 없음
    } catch (error) {
      console.error("Reaction update failed", error);
      // 에러 발생 시 롤백을 수행
      setPosts(posts); // 이전 상태로 복원
    }
  };
  
  if (loading) {
    return <Loading text="로딩 중..." />;
  }

  return (
    <div className="project-post">
      <h2>
        <button>
          <HiOutlineDotsVertical size={20} />
        </button>
        {title}
      </h2>
      <div className="create-post">
        <div className="create-top">
          <UserCard
            onClick={() => nav(`/Profile/${memberId}`)}
            userName={localStorage.getItem("userNickName")}
            width={"width-40"}
            height={"height-40"}
            img={"/public/image/dp.jpg"}
          />
          <button onClick={() => createPost(postContent)}>작성</button>
        </div>
        <input
          placeholder="게시글 작성.."
          id="write-area"
          value={postContent}
          onChange={e => setPostContent(e.target.value)}
        />
      </div>
      <ul className="view-posts">
        {posts.map(item => (
          <li key={item.id} className="view-post">
            <div style={{ display: "flex" }}>
              <UserCard
                onClick={() => nav(`/Profile/${item.postMember.id}`)}
                userName={item.postMember.nickname}
                width={"width-40"}
                height={"height-40"}
                img={"/public/image/dp.jpg"}
              />
              <p style={{ margin: "10px", color: "rgb(210, 210, 210)" }}>
                {formatDistanceToNowInKorean(parseDate(item.createdAt))}
              </p>
            </div>
            <p>{item.content}</p>
            <div className="reaction-area">
              <button
                className={`reaction pros ${item.opinion === 'PROS' ? 'actived' : ''}`}
                onClick={() => clickReaction(item.id, 'PROS')}
                disabled={item.opinion !== null && item.opinion !== 'PROS'}
              >
                <FaRegFaceSmile size={30} /> {item.prosCnt}
              </button>
              <button
                className={`reaction check ${item.opinion === 'CHECK' ? 'actived' : ''}`}
                onClick={() => clickReaction(item.id, 'CHECK')}
                disabled={item.opinion !== null && item.opinion !== 'CHECK'}
              >
                <FaRegFaceMeh size={30} /> {item.checkCnt}
              </button>
              <button
                className={`reaction cons ${item.opinion === 'CONS' ? 'actived' : ''}`}
                onClick={() => clickReaction(item.id, 'CONS')}
                disabled={item.opinion !== null && item.opinion !== 'CONS'}
              >
                <FaRegAngry size={30} /> {item.consCnt}
              </button>
            </div>
          </li>
        ))}
      </ul>
      <div ref={loaderRef} style={{ height: '100px', margin: '10px' }}>
        {loadingMore && "게시글 불러오는중..."}
      </div>
    </div>
  );
}
