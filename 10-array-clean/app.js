const array = [5, -4, -7, 2, 6, 3, 4, -5, 9, 0];

function filterArray(arr, fn) {
  const newArr = [];

  for (let el of arr) {
    const res = fn(el);
    if (res) continue;
    newArr.push(el);
  }

  return newArr;
}

function removeElement(num) {
  if (num <= 3) return true;
  return false;
}

console.log(filterArray(array, removeElement));
