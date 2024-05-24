import { create } from "zustand";

const useProjectStore = create((set) => ({
  projectId: 0,
  managerId: 0,
  setProjectId: (id) => set({ projectId: id }),
  setManagerId: (id) => set({ managerId: id }),
}));

export default useProjectStore;
