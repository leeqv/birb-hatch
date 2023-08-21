import { create } from "zustand";

const useCountStore = create((set) => ({
  count: 0,
  increaseCount: () => set((state) => ({ count: state.count + 1 })),
  resetCount: () => set(() => ({ count: 0 })),
}));

const useTimeStore = create((set) => ({
  time: 0,
  offset: 0,
  running: false,
  setTime: (t) => set((state) => ({ ...state, time: t })),
  resetTime: () => set((state) => ({ ...state, time: 0 })),
  setOffset: (t) => set((state) => ({ ...state, offset: t })),
  setRunning: (bool) => set(() => ({ running: bool })),
}));

export { useCountStore, useTimeStore };
