import { create } from "zustand";

const useProjectStore = create((set) => ({
  projectId: 0,
  managerId: 0,
  title: "",
  setProjectId: (id) => set({ projectId: id }),
  setManagerId: (id) => set({ managerId: id }),
  setTitle: (title) =>
    set({
      title: title,
    }),
}));

export default useProjectStore;
