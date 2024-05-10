// useMessageStore.js

import { create } from 'zustand';
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';
import apiClient from '../../util/BaseUrl';

const socketUrl = 'http://13.51.99.142:8080/stomp-chat';
const socket = new SockJS(socketUrl);
const stompClient = Stomp.over(socket);
// const token = localStorage.getItem('accessToken');
let isConnected = false;

function connectStompClient() {
    if (stompClient.connected || isConnected) return;

    const token = localStorage.getItem('accessToken');
    const headers = {
        Authorization: `Bearer ${token}`,
    };

    stompClient.connect(
        console.log('111', headers),
        headers,
        (frame) => {
            console.log('Connected: ' + frame);
            isConnected = true;
        },
        (error) => {
            console.error('STOMP Error: ' + error);
            isConnected = false;
        }
    );
}

function subscribeToRoom(roomId) {
    if (!isConnected) {
        console.error('WebSocket is not connected, connecting now...');
        connectStompClient(); // 클라이언트 연결 시도
        return; // 연결 후 다시 시도하도록 즉시 종료
    }

    // 이미 구독된 채팅방인지 확인
    if (!useMessageStore.getState().isSubscribedToRoom(roomId)) {
        stompClient.subscribe(`/sub/chat-room/${roomId}`, (message) => {
            const receivedMessage = JSON.parse(message.body);
            console.log('Received message:', receivedMessage);

            useMessageStore.setState((state) => ({
                messages: {
                    ...state.messages,
                    [roomId]: [...(state.messages[roomId] || []), receivedMessage],
                },
            }));
        });

        useMessageStore.getState().addSubscribedRoom(roomId);
    }
}

const useMessageStore = create((set, get) => ({
    rooms: [],
    selectedRoom: null,
    roomNumber: 1,
    messages: {},
    subscribedRooms: [],

    setRooms: (rooms) => set({ rooms }),

    setSelectedRoom: (roomId) => set({ selectedRoom: roomId }),

    setRoomNumber: (roomNumber) => set({ roomNumber }),

    setMessages: (roomId, newMessages) =>
        set((state) => ({
            messages: { ...state.messages, [roomId]: newMessages },
        })),

    addSubscribedRoom: (roomId) =>
        set((state) => ({
            subscribedRooms: [...state.subscribedRooms, roomId],
        })),

    isSubscribedToRoom: (roomId) => (get().subscribedRooms || []).includes(roomId),

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
        try {
            const message = {
                roomId: roomId,
                text: text,
                memberId: localStorage.getItem('memberId'),
                messageType: 'TEXT',
            };
            console.log(message);

            // 채팅방 구독
            subscribeToRoom(roomId);

            // 연결 상태 확인 후 메시지 전송
            if (isConnected) {
                console.log('Sending message:', message);
                stompClient.send(`/pub/chat-room/${roomId}`, {}, JSON.stringify(message));

                set((state) => ({
                    messages: {
                        ...state.messages,
                        [roomId]: [...(state.messages[roomId] || []), message],
                    },
                }));
            } else {
                console.error('WebSocket is not connected');
                connectStompClient(); // 연결 다시 시도
            }
        } catch (error) {
            console.error('Error sending message:', error);
        }
    },

    sendFileMessage: async (fileName, fileData, roomId) => {
        try {
            const fileMessage = {
                roomId,
                fileName,
                fileData,
                messageType: 'IMAGE',
            };

            // 채팅방 구독
            subscribeToRoom(roomId);

            // 연결 상태 확인 후 메시지 전송
            if (isConnected) {
                stompClient.send(`/pub/chat-room/image/${roomId}`, {}, JSON.stringify(fileMessage));

                set((state) => ({
                    messages: {
                        ...state.messages,
                        [roomId]: [...(state.messages[roomId] || []), fileMessage],
                    },
                }));
            } else {
                console.error('WebSocket is not connected');
                connectStompClient(); // 연결 다시 시도
            }
        } catch (error) {
            console.error('Error sending file message:', error);
        }
    },
}));

// 연결 시작
connectStompClient();

export default useMessageStore;
