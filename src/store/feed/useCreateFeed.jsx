import { create } from "zustand";

const useCreateFeed = create((set) => ({
  toggle: false,
  setToggle: () =>
    set((state) => ({
      toggle: !state.toggle,
    })),
}));

export default useCreateFeed;
