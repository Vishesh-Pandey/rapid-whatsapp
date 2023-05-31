export const saveHistory = (number, timedate) => {
  let historyArray;
  let currentHistory = localStorage.getItem("history");
  if (!currentHistory) {
    historyArray = [];
  } else {
    historyArray = JSON.parse(currentHistory);
  }
  historyArray.unshift({
    number: number,
    timedate: timedate,
  });
  localStorage.setItem("history", JSON.stringify(historyArray));
};
