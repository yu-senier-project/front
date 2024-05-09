import React, { useEffect, useRef, useState } from "react";
import { IoIosSend } from "react-icons/io";
import { CgAddR } from "react-icons/cg";
import RoomSelecter from "./RoomSelecter";
import useMessageStore from "../../store/message/useMessageStore";
import useLoginStore from "../../store/login/useLoginStore";
import "../../styles/message/roomselecter.scss";
import "../../styles/message/message.scss";
import apiClient from "../../util/BaseUrl";

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
  } = useMessageStore();
  const lastMessageRef = useRef(null);
  const [message, setMessage] = useState("");

  const memberId = localStorage.getItem("memberId");

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
    console.log("Click submit")
    console.log(selectedRoom)
    console.log(message.trim())

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
      reader.onload = () => {
        sendFileMessage(file.name, reader.result, selectedRoom);
      };
      reader.readAsDataURL(file);
    }
  };

  const selectedRoomData = rooms.find((room) => room.roomId === selectedRoom);

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
                src={
                  selectedRoomData.image || "https://via.placeholder.com/40"
                }
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
            {(messages[selectedRoom] || []).map((data) => (
              <li
                className={
                  data.from === memberId ? "message_self" : "message_other"
                }
                key={data.chatId}
              >
                {data.file ? (
                  <div
                    className={
                      data.memberId === memberId
                        ? "message_self"
                        : "message_other"
                    }
                  >
                    <a href={data.file} download>
                      {data.content}
                    </a>
                  </div>
                ) : (
                  <div
                    className={
                      data.memberId === memberId
                        ? "message_self"
                        : "message_other"
                    }
                  >
                    <span className="message_text">{data.content}</span>
                  </div>
                )}
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
        <button onClick={()=>{
          apiClient.get("/api/v1/chat-room/2").then((r)=>{
          console.log(r.data);
          })
        }}>asdfasdf</button>
      </div>
    
    </div>
  );
}
