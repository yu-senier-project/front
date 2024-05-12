// Message.js
import React, { useEffect, useRef, useState } from "react";
import { IoIosSend } from "react-icons/io";
import { CgAddR } from "react-icons/cg";
import RoomSelecter from "./RoomSelecter";
import useMessageStore, {
  connectStompClient,
} from "../../store/message/useMessageStore";

import useLoginStore from "../../store/login/useLoginStore";
import "../../styles/message/roomselecter.scss";
import "../../styles/message/message.scss";

export default function Message() {
  const { isLogin } = useLoginStore();
  const {
    fetchRooms,
    rooms,
    selectedRoom,
    setSelectedRoom,
    addRoom,
    roomNumber,
    setRoomNumber,
    messages,
    fetchMessages,
    sendMessage,
    sendFileMessage,
    addSubscribedRoom,
    saveFileMessage,
    isConnected,
  } = useMessageStore();
  const lastMessageRef = useRef(null);
  const [message, setMessage] = useState("");

  const memberId = localStorage.getItem("memberId");
  const UserId = localStorage.getItem("userNickName");

  useEffect(() => {
    if (isLogin && memberId) {
      fetchRooms(memberId, roomNumber);
    }
  }, [isLogin, memberId, roomNumber]);

  useEffect(() => {
    if (selectedRoom && memberId) {
      fetchMessages(selectedRoom);
    }
  }, [selectedRoom, memberId]);

  useEffect(() => {
    lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, selectedRoom]);

  const handleConnect = () => {
    if (!isConnected) {
      connectStompClient();
    }
  };
  const handleSelectRoom = (roomId) => {
    setSelectedRoom(roomId);
  };

  const handleAddRoom = (newRoomName) => {
    if (newRoomName.trim() && memberId) {
      addRoom(newRoomName, memberId);
    }
  };

  const handleLoadMore = () => {
    const nextRoomNumber = roomNumber + 1;
    setRoomNumber(nextRoomNumber);
    if (memberId) {
      fetchRooms(memberId, nextRoomNumber);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim() && selectedRoom) {
      sendMessage(message, selectedRoom);
      setMessage("");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSubmit(e);
    }
  };

  const handleFileSend = (e) => {
    const file = e.target.files[0];
    if (file && selectedRoom) {
      const reader = new FileReader();

      // 파일 읽기가 완료되면 실행될 이벤트 핸들러
      reader.onload = () => {
        const memberId = localStorage.getItem("memberId");
        let base64Data = reader.result;
        // console.log("Base64 data before modification:", base64Data); // 수정 전 데이터 로깅
        saveFileMessage(base64Data, selectedRoom);

        base64Data = base64Data.replace(/^data:image\/\w+;base64,/, ""); // 이미지 데이터의 Base64 인코딩 헤더 제거
        // console.log("Base64 data after modification:", base64Data); // 수정 후 데이터 로깅
        // 파일 메시지 전송
        sendFileMessage(file, selectedRoom, memberId, base64Data);

        // 파일 메시지 저장
      };

      // 파일을 데이터 URL 형식으로 읽기 시작
      reader.readAsDataURL(file);
    }
  };

  const selectedRoomData = rooms.find((room) => room.roomId === selectedRoom);
  function renderMessageContent(data) {
    switch (data.messageType) {
      case "IMAGE":
        return (
          <div
            className={
              parseInt(data.memberId, 10) === parseInt(memberId, 10)
                ? "message_self"
                : "message_other"
            }
          >
            <img
              src={data.content}
              alt="Message Content"
              onClick={() => {
                console.log(data);
              }}
            />
          </div>
        );
      case "FILE":
        // 파일 메시지의 경우 특별한 렌더링이 필요하다면 여기에 로직을 추가
        return <></>; // 현재는 비어 있는 JSX를 반환
      default:
        return (
          <div
            className={
              parseInt(data.memberId, 10) === parseInt(memberId, 10)
                ? "message_self"
                : "message_other"
            }
          >
            <span
              onClick={() => {
                console.log(data);
              }}
            >
              {data.content}
            </span>
          </div>
        );
    }
  }

  return (
    <div className="message_page">
      <RoomSelecter
        selectedRoom={selectedRoom}
        rooms={rooms}
        onSelectRoom={handleSelectRoom}
        onAddRoom={handleAddRoom}
      />

      <div className="message_container">
        <div className="message_header">
          {selectedRoomData && (
            <>
              <img
                src={selectedRoomData.image || "https://via.placeholder.com/40"}
                alt={selectedRoomData.roomName}
                className="message_profile_image"
              />
              <span className="message_profile_name">
                {selectedRoomData.roomName}
              </span>
            </>
          )}
        </div>
        <div id="messages">
          <ul id="pre_messages">
            {(messages[selectedRoom] || []).map((data, index) => (
              <li
                className={
                  data.memberId === parseInt(memberId)
                    ? "message_self"
                    : "message_other"
                }
                key={index + 1}
              >
                {renderMessageContent(data)}
              </li>
            ))}
            <li ref={lastMessageRef} />
          </ul>
        </div>
        <div className="form_container">
          <input
            type="file"
            id="file_input"
            style={{ display: "none" }}
            onChange={handleFileSend}
          />
          <button
            type="button"
            id="send_file_button"
            onClick={() => document.getElementById("file_input").click()}
          >
            <CgAddR />
          </button>
          <input
            autoComplete="off"
            type="text"
            id="message_input"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="메시지 입력..."
          />
          <button type="button" id="send_message_button" onClick={handleSubmit}>
            <IoIosSend />
          </button>
        </div>
        <button
          onClick={() => {
            console.log(messages);
          }}
        >
          test
        </button>
      </div>
    </div>
  );
}
