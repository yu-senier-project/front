// useMessageStore.js

import { create } from "zustand";
import SockJS from "sockjs-client";
import Stomp from "stompjs";
import apiClient from "../../util/BaseUrl";

const socketUrl = "http://13.51.99.142:8080/stomp-chat/info";
// const socket = new WebSocket("ws://13.51.99.142:8080/stomp-chat");
// const stompClient = Stomp.over(socket);

const socket = new SockJS(socketUrl);
const stompClient = Stomp.over(socket);
let isConnected = false;

function connectStompClient() {
  if (stompClient.connected || isConnected) return;

  const token = localStorage.getItem("accessToken");
  const headers = {
    Authorization: `Bearer ${token}`,
  };

  stompClient.connect(
    headers,
    (frame) => {
      console.log("Connected: " + frame);
      isConnected = true;
    },
    (error) => {
      console.error("STOMP Error: " + error);
      isConnected = false;
    }
  );
}

function subscribeToRoom(roomId) {
  if (!isConnected) {
    console.error("WebSocket is not connected, connecting now...");
    connectStompClient(); // 클라이언트 연결 시도
    return; // 연결 후 다시 시도하도록 즉시 종료
  }

  // 이미 구독된 채팅방인지 확인
  if (!useMessageStore.getState().isSubscribedToRoom(roomId)) {
    stompClient.subscribe(`/pub/chat-room/${roomId}`, (message) => {
      const receivedMessage = JSON.parse(message.body);
      console.log("Received message:", receivedMessage);

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

  isSubscribedToRoom: (roomId) =>
    (get().subscribedRooms || []).includes(roomId),

  addRoom: async (roomName, memberId) => {
    try {
      const response = await apiClient.post("/api/v1/chat-room/create", {
        memberId,
        roomName,
      });
      set((state) => ({
        rooms: [...state.rooms, response.data.room],
      }));
    } catch (error) {
      console.error("Error adding chat room:", error);
    }
  },

  fetchRooms: async (memberId, pageNumber) => {
    try {
      connectStompClient(); // 채팅방 목록 받아올때 웹소켓 연결 시도
      const response = await apiClient.get(
        `/api/v1/chat-room/index?memberId=${memberId}&page=${pageNumber}`
      );
      set({ rooms: response.data });
    } catch (error) {
      console.error("Error fetching chat rooms:", error);
    }
  },

  fetchMessages: async (roomId) => {
    try {
      connectStompClient(); // 채팅방 목록 받아올때 웹소켓 연결 시도
      console.log("메시지 받아오는중...");
      const response = await apiClient.get(`/api/v1/chat-room/${roomId}`);
      // 메시지를 chatId 기준으로 오름차순 정렬합니다.
      const sortedMessages = response.data.sort((a, b) => a.chatId - b.chatId);

      set((state) => ({
        messages: { ...state.messages, [roomId]: sortedMessages },
      }));
      console.log("메시지 다받아옴");
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  },

  sendMessage: async (text, roomId) => {
    try {
      const message = {
        roomId: roomId,
        content: text,
        memberId: parseInt(localStorage.getItem("memberId")),
        messageType: "TEXT",
        subjectId: "",
      };
      console.log(message);

      // 채팅방 구독
      subscribeToRoom(roomId);

      // 연결 상태 확인 후 메시지 전송
      if (isConnected) {
        console.log("Sending message:", message);
        stompClient.send(
          `/pub/chat-room/${roomId}`,
          {},
          JSON.stringify(message)
        );

        set((state) => ({
          messages: {
            ...state.messages,
            [roomId]: [...(state.messages[roomId] || []), message],
          },
        }));
      } else {
        console.error("WebSocket is not connected");
        connectStompClient(); // 연결 다시 시도
      }
    } catch (error) {
      console.error("Error sending message:", error);
    }
  },

  sendFileMessage: async (file, roomId, memberId, base64Data) => {
    try {
      const fileName = file.name;
      const lastDotIndex = fileName.lastIndexOf(".");
      const originalFileName = fileName.substring(0, lastDotIndex);
      const extension = fileName.substring(lastDotIndex + 1);

      const fileMessage = {
        content: base64Data, // Base64 인코딩된 파일 데이터
        originalFileName,
        extension,
        roomId,
        memberId,
      };
      console.log(fileMessage, typeof fileMessage.content);
      // 연결 상태 확인 후 메시지 전송
      if (isConnected) {
        console.log("파일전송!");
        stompClient.send(
          `/pub/chat-room/image/${roomId}`,
          {},
          JSON.stringify(fileMessage)
        );
      } else {
        console.error("WebSocket is not connected");
        connectStompClient(); // 연결 다시 시도
      }
    } catch (error) {
      console.error("Error sending file message:", error);
    }
  },
}));

// 연결 시작
// connectStompClient();

export default useMessageStore;
export { connectStompClient };
