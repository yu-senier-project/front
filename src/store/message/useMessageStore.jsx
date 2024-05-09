import { create } from 'zustand';
import apiClient from '../../util/BaseUrl';
import Stomp from 'stompjs';

const stompClient = Stomp.client('ws://13.51.99.142:8080');

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
      const response = await apiClient.get(
        `/api/v1/chat-room/index?memberId=${memberId}&page=${pageNumber}`
      );
      set({ rooms: response.data });
    } catch (error) {
      console.error('Error fetching chat rooms:', error);
    }
  },

  fetchMessages: async (roomId) => {
    try {
      const response = await apiClient.get(
        `/api/v1/chat-room/${roomId}`
      );
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
        "roomId":roomId,
        "text":text,
        "memberId":localStorage.getItem("memberId"),
        "messageType": "TEXT",
        "subjectid":""
      };
      console.log("--------",message,"---------")
      stompClient.send(`/pub/chat-room/${roomId}`, {}, JSON.stringify(message));

      set((state) => ({
        messages: {
          ...state.messages,
          [roomId]: [...(state.messages[roomId] || []), message],
        },
      }));
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

      // 예시: STOMP 클라이언트로 파일 메시지 전송
      stompClient.send(`/pub/chat-room/image/${roomId}`, {}, JSON.stringify(fileMessage));

      set((state) => ({
        messages: {
          ...state.messages,
          [roomId]: [...(state.messages[roomId] || []), fileMessage],
        },
      }));
    } catch (error) {
      console.error('Error sending file message:', error);
    }
  },
}));

export default useMessageStore;
