import { create } from "zustand";

const useSearchStore = create((set) => ({
  tap: true,
  setTap: () =>
    set((state) => ({
      tap: !state.tap,
    })),
}));

export default useSearchStore;
