import { useLocation } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { Loading } from "../basic/Loading";
import apiClient from "../../util/BaseUrl";
// import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
// import { getFeedImg, deleteFeed } from "../../apis/feedApis";
// import ChatModal from "../chat/ChatModal";
import { FaHeart } from "react-icons/fa";
import { IoChatbubbleEllipsesOutline } from "react-icons/io5";
import "../../styles/search/searchPost.scss"
export default function SearchPost() {
  const location = useLocation();
  const hashtag = location.state?.hashtag;
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [posts, setPosts] = useState([]);
  const memberId = localStorage.getItem('memberId');
  const [isChatOpen, setIsChatOpen] = useState(false);

  const [isSettingOpen, setIsSettingOpen] = useState(false);

  const [isUpdate, setIsUpdate] = useState(false);

  const [falseLoveNum, setFalseLoveNum] = useState(posts.loveNum);

  const [falseLike, setFalseLike] = useState(posts.liked);

  const backgroundRef = useRef();
  useEffect(() => {
    
    const fetchData = async () => {
    
      const data = await apiClient(`/api/v1/hashtag/post?hashtag=${hashtag}`)
      console.log(data.data)
      setPosts(data.data);
    };

    fetchData();
  }, []);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  // const handleChatButtonClick = () => {
  //   setIsChatOpen(!isChatOpen);
  // };

  // const handleSettingButtonClick = () => {
  //   setIsSettingOpen(!isSettingOpen);
  // };

  // const handleUpdateButtonClick = () => {
  //   if (isUpdate) {
  //     return;
  //   }
  //   setIsSettingOpen(false);
  //   setIsUpdate(true);
  // };

  // const hanldUpdateCloseButtonClick = () => {
  //   setIsUpdate(false);
  // };

  // const queryClient = useQueryClient();
  // const { status, mutate } = useMutation({
  //   mutationFn: deleteFeed,
  //   onSuccess: () => {
  //     queryClient.invalidateQueries(["feeds"]);
  //   },
  //   onError: (e) => {
  //     console.log(e);
  //   },
  // });

  // const handleOnDelete = () => {
  //   mutate(feedList.id);
  //   setIsSettingOpen(false);
  // };

  return (
    <div className="search_post_container">
      {posts.length > 0 ? (
        <div className="search_post_box">
          <div className="search_post_top">
          <img src="public\image\hashTag.png" className="hashtag_img"/>
          <h1 >{hashtag}</h1>
          </div>
          <ul className="search_posts">
            {posts.map(post => (
              <li key={post.id} className="search_post">
                <div className="post-content">
                  {post.fileCnt > 0 ? (
                    <img src="https://via.placeholder.com/150" alt="Post Image" className="post-image" />
                  ) : (
                    <p>{post.content.slice(0,20)+'...'}</p>
                  )}
                </div>
                <div className="post-footer">
                  <span><FaHeart/>: {post.likeCnt}</span>
                  <span><IoChatbubbleEllipsesOutline />: {post.commentCnt}</span>
                </div>
                {/* <ChatModal
                  profile={post.profile}
                  handleUpdateButtonClick={handleUpdateButtonClick}
                  handleOnDelete={handleOnDelete}
                  imgList={imgList}
                  feedList={post}
                  handleChatButtonClick={handleChatButtonClick}
                  falseLoveNum={falseLoveNum}
                  falseLike={falseLike}
                  setFalseLike={setFalseLike}
                  setFalseLoveNum={setFalseLoveNum}
                ></ChatModal> */}

              </li>
              
            ))}
          </ul>
        </div>
      ) : (
        <p>게시글 없음</p>
      )}
    </div>
  );
}
