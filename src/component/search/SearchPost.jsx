import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { Loading } from "../basic/Loading";
import apiClient from "../../util/BaseUrl";
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
  
  useEffect(() => {
    // 서버로부터 데이터를 가져오는 예제
    const fetchData = async () => {
      // 예제 데이터
      const data = [
        {
          commentCnt: 4,
          content: "#나나나나나나나나나나나난나난나나 ㅋㅋ",
          createdAt: [2024, 5, 21, 10, 55, 10, 678695000],
          fileCnt: 0,
          id: 111,
          isCommentEnabled: true,
          likeCnt: 1,
          liked: false,
          postMember: {
            id: 1,
            nickname: 'jueun1025',
            profile: 'https://cns-s3-bucket.s3.us-east-2.amazonaws.com/profile/664be111-bc43-4809-95c7-bcb41a71f359.jpg'
          }
        },
        {
          commentCnt: 2,
          content: "여기는 내용입니다 #내용",
          createdAt: [2024, 5, 22, 12, 15, 30, 123456000],
          fileCnt: 1,
          id: 112,
          isCommentEnabled: false,
          likeCnt: 5,
          liked: true,
          postMember: {
            id: 1,
            nickname: 'jueun1025',
            profile: 'https://cns-s3-bucket.s3.us-east-2.amazonaws.com/profile/664be111-bc43-4809-95c7-bcb41a71f359.jpg'
          }
        },
        {
          commentCnt: 3,
          content: "오늘은 날씨가 좋네요",
          createdAt: [2024, 5, 23, 14, 20, 50, 789012000],
          fileCnt: 2,
          id: 113,
          isCommentEnabled: true,
          likeCnt: 10,
          liked: false,
          postMember: {
            id: 1,
            nickname: 'jueun1025',
            profile: 'https://cns-s3-bucket.s3.us-east-2.amazonaws.com/profile/664be111-bc43-4809-95c7-bcb41a71f359.jpg'
          }
        },
        {
          commentCnt: 0,
          content: "#아무말대잔치",
          createdAt: [2024, 5, 24, 16, 45, 20, 456789000],
          fileCnt: 0,
          id: 114,
          isCommentEnabled: false,
          likeCnt: 0,
          liked: false,
          postMember: {
            id: 1,
            nickname: 'jueun1025',
            profile: 'https://cns-s3-bucket.s3.us-east-2.amazonaws.com/profile/664be111-bc43-4809-95c7-bcb41a71f359.jpg'
          }
        },
        {
          commentCnt: 7,
          content: "여기는 다른 내용입니다 #다른내용",
          createdAt: [2024, 5, 25, 18, 30, 40, 345678000],
          fileCnt: 3,
          id: 115,
          isCommentEnabled: true,
          likeCnt: 15,
          liked: true,
          postMember: {
            id: 1,
            nickname: 'jueun1025',
            profile: 'https://cns-s3-bucket.s3.us-east-2.amazonaws.com/profile/664be111-bc43-4809-95c7-bcb41a71f359.jpg'
          }
        },
        {
          commentCnt: 1,
          content: "마지막 예시 데이터",
          createdAt: [2024, 5, 26, 20, 10, 15, 567890000],
          fileCnt: 4,
          id: 116,
          isCommentEnabled: false,
          likeCnt: 3,
          liked: true,
          postMember: {
            id: 1,
            nickname: 'jueun1025',
            profile: 'https://cns-s3-bucket.s3.us-east-2.amazonaws.com/profile/664be111-bc43-4809-95c7-bcb41a71f359.jpg'
          }
        }
      ];
      setPosts(data);
    };

    fetchData();
  }, []);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="search_post_container">
      {posts.length > 0 ? (
        <div className="search_post_box">
          <div className="search_post_top">
          <img src="public\image\images.png" className="hashtag_img"/>
          <h1 >{hashtag}</h1>
          </div>
          <ul className="search_posts">
            {posts.map(post => (
              <li key={post.id} className="search_post">
                <div className="post-content">
                  {post.fileCnt > 0 ? (
                    <img src="https://via.placeholder.com/150" alt="Post Image" className="post-image" />
                  ) : (
                    <p>{post.content}</p>
                  )}
                </div>
                <div className="post-footer">
                  <span><FaHeart/>: {post.likeCnt}</span>
                  <span><IoChatbubbleEllipsesOutline />: {post.commentCnt}</span>
                </div>
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
