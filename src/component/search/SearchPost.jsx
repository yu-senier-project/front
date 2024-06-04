import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { Loading } from "../basic/Loading";
import apiClient from "../../util/BaseUrl";
import ChatModal from "../chat/ChatModal";
import "../../styles/search/searchPost.scss";

export default function SearchPost() {
  const location = useLocation();
  console.log(location);
  const hashtag = location.state?.hashtag;

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [posts, setPosts] = useState([]);
  const [isSettingOpen, setIsSettingOpen] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);
  const [falseLoveNum, setFalseLoveNum] = useState(0);
  const [falseLike, setFalseLike] = useState(false);
  const [activePostId, setActivePostId] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const { data } = await apiClient(
          `/api/v1/hashtag/post?hashtag=${hashtag}`
        );

        const postsWithMedia = await Promise.all(
          data.map(async (post) => {
            if (post.fileCnt > 0) {
              const mediaResponse = await apiClient(
                `/api/v1/post/${post.id}/media`
              );
              return { ...post, media: mediaResponse.data };
            }
            return post;
          })
        );

        setPosts(postsWithMedia);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [hashtag]);

  useEffect(() => {
    if (activePostId) {
      const activePost = posts.find((post) => post.id === activePostId);
      if (activePost) {
        setFalseLoveNum(activePost.likeCnt);
        setFalseLike(activePost.liked);
      }
    }
  }, [activePostId, posts]);

  if (loading) {
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
    console.log(
      `Post with id: ${activePostId} like status changed to: ${likeStatus}`
    );
    // Logic to update like status
  };

  return (
    <div className="search_post_container">
      {posts.length > 0 ? (
        <div className="search_post_box">
          <div className="search_post_top">
            <img
              src="public/image/hashTag.png"
              className="hashtag_img"
              alt="Hashtag"
            />
            <h1>{hashtag}</h1>
          </div>
          <ul className="search_posts">
            {posts.map((post) => (
              <li
                key={post.id}
                className="search_post"
                onClick={() => handlePostClick(post.id)}
              >
                <div className="post-content">
                  {post.fileCnt > 0 && post.media ? (
                    <img
                      src={
                        post.media[0]?.url || "https://via.placeholder.com/150"
                      }
                      alt="Post Media"
                      className="post-image"
                    />
                  ) : (
                    <p>{post.content.slice(0, 20) + "..."}</p>
                  )}
                </div>
                <div className="post-footer">
                  <span>{post.likeCnt} likes</span>
                  <span>{post.commentCnt} comments</span>
                </div>
              </li>
            ))}
          </ul>
          {activePostId && (
            <ChatModal
              profile={
                posts.find((post) => post.id === activePostId).postMember
                  .profile
              }
              imgList={
                posts.find((post) => post.id === activePostId).fileCnt > 0
                  ? posts
                      .find((post) => post.id === activePostId)
                      .media.map((media) => media.url)
                  : []
              }
              feedList={posts.find((post) => post.id === activePostId)}
              handleChatButtonClick={handleCloseModal}
              falseLoveNum={falseLoveNum}
              falseLike={falseLike}
              setFalseLoveNum={setFalseLoveNum}
              setFalseLike={setFalseLike}
              handleUpdateButtonClick={() =>
                handleUpdateButtonClick(activePostId)
              }
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
