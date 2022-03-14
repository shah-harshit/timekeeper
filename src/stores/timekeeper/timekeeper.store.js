import create from "zustand";
import { DEFAULT_DURATION } from "../../constants";

export const useTimeKeeperStore = create((set) => ({
  duration: DEFAULT_DURATION,
  setDuration: (duration) => {
    set({ duration });
  },
  endTime: new Date().getTime(),
  setEndTime: (endTime) => {
    set({ endTime });
  },
  isDefaultDuration: true,
  setIsDefaultDuration: (isDefaultDuration) => {
    set({ isDefaultDuration });
  },
}));
