function convertToSearchString(queryObj) {
  let string = "";
  for (const key in queryObj) {
    string += `${key}=${queryObj[key]}&`;
  }
  return string.slice(0, -1);
}

const obj = {
  search: "Вася",
  take: 10,
};

console.log(convertToSearchString(obj));
