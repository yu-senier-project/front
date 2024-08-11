import React, { useEffect, useState, useRef } from "react";
import { EventSourcePolyfill } from "event-source-polyfill";
import { useTokenStore } from "../store/useTokenStore";

// 어세스 토큰이 변경되었을 때도 useEffect 실행되도록 하기
export const useAlarm = () => {
  // accessToken이 바뀔때마다 재 연결이 필요하므로 accessToken을 가져옴
  const { accessToken } = useTokenStore();

  // 서버에서 받은 메시지 저장할 state
  const [message, setMessage] = useState(null); // 메시지 상태 변수 추가

  // 새로운 알람이 왔는지 확인할 변수
  const [newAlarm, setNewAlarm] = useState(false);

  // 알림 애니메이션 담당할 state
  const [className, setClassName] = useState("Alarm-out");

  const [postId, setPostId] = useState(null);

  const eventSource = useRef(null);

  // CloseButton 클릭 시 알람 숨김
  const handleClose = () => {
    setClassName("Alarm-out");
  };

  useEffect(() => {
    const initializeEventSource = () => {
      eventSource.current = new EventSourcePolyfill(
        `${import.meta.env.VITE_BASEURL}/api/v1/notification`,
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
        setMessage(parsedData);
        console.log(parsedData);
      });

      // 기본 "message" 이벤트 수신
      eventSource.current.onmessage = (event) => {
        setNewAlarm(true);
        const notification = JSON.parse(event.data);
        setMessage(notification.message);
        setPostId(notification.subjectId);
        // 쿼리 인벨리드 하기

        setClassName("Alarm-in");
        // 3초후 알람 안보이게
        const timer = setTimeout(() => {
          setClassName("Alarm-out");
          setNewAlarm(false);
        }, 3000);

        return () => clearTimeout(timer);
      };

      // 연결이 완료 되었을 때 실행
      eventSource.current.onopen = () => {
        console.log("SSE connection opened.");
      };

      // 연결이 끊겼을 때 재 연결 시도
      eventSource.current.onerror = (e) => {
        console.log("SSE connection error.");
        eventSource.current.close();

        initializeEventSource(); // 오류 발생 시 재연결 시도
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

  return { message, newAlarm, className, handleClose, postId }; // 알림 메시지를 반환
};
