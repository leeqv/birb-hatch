import { create } from "zustand";

interface CountState {
  count: number;
  increaseCount: () => void;
  resetCount: () => void;
}

interface TimeState {
  time: number;
  offset: number;
  running: boolean;
  setTime: (t: number) => void;
  resetTime: () => void;
  setOffset: (t: number) => void;
  setRunning: (bool: boolean) => void;
}

const useCountStore = create<CountState>()((set) => ({
  count: 0,
  increaseCount: () => set((state) => ({ count: state.count + 1 })),
  resetCount: () => set(() => ({ count: 0 })),
}));

const useTimeStore = create<TimeState>()((set) => ({
  time: 0,
  offset: 0,
  running: false,
  setTime: (t) => set((state) => ({ ...state, time: t })),
  resetTime: () => set((state) => ({ ...state, time: 0 })),
  setOffset: (t) => set((state) => ({ ...state, offset: t })),
  setRunning: (bool) => set(() => ({ running: bool })),
}));

const useRecordStore = create(() => ({
  records: () => {
    const currentTime = useTimeStore.getState().time;
    const savedTimes = localStorage.getItem("time");
    const timesArray = savedTimes ? JSON.parse(savedTimes) : null;
    let recordList;

    if (!timesArray) {
      recordList = [
        {
          time: currentTime,
          new: true,
        },
      ];
    } else {
      recordList = [...timesArray, currentTime]
        .sort((a, b) => a - b)
        .filter((_, index) => index < 3)
        .map((el: number) => ({
          time: el,
          new: el === currentTime ? true : false,
        }));
    }

    return recordList;
  },
}));

export { useCountStore, useTimeStore, useRecordStore };
