export default function Timer({ timer }) {
  if (timer === 0) {
    return null; // 타이머가 0이면 아무것도 렌더링하지 않음
  }
  if (timer === 180) {
    return null; // 초기상태에 아무것도 렌더링 하지 않음
  }

  return <div>{timer}</div>;
}
