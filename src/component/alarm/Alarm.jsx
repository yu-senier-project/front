import React, { useEffect, useState, useRef } from "react";
import { EventSourcePolyfill } from "event-source-polyfill";
export const Alarm = () => {
  const [message, setMessage] = useState("");
  const eventSource = useRef(null);
  useEffect(() => {
    eventSource.current = new EventSourcePolyfill(
      `${import.meta.env.VITE_BASEURL}/events`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`, // 필요한 경우
        },
        heartbeatTimeout: 60000, // 60초 동안 heartbeat 없음 시 연결 끊김
      }
    );

    // newMessage라는 타입의 알림이 왔을 때 실행
    eventSource.current.addEventListener("newMessage", (event) => {
      const parsedData = JSON.parse(event.data);
      console.log(parsedData);
    });

    // 연결이 완료 되었을 때 실행
    eventSource.current.onopen = () => {
      console.log("SSE connection opened.");
    };

    // 연결이 끊겼을 땨 재 연결 시도
    eventSource.current.onerror = () => {
      console.log("SSE connection error.");
      eventSource.current.close();
      setTimeout(() => {
        // 3초 후에 재연결 시도
        eventSource.current = new EventSourcePolyfill(
          `${import.meta.env.VITE_BASEURL}/events`
        );
      }, 3000);
    };

    return () => {
      // 컴포넌트가 언마운트될 때 연결 종료
      eventSource.current.close();
    };
  }, []);
  return (
    <div>
      <h1>Server-Sent Events Example</h1>
      <p>Latest message from server: {message}</p>
    </div>
  );
};
