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

const useRecordStore = create(() => ({
  records: () => {
    const saved = localStorage.getItem("time");
    var initialValue = JSON.parse(saved);
    const time = useTimeStore.getState().time;

    if (initialValue != null && !initialValue.includes(time)) {
      initialValue = [...initialValue, time]
        .sort((a, b) => a - b)
        .filter((_, index) => index < 3);

      initialValue = initialValue.map(function (el) {
        return {
          time: el,
          new: el === time ? true : false,
        };
      });
    } else {
      initialValue = [
        {
          time: time,
          new: true,
        },
      ];
    }

    return initialValue;
  },
}));

export { useCountStore, useTimeStore, useRecordStore };
