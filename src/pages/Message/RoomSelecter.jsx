import React, { useState } from 'react';
import '../../styles/message/roomselecter.scss';
import apiClient from '../../util/BaseUrl';

function RoomSelecter({ selectedRoom, rooms = [], onSelectRoom, onAddRoom, open, close, onLoadMore }) {
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
            <div className="chat_nav__row">
                <h3 className="chat_username">{localStorage.getItem('userNickName')}</h3>
                <button className="add_room_button" onClick={open}>
                    ✎
                </button>
            </div>
            <div className="chat_nav__row">
                <p className="chat_header">메시지</p>
                <ul>
                    {rooms.length > 0 ? (
                        rooms.map((room, index) => (
                            <div
                                key={room.roomId}
                                className={selectedRoom === room.roomId ? 'chat_chatroom selected' : 'chat_chatroom'}
                                onClick={() => {
                                    onSelectRoom(room.roomId);
                                }}
                            >
                                <li>
                                    <p className="chat_roomname">{room.roomName}</p>
                                    <p className="chat_lastchat">
                                        {room.lastChat ? room.lastChat.substring(0, 10) + '' : '빈 채팅방'}
                                    </p>
                                </li>
                                {room.isRead ? (
                                    <></>
                                ) : (
                                    <div
                                        style={{
                                            display: 'none',
                                            height: '10px',
                                            width: '10px',
                                            backgroundColor: 'transparent',
                                            borderRadius: '100%',
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
            </div>
            <div className="chat_nav__row">
                <button className="load_more_button" onClick={onLoadMore}>
                    방 불러오기
                </button>
            </div>
        </div>
    );
}

export default RoomSelecter;
