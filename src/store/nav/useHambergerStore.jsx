import { create } from "zustand";

const useHambergerStore = create((set) => ({
  open: false,
  setOpen: () =>
    set((state) => ({
      open: !state.open,
    })),
    setFlase : () => set({open:false})
}));

export default useHambergerStore;
