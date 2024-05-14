// RoomSelecter.js
import React, { useState } from 'react';
import '../../styles/message/roomselecter.scss';
import apiClient from '../../util/BaseUrl';

function RoomSelecter({ selectedRoom, rooms = [], onSelectRoom, onAddRoom,open,close,onLoadMore }) {
    const [newRoomName, setNewRoomName] = useState('');

    const handleAddRoom = (e) => {
        e.preventDefault();
        if (newRoomName.trim()) {
            onAddRoom(newRoomName);
            setNewRoomName('');
        }
    };

    return (
        <div className="chat_nav">
            {/* 수정해야함 */}
            <button className="add_room_button" onClick={open}>
               새로운 채팅
            </button>
            <ul>
                {/* 수정 */}
                {rooms.length > 0 ? (
                    rooms.map((room, index) => (
                        <div
                            style={{
                                display: 'flex',
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                            }}
                        >
                            <li
                                key={room.roomId}
                                className={selectedRoom === room.roomId ? 'selected' : ''}
                                onClick={() => {
                                    onSelectRoom(room.roomId);
                                }}
                            >
                                <p>{room.roomName}</p>
                            </li>
                            {room.isRead ? (
                                <></>
                            ) : (
                                <div
                                    style={{
                                        height: '10px',
                                        width: '10px',
                                        backgroundColor: '#123411',
                                        borderRadius: '50%',
                                    }}
                                ></div>
                            )}
                        </div>
                    ))
                ) : (
                    <li>
                        <span>방 목록이 없습니다.</span>
                    </li>
                )}
            </ul>
            <button onClick={onLoadMore}>방 불러오기</button>
        </div>
    );
}

export default RoomSelecter;