import { create } from "zustand";

const useLoginStore = create((set) => ({
  isLogin: false,
  setIsLogin: () =>
    set((state) => ({
      isLogin: !state.isLogin,
    })),
}));

export default useLoginStore;
