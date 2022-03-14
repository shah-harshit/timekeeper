import { LOCALE, TIME_FORMAT } from "../constants";

export const getTimeString = (date) =>
  new Date(date).toLocaleTimeString(LOCALE, TIME_FORMAT);

export const getStartTime = (endTime, duration) => endTime - duration * 60000;
