import React, { useEffect, useState, useRef } from "react";
import { EventSourcePolyfill } from "event-source-polyfill";

export const Alarm = () => {
  const [message, setMessage] = useState("");
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
        console.log(event);
        const parsedData = JSON.parse(event.data);
        setMessage(parsedData);
        console.log(parsedData);
      });

      // 기본 "message" 이벤트 수신
      eventSource.current.onmessage = (event) => {
        const notification = JSON.parse(event.data);
        console.log("Notification received:", notification);
        // 여기서 notification을 처리하면 됩니다.
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
          initializeEventSource();
        }
      };
    };

    initializeEventSource();

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
