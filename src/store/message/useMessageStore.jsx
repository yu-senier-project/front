import { create } from 'zustand';
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';
import apiClient from '../../util/BaseUrl';

const socketUrl = 'http://13.51.99.142:8080/stomp-chat/info';
const socket = new SockJS(socketUrl);
const stompClient = Stomp.over(socket);

const useConnectionStore = create((set) => ({
    isConnected: false,
    setConnected: (connected) => set({ isConnected: connected }),
}));

const subscribeQueue = [];

function processSubscribeQueue() {
    while (subscribeQueue.length > 0 && stompClient.connected) {
        const { roomId, callback } = subscribeQueue.shift();
        console.log(`Processing subscription for room ${roomId}`);
        stompClient.subscribe(`/sub/chat-room/${roomId}`, callback);
    }
}

function connectStompClient() {
    if (stompClient.connected) {
        console.log('Already connected');
        return;
    }
    const token = localStorage.getItem('accessToken');
    const headers = { Authorization: `Bearer ${token}` };
    stompClient.connect(
        headers,
        (frame) => {
            console.log('Connected: ' + frame);
            useConnectionStore.setState({ isConnected: true });
            processSubscribeQueue();
        },
        (error) => {
            console.error('STOMP Error: ' + error);
            useConnectionStore.setState({ isConnected: false });
        }
    );
}

function handleReceivedMessage(message, roomId) {
    const receivedMessage = JSON.parse(message.body);
    console.log(`Received message for room ${roomId}:`, receivedMessage);
    useMessageStore.setState((state) => {
        const roomMessages = state.messages[roomId] || [];
        if (roomMessages.find(msg => msg.createdAt === receivedMessage.createdAt && msg.from === receivedMessage.from)) return {}; // 중복 메시지 방지
        const updatedMessages = { ...state.messages, [roomId]: [...roomMessages, receivedMessage] };
        console.log('Updated Messages:', updatedMessages); // 상태 업데이트 확인
        return {
            messages: updatedMessages,
        };
    });
}

