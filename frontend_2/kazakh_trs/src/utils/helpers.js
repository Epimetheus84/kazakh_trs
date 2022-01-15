export const dateHuman = (date) => {
  const dateObj = new Date(date * 1000);

  const [day, month, year, hours, minutes] = [
    dateObj.getDate(),
    dateObj.getMonth() + 1,
    dateObj.getFullYear(),
    dateObj.getHours(),
    dateObj.getMinutes(),
  ];

  return `${day}.${month}.${year} ${hours}:${minutes}`;
};
