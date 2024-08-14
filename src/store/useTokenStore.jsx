import { create } from "zustand";

export const useTokenStore = create((set) => ({
  accessToken: null,
  refreshToken: null,

  setAccessToken: (accessToken) =>
    set(() => ({
      accessToken,
    })),

  setRefreshToken: (refreshToken) =>
    set(() => ({
      refreshToken,
    })),
}));
