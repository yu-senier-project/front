import { create } from "zustand";

const useProjectStore = create((set) => ({
  projectId: 0,
  setProjectId: (id) =>
    set(() => ({
      projectId: id,
    })),
}));

export default useProjectStore;
