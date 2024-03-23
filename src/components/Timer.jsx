import { useState, useEffect } from "react";

export default function Timer({ time }) {
  const [timer, setTimer] = useState();
  useEffect(() => {
    if (timer > 0) {
      const intervalId = setInterval(() => {
        setTimer(timer - 1);
      }, 1000);
      return () => clearInterval(intervalId);
    } else {
      setTimer(null);
    }
  });
  return (
    <>
      <p className="find_timer">{timer}</p>
    </>
  );
}
