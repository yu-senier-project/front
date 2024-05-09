import React, { useState } from "react";
import "../../styles/message/roomselecter.scss";
function RoomSelecter({ selectedRoom, rooms, onSelectRoom, onAddRoom }) {
  const [newRoomName, setNewRoomName] = useState("");

  const handleAddRoom = (e) => {
    e.preventDefault();
    if (newRoomName.trim()) {
      onAddRoom(newRoomName);
      setNewRoomName("");
    }
  };

  return (
    <div className="chat_nav">
      <form className="add_room_form" onSubmit={handleAddRoom}>
        {/* <BsPlusSquare className="add_room_icon" /> */}
        <input
          type="text"
          value={newRoomName}
          onChange={(e) => setNewRoomName(e.target.value)}
          placeholder="새로운 채팅"
          className="add_room_input"
        />
        <button type="submit" className="add_room_button">
          추가
        </button>
      </form>
      {/* <div className="profile">
        <img src="https://via.placeholder.com/40" alt="User" />
        <span>my_userId</span>
      </div> */}
      <ul>
        {rooms.map((room) => (
          <li
            key={room.id}
            className={selectedRoom === room.id ? "selected" : ""}
            onClick={() => onSelectRoom(room.id)}
          >
            <img src={room.image} alt={room.name} />
            <span>{room.name}</span>
          </li>
        ))}
        <li className="more">
          <span>...</span>
        </li>
      </ul>
    </div>
  );
}

export default RoomSelecter;
