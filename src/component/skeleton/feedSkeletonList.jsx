import FeedSkeleton from "./feedSkeleton";

export default function FeedSkeletonList({ num }) {
  let arr = Array(num).fill(0);
  return arr.map(() => <FeedSkeleton />);
}
