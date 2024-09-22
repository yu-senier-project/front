import { create } from "zustand";

const useNavStore = create((set) => ({
  open: true,
  setOpen: () =>
    set((state) => ({
      open: !state.open,
    })),
}));

export default useNavStore;

export const useSelectedMenu = create((set) => ({
  selectedMenu: "Home",
  setSelectedMenu: (str) =>
    set(() => ({
      selectedMenu: str,
    })),
}));
