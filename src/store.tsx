import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

type Store = {
  dataTimer: {
    work: number;
    shortBreak: number;
    longBreak: number;
  };
  updateTimer: (newTime: { work: number; shortBreak: number; longBreak: number }) => any;
};

export const useTimerStore = create<Store>()(
  persist(
    (set) => ({
      dataTimer: {
        work: 25,
        shortBreak: 5,
        longBreak: 30,
      },
      updateTimer: (dataTimer: { work: number; shortBreak: number; longBreak: number }): void => {
        set((): any => {
          return { dataTimer };
        });
      },
    }),
    { name: "timer-storage", storage: createJSONStorage(() => localStorage) }
  )
);