function subscribeToRoom(roomId) {
    const isSubscribed = useMessageStore.getState().isSubscribedToRoom(roomId);
    if (isSubscribed) {
        console.log(`Already subscribed to room ${roomId}`);
        return;
    }
    if (!stompClient.connected) {
        console.error('WebSocket is not connected, queuing subscription...');
        subscribeQueue.push({ roomId, callback: (message) => handleReceivedMessage(message, roomId) });
        connectStompClient();
        return;
    }
    console.log(`Subscribing to room ${roomId}`);
    stompClient.subscribe(`/sub/chat-room/${roomId}`, (message) => {
        const receivedMessage = JSON.parse(message.body);
        console.log('Received message:', receivedMessage);
        useMessageStore.setState((state) => {
            const roomMessages = state.messages[roomId] || [];
            if (roomMessages.find(msg => msg.createdAt === receivedMessage.createdAt && msg.from === receivedMessage.from)) return {}; // 중복 메시지 방지
            const updatedMessages = { ...state.messages, [roomId]: [...roomMessages, receivedMessage] };
            console.log('Updated Messages:', updatedMessages); // 상태 업데이트 확인
            return {
                messages: updatedMessages,
            };
        });
    });
    useMessageStore.getState().addSubscribedRoom(roomId);
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

    addRoom: async (roomName, inviteList) => {
        try {
            const memberId = localStorage.getItem("memberId");
            const data = {
                "roomName": roomName,
                "inviteList": inviteList,
            };
            await apiClient.post(`/api/v1/chat-room/create?memberId=${memberId}`, data);
        } catch (error) {
            console.error('Error adding chat room:', error);
        }
    },

    fetchRooms: async (memberId, pageNumber) => {
        try {
            connectStompClient(); // 채팅방 목록 받아올때 웹소켓 연결 시도
            const response = await apiClient.get(`/api/v1/chat-room/index?memberId=${memberId}&page=${pageNumber}`);
            set((state) => {
                const existingRoomIds = new Set(state.rooms.map(room => room.roomId));
                const newRooms = response.data.filter(room => !existingRoomIds.has(room.roomId));
                return { rooms: [...state.rooms, ...newRooms] };
            });
        } catch (error) {
            console.error('Error fetching chat rooms:', error);
        }
    },

    fetchMessages: async (roomId) => {
        try {
            console.log('메시지 받아오는중...');
            const response = await apiClient.get(`/api/v1/chat-room/${roomId}`);
            const sortedMessages = response.data.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
            set((state) => ({
                messages: { ...state.messages, [roomId]: sortedMessages },
            }));
            console.log('메시지 다받아옴');
        } catch (error) {
            console.error('Error fetching messages:', error);
        }
    },

    sendMessage: async (text, roomId) => {
        try {
            const message = {
                content: text,
                roomId,
                from: localStorage.getItem('userNickName'),
                memberId: parseInt(localStorage.getItem('memberId'), 10),
                messageType: 'TEXT',
                subjectId: '', // subjectId가 필요한 경우 설정
            };
            console.log(`Sending message to room ${roomId}:`, message);
            subscribeToRoom(roomId);
            if (useConnectionStore.getState().isConnected) {
                stompClient.send(`/pub/chat-room/${roomId}`, {}, JSON.stringify(message));
                console.log(`Message sent to room ${roomId}`);
            } else {
                console.error('WebSocket is not connected');
            }
        } catch (error) {
            console.error('Error sending message:', error);
        }
    },

    sendImageMessage: async (file, roomId, memberId, base64Data) => {
        try {
            const fileName = file.name;
            const lastDotIndex = fileName.lastIndexOf('.');
            const originalFileName = fileName;
            const extension = fileName.substring(lastDotIndex + 1);
            const fileMessage = {
                content: base64Data,
                originalFileName,
                extension,
                messageType: 'IMAGE',
                roomId,
                from: localStorage.getItem('userNickName'),
                memberId,
            };
            console.log(`Sending image to room ${roomId}:`, fileMessage);
            if (!get().isSubscribedToRoom(roomId)) {
                subscribeToRoom(roomId);
            }
            if (useConnectionStore.getState().isConnected) {
                stompClient.send(`/pub/chat-room/image/${roomId}`, {}, JSON.stringify(fileMessage));
                console.log(`Image sent to room ${roomId}`);
            } else {
                console.error('WebSocket is not connected');
                connectStompClient();
            }
        } catch (error) {
            console.error('Error sending image message:', error);
        }
    },

    sendFileMessage: async (file, roomId, memberId, base64Data) => {
        try {
            const fileName = file.name;
            const lastDotIndex = fileName.lastIndexOf('.');
            const originalFileName = fileName;
            const extension = fileName.substring(lastDotIndex + 1);
            const fileMessage = {
                content: base64Data,
                originalFileName,
                extension,
                messageType: 'FILE',
                roomId,
                from: localStorage.getItem('userNickName'),
                memberId,
            };
            console.log(`Sending file to room ${roomId}:`, fileMessage);
            if (!get().isSubscribedToRoom(roomId)) {
                subscribeToRoom(roomId);
            }
            if (useConnectionStore.getState().isConnected) {
                stompClient.send(`/pub/chat-room/file/${roomId}`, {}, JSON.stringify(fileMessage));
                console.log(`File sent to room ${roomId}`);
            } else {
                console.error('WebSocket is not connected');
                connectStompClient();
            }
        } catch (error) {
            console.error('Error sending file message:', error);
        }
    },

    leaveRoom: async (memberId, roomId) => {
        try {
            const response = await apiClient.delete(`/api/v1/chat-room/${roomId}?memberId=${memberId}`);
            console.log(response)
            set((state) => {
                const updatedRooms = state.rooms.filter(room => room.roomId !== roomId);
                const updatedMessages = { ...state.messages };
                delete updatedMessages[roomId];

                return {
                    rooms: updatedRooms,
                    messages: updatedMessages,
                    selectedRoom: state.selectedRoom === roomId ? null : state.selectedRoom
                };
            });
        } catch (error) {
            console.error('Error leaving chat room:', error);
        }
    },

}));

export default useMessageStore;
export { connectStompClient, subscribeToRoom };
