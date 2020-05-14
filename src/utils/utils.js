export const getDate = () => {
  return new Date()
    .toLocaleString("ru-RU", { timeZone: "Europe/Moscow" })
    .slice(0, 10);
};

export const getCurrentTime = () => {
  return new Date()
    .toLocaleString("ru-RU", { timeZone: "Europe/Moscow" })
    .slice(12, 17);
};
