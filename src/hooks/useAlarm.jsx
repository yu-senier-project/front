import React, { useEffect, useState, useRef } from "react";
import { EventSourcePolyfill } from "event-source-polyfill";

// 어세스 토큰이 변경되었을 때도 useEffect 실행되도록 하기
export const useUserAlarm = () => {
  const [message, setMessage] = useState(null); // 메시지 상태 변수 추가
  const eventSource = useRef(null);

  useEffect(() => {
    const initializeEventSource = () => {
      eventSource.current = new EventSourcePolyfill(
        `${import.meta.env.VITE_BASEURL}/notification`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
          heartbeatTimeout: 3600000,
        }
      );

      // newMessage라는 타입의 알림이 왔을 때 실행
      eventSource.current.addEventListener("notification", (event) => {
        const parsedData = JSON.parse(event.data);
        setMessage(parsedData); // 메시지 상태 업데이트
        console.log(parsedData);
      });

      // 기본 "message" 이벤트 수신
      eventSource.current.onmessage = (event) => {
        const notification = JSON.parse(event.data);
        console.log("Notification received:", notification);
        // 필요한 경우 추가 처리
      };

      // 연결이 완료 되었을 때 실행
      eventSource.current.onopen = () => {
        console.log("SSE connection opened.");
      };

      // 연결이 끊겼을 때 재 연결 시도
      eventSource.current.onerror = (e) => {
        console.log("SSE connection error.");
        eventSource.current.close();

        if (e.error) {
          initializeEventSource(); // 오류 발생 시 재연결 시도
        }
      };
    };

    initializeEventSource();

    return () => {
      // 컴포넌트가 언마운트될 때 연결 종료
      if (eventSource.current) {
        eventSource.current.close();
      }
    };
  }, []);

  return message; // 알림 메시지를 반환
};
