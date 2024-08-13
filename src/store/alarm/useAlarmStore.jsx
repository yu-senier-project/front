import { create } from "zustand";

const useAlarmStore = create((set) => ({
  open: false,
  setOpen: (open) => set({ open }),
}));

export default useAlarmStore;
