import React, { useEffect, useState, useRef } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import "dhtmlx-gantt/codebase/dhtmlxgantt.css";
import { HiOutlineDotsVertical } from "react-icons/hi";
import "../../styles/project/ProjectPost.scss";
import apiClient from "../../util/BaseUrl";
import UserCard from "../../component/UserCard";
import { formatDistanceToNow } from "date-fns";
import { FaRegFaceMeh, FaRegFaceSmile } from "react-icons/fa6";
import { FaRegAngry } from "react-icons/fa";
import { Loading } from "../../component/basic/Loading";
import usePreserveQueryParams from "../../hooks/usePreserveQueryParams";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import EditPostModal from "../../modal/EditPostModal";

export default function ProjectPost() {
  const { projectId } = useParams();
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [searchParams] = useSearchParams();
  const [loadingMore, setLoadingMore] = useState(false);
  const [title, setTitle] = useState(searchParams.get("title"));
  const [posts, setPosts] = useState([]);
  const [postContent, setPostContent] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);
  const [currentPostId, setCurrentPostId] = useState();
  const memberId = localStorage.getItem("memberId");
  const loaderRef = useRef(null);
  const preserveQueryParams = usePreserveQueryParams();
  const [newPost, setNewPost] = useState(0);
  const [openModal, setOpenModal] = useState(false);
  const [editContent, setEditContent] = useState("");

  const open = Boolean(anchorEl);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true); // 데이터 로딩 시작
      try {
        const response = await apiClient.get(
          `/api/v1/project/${projectId}/post?cursorValue=${0}`
        );
        setPosts(response.data); // 데이터 설정
        setLoading(false); // 로딩 완료
        setHasMore(true); // 무한 스크롤 상태 초기화
        setPage(0); // 페이지 초기화
      } catch (error) {
        console.error("Failed to fetch posts:", error);
        setLoading(false); // 오류 발생 시 로딩 중단
      }
    };
    fetchData();
  }, [projectId, newPost]);

  const loadItems = async () => {
    if (!hasMore || loadingMore) return; // 추가 데이터가 없거나 이미 로딩 중이면 함수 종료

    setLoadingMore(true); // 데이터 로딩 시작
    try {
      const lastPostId = posts[posts.length - 1]?.id || 0; // posts 배열의 마지막 요소의 ID
      const response = await apiClient.get(
        `/api/v1/project/${projectId}/post?cursorValue=${lastPostId}`
      );

      if (response.data.length === 0) {
        setHasMore(false); // 더 이상 로드할 데이터가 없다면 hasMore를 false로 설정
      } else {
        setPosts((prevPosts) => [...prevPosts, ...response.data]); // 기존 posts 배열에 새로운 데이터를 추가
        setPage((prevPage) => prevPage + 1); // 페이지 수 증가
      }
    } catch (error) {
      console.error("무한스크롤 실패", error); // 오류 로깅
    }
    setLoadingMore(false); // 로딩 상태 해제
  };

  const handleObserver = (entries) => {
    const target = entries[0];
    if (target.isIntersecting && !loadingMore) {
      loadItems();
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(handleObserver, {
      root: null,
      rootMargin: "20px",
      threshold: 0.1,
    });

    if (loaderRef.current) {
      observer.observe(loaderRef.current);
    }

    return () => {
      if (loaderRef.current) {
        observer.unobserve(loaderRef.current);
      }
    };
  }, [loaderRef, hasMore, loadingMore, posts]);

  // 게시물 생성시 날짜를 배열형태로 변환
  const dateToArray = (date) => {
    return [
      date.getFullYear(),
      date.getMonth() + 1,
      date.getDate(),
      date.getHours(),
      date.getMinutes(),
      date.getSeconds(),
      date.getMilliseconds() * 1000000,
    ];
  };

  // 날짜를 한글로 바꾸기 위한 데이터형태로 변환
  const parseDate = (dateArray) => {
    const [year, month, day, hour, minute, second, millisecond] = dateArray;
    return new Date(
      year,
      month - 1,
      day,
      hour,
      minute,
      second,
      millisecond / 1000000 // 밀리초로 변환
    );
  };

  // 얼마전에 생성하였는지 표시하기 위한 함수
  const formatDistanceToNowInKorean = (date) => {
    const distance = formatDistanceToNow(date, { addSuffix: true });
    const translations = {
      about: "",
      // 'hour':'시간',
      // 'ago':'전',
      // 'minute':'분',
      // 'month': '개월',
      // 'year':'년',
      // 'day':'일',
      // 's':'',
      "about 1 hour ago": "약 1시간 전",
      "about 1 minute ago": "약 1분 전",
      "about 1 month ago": "약 1개월 전",
      "about 1 year ago": "약 1년 전",
      "about 1 day ago": "약 1일 전",
      "less than a minute ago": "방금 전",
      "hours ago": "시간 전",
      "minutes ago": "분 전",
      "minute ago": "분 전",
      "days ago": "일 전",
      "months ago": "개월 전",
      "years ago": "년 전",
    };

    let translated = distance;

    for (const [key, value] of Object.entries(translations)) {
      translated = translated.replace(key, value);
    }

    return translated;
  };

  const createPost = async (content) => {
    try {
      const response = await apiClient.post(
        `/api/v1/project/${projectId}/post`,
        { content }
      );
      console.log("Post created");
      setPostContent("");

      setNewPost(newPost + 1);

      // URL params 유지
      const searchParams = new URLSearchParams(window.location.search);
      searchParams.set("title", title);
      const newUrl = `${window.location.pathname}?${searchParams.toString()}`;
      window.history.replaceState(null, "", newUrl);
    } catch (error) {
      console.error("Failed to create post:", error);
    }
  };

  const clickReaction = async (postId, buttonId) => {
    const postIndex = posts.findIndex((post) => post.id === postId);
    if (postIndex === -1) return; // 게시글을 찾지 못한 경우 함수 종료

    const post = posts[postIndex];
    const currentReaction = post.opinion;
    const isRemovingReaction = currentReaction === buttonId;

    // 옵티미스틱 업데이트를 위해 먼저 UI를 업데이트
    const updatedPosts = [...posts]; // 게시물 배열 복사
    const updatedPost = {
      ...post,
      opinion: isRemovingReaction ? null : buttonId,
      prosCnt:
        post.prosCnt +
        (buttonId === "PROS" ? (isRemovingReaction ? -1 : 1) : 0),
      consCnt:
        post.consCnt +
        (buttonId === "CONS" ? (isRemovingReaction ? -1 : 1) : 0),
      checkCnt:
        post.checkCnt +
        (buttonId === "CHECK" ? (isRemovingReaction ? -1 : 1) : 0),
    };
    updatedPosts[postIndex] = updatedPost; // 업데이트된 게시글을 배열에 적용
    setPosts(updatedPosts); // 상태 업데이트

    try {
      if (isRemovingReaction) {
        // 반응 제거
        await apiClient.delete(
          `/api/v1/project/${projectId}/post/${postId}/opinion`
        );
      } else {
        // 반응 추가 또는 변경
        const data = { type: buttonId };
        await apiClient.post(
          `/api/v1/project/${projectId}/post/${postId}/opinion`,
          data
        );
      }
      // 성공적으로 반응을 업데이트 했으면 추가 작업 없음
    } catch (error) {
      console.error("Reaction update failed", error);
      // 에러 발생 시 롤백을 수행
      setPosts(posts); // 이전 상태로 복원
    }
  };

  const handleClick = (event, postId) => {
    setAnchorEl(event.currentTarget);
    setCurrentPostId(postId);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleEdit = () => {
    const postToEdit = posts.find((post) => post.id === currentPostId);
    setEditContent(postToEdit.content);
    setOpenModal(true);
    handleClose();
  };

  const handleSave = async () => {
    try {
      await apiClient.patch(
        `/api/v1/project/${projectId}/post/${currentPostId}`,
        { content: editContent }
      );
      setPosts(
        posts.map((post) =>
          post.id === currentPostId ? { ...post, content: editContent } : post
        )
      );
      setOpenModal(false);
    } catch (error) {
      console.error("Failed to update post:", error);
    }
  };

  const handleDelete = async () => {
    try {
      await apiClient.delete(
        `/api/v1/project/${projectId}/post/${currentPostId}`
      );
      setPosts((prevPosts) =>
        prevPosts.filter((post) => post.id !== currentPostId)
      );
      console.log("Post deleted with ID:", currentPostId);
      handleClose();
    } catch (error) {
      console.error("Failed to delete post:", error);
    }
  };

  if (loading) {
    return <Loading text="로딩 중..." />;
  }

  return (
    <div className="project-post">
      <h2>
        <button
          onClick={() => {
            console.log(posts);
          }}
        >
          <HiOutlineDotsVertical size={20} />
        </button>
        {title}
      </h2>
      <div className="create-post">
        <div className="create-top">
          <UserCard
            onClick={() => preserveQueryParams(`/Profile/${memberId}`)}
            userName={localStorage.getItem("userNickName")}
            width={"width-40"}
            height={"height-40"}
            img={
              localStorage.getItem("profile") != null
                ? localStorage.getItem("profile")
                : "/image/dp.jpg"
            }
          />
          <button onClick={() => createPost(postContent)}>작성</button>
        </div>
        <input
          placeholder="게시글 작성.."
          id="write-area"
          value={postContent}
          onChange={(e) => setPostContent(e.target.value)}
        />
      </div>
      <ul className="view-posts">
        {posts.map((item) => (
          <li key={item.id} className="view-post">
            <div
              style={{
                display: "flex",
                position: "relative",
                justifyContent: "space-between",
              }}
            >
              <div className="usercard-date">
                <UserCard
                  onClick={() =>
                    preserveQueryParams(`/Profile/${item.postMember.id}`)
                  }
                  userName={item.postMember.nickname}
                  width={"width-40"}
                  height={"height-40"}
                  img={
                    item.postMember.profile
                      ? item.postMember.profile
                      : "/image/dp.jpg"
                  }
                />
                <p style={{ margin: "10px", color: "rgb(210, 210, 210)" }}>
                  {formatDistanceToNowInKorean(parseDate(item.createdAt))}
                </p>
              </div>
              {item.postMember.id == memberId ? (
                <div>
                  <Button
                    aria-controls="simple-menu"
                    aria-haspopup="true"
                    onClick={(event) => handleClick(event, item.id)}
                    className="post-option-button"
                  >
                    {/* <HiOutlineDotsVertical size={20} /> */}
                  </Button>
                  <Menu
                    id="simple-menu"
                    anchorEl={anchorEl}
                    keepMounted
                    open={open && currentPostId === item.id}
                    onClose={handleClose}
                    className="post-option-menu"
                  >
                    <MenuItem
                      onClick={handleEdit}
                      className="post-option-menu-item"
                    >
                      수정하기
                    </MenuItem>
                    <MenuItem
                      onClick={handleDelete}
                      className="post-option-menu-item"
                    >
                      삭제하기
                    </MenuItem>
                  </Menu>
                </div>
              ) : (
                <></>
              )}
            </div>
            <p>{item.content}</p>
            <div className="reaction-area">
              <button
                className={`reaction pros ${
                  item.opinion === "PROS" ? "actived" : ""
                }`}
                onClick={() => clickReaction(item.id, "PROS")}
                disabled={item.opinion !== null && item.opinion !== "PROS"}
              >
                <FaRegFaceSmile size={30} /> {item.prosCnt}
              </button>
              <button
                className={`reaction check ${
                  item.opinion === "CHECK" ? "actived" : ""
                }`}
                onClick={() => clickReaction(item.id, "CHECK")}
                disabled={item.opinion !== null && item.opinion !== "CHECK"}
              >
                <FaRegFaceMeh size={30} /> {item.checkCnt}
              </button>
              <button
                className={`reaction cons ${
                  item.opinion === "CONS" ? "actived" : ""
                }`}
                onClick={() => clickReaction(item.id, "CONS")}
                disabled={item.opinion !== null && item.opinion !== "CONS"}
              >
                <FaRegAngry size={30} /> {item.consCnt}
              </button>
            </div>
          </li>
        ))}
      </ul>
      <div ref={loaderRef} style={{ height: "100px", margin: "10px" }}>
        {loadingMore && "게시글 불러오는중..."}
      </div>
      <EditPostModal
        open={openModal}
        handleClose={() => setOpenModal(false)}
        postContent={editContent}
        setPostContent={setEditContent}
        handleSave={handleSave}
      />
    </div>
  );
}
