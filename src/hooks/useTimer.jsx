import { useState, useEffect } from "react";

function useTimer(initialMinutes = 10, initialSeconds = 0) {
  const [minutes, setMinutes] = useState(initialMinutes);
  const [seconds, setSeconds] = useState(initialSeconds);
  const [isActive, setIsActive] = useState(false);

  // 타이머 시작하는 함수
  const toggle = () => {
    setIsActive(!isActive);
  };

  // 타이머를 리셋하는 함수
  const reset = () => {
    setMinutes(initialMinutes);
    setSeconds(initialSeconds);
    setIsActive(false);
  };

  useEffect(() => {
    let interval = null;

    if (isActive) {
      interval = setInterval(() => {
        if (seconds > 0) {
          setSeconds((seconds) => seconds - 1);
        }
        if (seconds === 0) {
          if (minutes === 0) {
            reset();
          } else {
            setMinutes((minutes) => minutes - 1);
            setSeconds(59);
          }
        }
      }, 1000);
    } else if (!isActive && seconds !== 0) {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [isActive, seconds, minutes]);

  return { minutes, seconds, isActive, toggle, reset };
}

export default useTimer;
