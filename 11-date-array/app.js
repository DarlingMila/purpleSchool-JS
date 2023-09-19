const array = [
  "10-02-2020",
  "тест",
  "11/12/2023",
  "00/13/2022",
  "41/12/2023",
  "31-03-2023",
  "29-02-2025",
  "29-02-2024",
  "dg/03/2013",
  "03/as/2013",
  "03-as-2013",
  "03-03-erhn",
];

function filterAndFormatDates(arr) {
  const newArray = [];

  arr.forEach((date) => {
    if (!date.split("/").length === 3 || !date.split("-").length === 3) return;

    let [day, month, year] = "";

    if (date.split("-").length === 3) {
      [day, month, year] = date.split("-");
    }

    if (date.split("/").length === 3) {
      [month, day, year] = date.split("/");
    }

    const isOk = checkDate(day, month, year);
    if (isOk) newArray.push([day, month, year].join("-"));
  });

  return newArray;
}

function checkDate(day, month, year) {
  let dayIsCorrect = day >= 1 && day <= 31;
  const monthIsCorrect = month >= 1 && month <= 12;
  const yearIsCorrect = year >= 0;

  switch (true) {
    case month === "02" && year % 4 === 0:
      dayIsCorrect = day <= 29;
      break;
    case month === "02":
      dayIsCorrect = day <= 28;
      break;
    case month % 2 === 0:
      dayIsCorrect = day <= 30;
      break;
  }

  return dayIsCorrect && monthIsCorrect && yearIsCorrect;
}

console.log(filterAndFormatDates(array));
