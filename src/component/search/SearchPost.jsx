import { useLocation } from "react-router-dom";
import { useEffect, useState, useRef, useCallback } from "react";
import { Loading } from "../basic/Loading";
import apiClient from "../../util/BaseUrl";
import ChatModal from "../chat/ChatModal";
import "../../styles/search/searchPost.scss";

export default function SearchPost() {
  const location = useLocation();
  const hashtag = location.state?.hashtag;
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [posts, setPosts] = useState([]);
  const [isSettingOpen, setIsSettingOpen] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);
  const [falseLoveNum, setFalseLoveNum] = useState(0);
  const [falseLike, setFalseLike] = useState(false);
  const [activePostId, setActivePostId] = useState(null);
  const [page, setPage] = useState(1); 
  const [hasMore, setHasMore] = useState(true); 

  const observer = useRef();

  const colors = [
    '#ffdfd3', '#d4f1f4', '#c1e1c1', '#f9e2af',
    '#e4c1f9', '#fbdce2', '#d3e0ea', '#fee9b2',
    '#c2f0fc', '#f5c6ec'
  ];

  const lastPostElementRef = useCallback(node => {
    if (loading) return;
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        setPage(prevPage => prevPage + 1);
      }
    });
    if (node) observer.current.observe(node);
  }, [loading, hasMore]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await apiClient(`/api/v1/hashtag/post?hashtag=${hashtag}&page=${page}&size=10`);
        const data = response.data;
        console.log(`Page: ${page}, Fetched ${data.length} posts`);
        
        if (Array.isArray(data)) { // 배열인지 확인
          const postsWithMedia = await Promise.all(data.map(async (post) => {
            if (post.fileCnt > 0) {
              const mediaResponse = await apiClient(`/api/v1/post/${post.id}/media`);
              return { ...post, media: mediaResponse.data };
            }
            return post;
          }));
          setPosts(prevPosts => [...prevPosts, ...postsWithMedia]);
          setHasMore(data.length > 0);
        } else {
          setError('Unexpected response format');
          setHasMore(false);
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
  
    fetchData();
  }, [hashtag, page]);

  useEffect(() => {
    if (activePostId) {
      const activePost = posts.find(post => post.id === activePostId);
      if (activePost) {
        setFalseLoveNum(activePost.likeCnt);
        setFalseLike(activePost.liked);
      }
    }
  }, [activePostId, posts]);

  if (loading && page === 1) {
    return <Loading />;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const handlePostClick = (postId) => {
    setActivePostId(postId);
  };

  const handleCloseModal = () => {
    setActivePostId(null);
  };

  const handleUpdateButtonClick = (postId) => {
    console.log(`Update post with id: ${postId}`);
    // Update logic here
  };

  const handleOnDelete = (postId) => {
    console.log(`Delete post with id: ${postId}`);
    // Delete logic here
  };

  const handleLikeChange = (likeStatus) => {
    console.log(`Post with id: ${activePostId} like status changed to: ${likeStatus}`);
    // Logic to update like status
  };

  return (
    <div className="search_post_container">
      {posts.length > 0 ? (
        <div className="search_post_box">
          <div className="search_post_top">
            <img src="public/image/hashTag.png" className="hashtag_img" alt="Hashtag" />
            <h1>{hashtag}</h1>
          </div>
          <div>
          <ul className="search_posts">
            {posts.map((post, index) => (
              <li 
                key={index} 
                className="search_post" 
                style={{ backgroundColor: colors[index % colors.length] }} // 색상 순환 적용
                onClick={() => handlePostClick(post.id)}
                ref={posts.length === index + 1 ? lastPostElementRef : null}
              >
                <div className="post-content">
                  {post.fileCnt > 0 && post.media ? (
                    <img src={post.media[0].uploadFileURL || "https://via.placeholder.com/150"} alt="Post Media" className="post-image" />
                  ) : (
                    <p>{post.content.slice(0, 20) + '...'}</p>
                  )}
                </div>
                <div className="post-footer">
                  <span>{post.likeCnt} likes</span>
                  <span>{post.commentCnt} comments</span>
                </div>
              </li>
            ))}
          </ul>
          </div>
          {activePostId && (
            <ChatModal
              profile={posts.find(post => post.id === activePostId).postMember.profile}
              imgList={posts.find(post => post.id === activePostId).fileCnt > 0 ? posts.find(post => post.id === activePostId).media : []}
              feedList={posts.find(post => post.id === activePostId)}
              handleChatButtonClick={handleCloseModal}
              falseLoveNum={falseLoveNum}
              falseLike={falseLike}
              setFalseLoveNum={setFalseLoveNum}
              setFalseLike={setFalseLike}
              handleUpdateButtonClick={() => handleUpdateButtonClick(activePostId)}
              handleOnDelete={() => handleOnDelete(activePostId)}
            />
          )}
        </div>
      ) : (
        <p>No posts found</p>
      )}
    </div>
  );
}
