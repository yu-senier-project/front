import { create } from "zustand";

const useChatStore = create((set) => ({
  open: false,
  setOpen: () =>
    set((state) => ({
      open: !state.open,
    })),
}));

export default useChatStore;
