import "../../styles/skeleton/feedSkeleton.scss";

export default function FeedSkeleton() {
  return (
    <div className="FeedSkeleton-container">
      <div className="FeedSkeletion-userInfo">
        <div className="FeedSkeletion-userInfo-img"></div>
        <div className="FeedSkeletion-userInfo-nickname"></div>
      </div>
      <div className="FeedSkeleton-img"></div>
      <div className="FeedSkeleton-btn"></div>
      <div className="FeedSkeleton-content"></div>
    </div>
  );
}
