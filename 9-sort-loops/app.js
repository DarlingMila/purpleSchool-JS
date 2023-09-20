const arr = [1, 40, -5, 10, 0, 200, -200];

function sortArray(array) {
  const copiedArray = [...array];
  const arrLength = array.length;

  for (let i = 0; i < arrLength - 1; i++) {

    for (let j = i + 1; j < arrLength; j++) {

      if (copiedArray[j] < copiedArray[i]) {
        
        [copiedArray[i], copiedArray[j]] = [copiedArray[j], copiedArray[i]];
      }
    }
  }

  return copiedArray;
}

console.log(sortArray(arr));
