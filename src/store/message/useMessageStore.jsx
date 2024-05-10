// useMessageStore.js

import { create } from 'zustand';
import apiClient from '../../util/BaseUrl';
import SockJS from 'sockjs-client';
import { Client } from '@stomp/stompjs';

// WebSocket URL과 SockJS를 이용하여 STOMP 클라이언트 생성
const socketUrl = 'http://13.51.99.142/stomp-chat'; // 실제 WebSocket 서버 URL로 변경 필요
const client = new Client({
    webSocketFactory: () => new SockJS(socketUrl),
    reconnectDelay: 10000, // 연결 실패 시 5초 후 재시도
    debug: function (str) {
        console.log(str);
    },
});

let isConnected = false;

// STOMP 연결 초기화
function connectStompClient() {
    if (client.active || isConnected) return;

    client.onConnect = (frame) => {
        console.log('Connected: ' + frame);
        isConnected = true;
    };

    client.onStompError = (frame) => {
        console.error('STOMP Error: ' + frame.headers['message']);
        isConnected = false;
    };

    client.activate(); // 연결 시작
}

const useMessageStore = create((set) => ({
    rooms: [],
    selectedRoom: null,
    roomNumber: 1,
    messages: {},

    setRooms: (rooms) => set({ rooms }),

    setSelectedRoom: (roomId) => set({ selectedRoom: roomId }),

    setRoomNumber: (roomNumber) => set({ roomNumber }),

    setMessages: (roomId, newMessages) =>
        set((state) => ({
            messages: { ...state.messages, [roomId]: newMessages },
        })),

    addRoom: async (roomName, memberId) => {
        try {
            const response = await apiClient.post('/api/v1/chat-room/create', {
                memberId,
                roomName,
            });
            set((state) => ({
                rooms: [...state.rooms, response.data.room],
            }));
        } catch (error) {
            console.error('Error adding chat room:', error);
        }
    },

    fetchRooms: async (memberId, pageNumber) => {
        try {
            const response = await apiClient.get(`/api/v1/chat-room/index?memberId=${memberId}&page=${pageNumber}`);
            set({ rooms: response.data });
        } catch (error) {
            console.error('Error fetching chat rooms:', error);
        }
    },

    fetchMessages: async (roomId) => {
        try {
            const response = await apiClient.get(`/api/v1/chat-room/${roomId}`);
            set((state) => ({
                messages: { ...state.messages, [roomId]: response.data },
            }));
        } catch (error) {
            console.error('Error fetching messages:', error);
        }
    },

    sendMessage: async (text, roomId) => {
        // STOMP 통신을 통한 텍스트 메시지 전송
        try {
            const message = {
                roomId: roomId,
                text: text,
                memberId: localStorage.getItem('memberId'),
                messageType: 'TEXT',
                subjectid: '',
            };
            console.log(message);
            // 연결 상태 확인 후 메시지 전송
            if (isConnected) {
                console.log('Sending message:', message);
                client.publish({
                    destination: `/pub/chat-room/${roomId}`,
                    body: JSON.stringify(message),
                });

                set((state) => ({
                    messages: {
                        ...state.messages,
                        [roomId]: [...(state.messages[roomId] || []), message],
                    },
                }));
            } else {
                console.error('WebSocket is not connected');
                connectStompClient(); // 연결을 다시 시도
            }
        } catch (error) {
            console.error('Error sending message:', error);
        }
    },

    sendFileMessage: async (fileName, fileData, roomId) => {
        // STOMP 통신을 통한 파일 메시지 전송
        try {
            const fileMessage = {
                roomId,
                fileName,
                fileData,
            };

            // 연결 상태 확인 후 메시지 전송
            if (isConnected) {
                client.publish({
                    destination: `/pub/chat-room/image/${roomId}`,
                    body: JSON.stringify(fileMessage),
                });

                set((state) => ({
                    messages: {
                        ...state.messages,
                        [roomId]: [...(state.messages[roomId] || []), fileMessage],
                    },
                }));
            } else {
                console.error('WebSocket is not connected');
                connectStompClient(); // 연결을 다시 시도
            }
        } catch (error) {
            console.error('Error sending file message:', error);
        }
    },
}));

// STOMP 클라이언트 연결 시작
connectStompClient();

export default useMessageStore;
