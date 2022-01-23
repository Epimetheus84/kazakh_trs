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

export const fileSizeToMB = (fileSize) => {
  return parseInt(fileSize) / 1000000;
}

// kb, mb, gb
export const fileSizeToHuman = (fileSize) => {
  const size = fileSizeToMB(fileSize);
  if (size < 1) {
    return `${(size * 1000).toFixed(2)} KB`;
  } else if (size.toFixed(2) < 1000) {
    return `${size} MB`;
  } else {
    return `${size.toFixed(2) / 1000} GB`;
  }
}
