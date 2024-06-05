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
import RoomCreateModal from "../../modal/RoomCreateModal";
import MessageInviteModal from "../../modal/MessageInviteModal_Invite";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import IconButton from "@mui/material/IconButton";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import apiClient from "../../util/BaseUrl";
import FileModal from "../../modal/FileModal";

export default function Message() {
  const isLogin = localStorage.getItem("login");
  const {
    fetchRooms,
    rooms,
    selectedRoom,
    setSelectedRoom,
    addRoom,
    roomNumber,
    setRoomNumber,
    messages,
    setMessages,
    fetchMessages,
    fetchMoreMessages,
    sendMessage,
    sendImageMessage,
    sendFileMessage,
    isConnected,
    leaveRoom,
    isLoading,
    setLoading,
    fetchAllFile,
    files,
  } = useMessageStore();
  const lastMessageRef = useRef(null);
  const observerRef = useRef(null);
  const [message, setMessage] = useState("");

  const [createOpen, setCreateOpen] = useState(false);
  const handleCreateOpen = () => setCreateOpen(true);
  const handleCreateClose = () => {
    console.log("close");
    setCreateOpen(false);
  };

  const [hasReloaded, setHasReloaded] = useState(false);
  const [inviteOpen, setInviteOpen] = useState(false);
  const handleInviteOpen = () => setInviteOpen(true);
  const handleInviteClose = () => setInviteOpen(false);

  const memberId = localStorage.getItem("memberId");

  const [anchorEl, setAnchorEl] = useState(null);
  const menuOpen = Boolean(anchorEl);

  const [fileModalOpen, setFileModalOpen] = useState(false);

  const [hasMoreMessages, setHasMoreMessages] = useState(true); // 메시지 끝 여부 확인용 상태

  const handleConnect = () => {
    if (!isConnected) {
      connectStompClient();
    }
  };

  useEffect(() => {
    if (isLogin && memberId) {
      fetchRooms(memberId, roomNumber);
    }
  }, [isLogin, memberId, roomNumber]);

  useEffect(() => {
    if (selectedRoom && memberId) {
      fetchMessages(selectedRoom);
    }
  }, [selectedRoom, fetchMessages]);

  useEffect(() => {
    const hasReloaded = sessionStorage.getItem("hasReloaded");

    if (!hasReloaded) {
      sessionStorage.setItem("hasReloaded", "true");
      window.location.reload(true);
      setHasReloaded(true);
    }
  }, []);
  useEffect(() => {
    if (files.length > 0) {
      setFileModalOpen(true);
    }
  }, [files]);

  useEffect(() => {
    if (lastMessageRef.current) {
      lastMessageRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages[selectedRoom]]);

  const handleSelectRoom = (roomId) => {
    setSelectedRoom(roomId);
  };

  const handleAddRoom = async (newRoomName) => {
    if (newRoomName.trim() && memberId) {
      await addRoom(newRoomName, memberId);
      fetchRooms(memberId, roomNumber);
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

      reader.onload = () => {
        const memberId = localStorage.getItem("memberId");
        let base64Data = reader.result;

        if (file.type.startsWith("image/")) {
          console.log("이미지 파일");
          base64Data = base64Data.replace(/^data:.*;base64,/, "");
          sendImageMessage(file, selectedRoom, memberId, base64Data);
        } else {
          console.log("다른 파일");
          base64Data = base64Data.replace(/^data:.*;base64,/, "");
          sendFileMessage(file, selectedRoom, memberId, base64Data);
        }
      };

      reader.readAsDataURL(file);
    }
  };

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleMenuItemClick = (action) => {
    handleMenuClose();
    switch (action) {
      case "fileImage":
        fetchAllFile(selectedRoom, memberId);
        console.log(files[selectedRoom]);
        setFileModalOpen(true);
        break;
      case "invite":
        handleInviteOpen();
        break;
      case "leave":
        console.log("채팅방 나가기");
        leaveRoom(memberId, selectedRoom);
        break;
      default:
        break;
    }
  };
  useEffect(() => {
    setHasMoreMessages(true);
  }, [selectedRoom]);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !isLoading && selectedRoom && hasMoreMessages) {
          const oldestMessage = messages[selectedRoom][0];
          if (oldestMessage) {
            fetchMoreMessages(selectedRoom, oldestMessage.chatId).then((fetchedMessages) => {
              if (fetchedMessages.length === 0) {
                setHasMoreMessages(false); // 더 이상 메시지가 없을 경우
              }
            });
          }
        }
      },
      { threshold: 1.0 }
    );

    if (observerRef.current) {
      observer.observe(observerRef.current);
    }

    return () => {
      if (observerRef.current) {
        observer.unobserve(observerRef.current);
      }
    };
  }, [isLoading, selectedRoom, messages, fetchMoreMessages, hasMoreMessages]);

  const selectedRoomData =
    rooms &&
    Array.isArray(rooms) &&
    rooms.find((room) => room?.roomId === selectedRoom);

  function renderMessageContent(data) {
    switch (data.messageType) {
      case "IMAGE":
        return (
          <div>
            <div>
              <p>asdf</p>
              <p>{data.from}</p>
            </div>
            <img
              className={
                parseInt(data.memberId, 10) === parseInt(memberId, 10)
                  ? "message_self"
                  : "message_other"
              }
              src={data.content}
              alt="Message Content"
            />
          </div>
        );
      case "FILE":
        return (
          <div>
            <p>{data.from}</p>
            <a href={data.content} download>
              <span
                className={
                  parseInt(data.memberId, 10) === parseInt(memberId, 10)
                    ? "message_self file"
                    : "message_other file"
                }
              >
                파일 다운로드
              </span>
            </a>
          </div>
        );
      default:
        return (
          <div>
            {parseInt(data.memberId, 10) !== parseInt(memberId, 10) ? (
              <div style={{ display: "flex", marginBottom: "5px" }}>
                {data.messageType != "STATUS" ? (
                  <img
                    src={
                      data.profile ? data.profile : "/public/image/dp.jpg"
                    }
                    className="message-profile-img"
                  />
                ) : (
                  ""
                )}
                <p>{data.from}</p>
              </div>
            ) : (
              ""
            )}
            <span
              className={
                parseInt(data.memberId, 10) === parseInt(memberId, 10)
                  ? "message_self"
                  : "message_other"
              }
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
        open={handleCreateOpen}
        close={handleCreateClose}
        onLoadMore={handleLoadMore}
      />
  
      <div className="message_container">
        <RoomCreateModal open={createOpen} close={handleCreateClose} />
        <MessageInviteModal
          open={inviteOpen}
          handleClose={handleInviteClose}
          selectedRoom={selectedRoom}
          memberId={memberId}
          close={handleInviteClose}
          setMessages={setMessages}
        />
        <FileModal
          open={fileModalOpen}
          handleClose={() => setFileModalOpen(false)}
          files={files[selectedRoom]}
        />
        <div className="message_header">
          {selectedRoomData && (
            <>
              <div className="header_left">
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
              </div>
              <IconButton
                aria-label="more"
                aria-controls="long-menu"
                aria-haspopup="true"
                onClick={handleMenuOpen}
                className="kebab_button"
              >
                <MoreVertIcon />
              </IconButton>
              <Menu
                id="long-menu"
                anchorEl={anchorEl}
                keepMounted
                open={menuOpen}
                onClose={handleMenuClose}
              >
                <MenuItem onClick={() => handleMenuItemClick("fileImage")}>
                  파일/이미지
                </MenuItem>
                <MenuItem onClick={() => handleMenuItemClick("invite")}>
                  채팅 초대
                </MenuItem>
                <MenuItem onClick={() => handleMenuItemClick("leave")}>
                  채팅방 나가기
                </MenuItem>
              </Menu>
            </>
          )}
        </div>
  
        <div id="messages">
          <ul id="pre_messages">
            <li ref={observerRef} /> {/* 옵저버를 최상단에 위치 */}
            {(messages[selectedRoom] || []).map((data, index) => (
              <li
                className={
                  data.memberId === parseInt(memberId)
                    ? "message_self"
                    : data.messageType === "STATUS"
                    ? "message_system"
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
          {selectedRoom ? (
            <input
              autoComplete="off"
              type="text"
              id="message_input"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="메시지 입력..."
            />
          ) : (
            <></>
          )}
          <button type="button" id="send_message_button" onClick={handleSubmit}>
            <IoIosSend />
          </button>
        </div>
      </div>
    </div>
  );
}
