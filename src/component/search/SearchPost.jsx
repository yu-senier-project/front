import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { Loading } from "../basic/Loading";
import apiClient from "../../util/BaseUrl";
import Feed from "../feed/main/Feed";
import { useQuery, useQueryClient, useInfiniteQuery } from "@tanstack/react-query";

export default function SearchPost() {
  const location = useLocation();
  const hashtag = location.state?.hashtag;
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [posts, setPosts] = useState([]);
  const memberId = localStorage.getItem('memberId');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await apiClient.get(`/api/v1/hashtag/post?memberId=${memberId}&hashtag=${hashtag}`);
        console.log(hashtag);
        console.log(response.data);
        setPosts(response.data);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError(err.message || "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    if (hashtag && memberId) {
      fetchData();
    } else {
      setLoading(false);
    }
  }, [hashtag, memberId]);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div style={{display: "grid", placeItems: "center" }}>
      {posts && posts.length > 0 ? (
        posts.map((post) => {
          const feedData = {
            id: post.id,
            memberId: post.postMember.id,
            profile: post.postMember.profile,
            createdAt: post.createdAt,
            nickname: post.postMember.nickname,
            loveNum: post.likeCnt,
            liked: post.liked,
            isCommentEnabled: post.isCommentEnabled,
            commentCnt: post.commentCnt,
            content: post.content,
            fileCnt: post.fileCnt,
          };
           <Feed key={post.id} feedList={feedData} onClick={() => {
console.log("123")

           }} />
        })
        
      ) : (
        <button>asddddddddddddddddddddddddddddddddf</button>
      )}
    </div>
  );
}
