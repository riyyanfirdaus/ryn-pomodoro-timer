type Items = {
  work: number;
  shortBreak: number;
  longBreak: number;
};

export const fetchData = (key: string) => {
  return JSON.parse(localStorage.getItem(key) || "{}");
};

export const settingTimeItems = ({ work, shortBreak, longBreak }: Items) => {
  const timeItem = {
    work,
    shortBreak,
    longBreak,
  };

  const existingTimeItems = fetchData("TimeItmes") ?? [];
  if (existingTimeItems) {
    return localStorage.setItem("TimeItmes", JSON.stringify({ ...existingTimeItems, timeItem }));
  }
  return localStorage.setItem("TimeItmes", JSON.stringify(timeItem));
};
