// useFindStore.js
import { create } from "zustand";
import axios from "axios";

const useFindStore = create((set) => ({
  checkId: "",
  setCheckId: async (email) => {
    try {
      const response = await axios.get(`http://13.51.99.142:8080/api/v1/auth/nickname-inquiry?nickname=${email}`);
      set({ checkId: response.data.checkId }); // 응답 구조에 맞게 수정
    } catch (error) {
      console.error("Failed to fetch checkId:", error);
    }
  },
}));

export default useFindStore;
