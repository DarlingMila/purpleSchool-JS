const card = "4561-2612-1234-5464"; // false
const card2 = "4561-2612-1234-5467"; // true
const card3 = "456f-2612-1234-5467"; // false

function checkLuhn(cardNumber) {
  const num = checkCardNumber(cardNumber);
  if (!num) return false;

  const arrayFromNum = num.split("");

  const sum = arrayFromNum.reduce((acc, operation, i) => {
    if ((i + 1) % 2 === 0) {
      acc += Number(operation);
    } else {
      let n = Number(operation) * 2;
      n = n > 9 ? n - 9 : n;
      acc += n;
    }
    return acc;
  }, 0);

  return sum % 10 === 0 && true;
}

function checkCardNumber(cardNumber) {
  let isOk = true;

  const num = cardNumber.trim().replaceAll("-", "");
  if (num.length !== 16) isOk = false;

  for (let el of num) {
    
    if (isNaN(Number(el))) {
      isOk = false;
      break;
    }
  }

  return isOk && num;
}

console.log(checkLuhn(card));
console.log(checkLuhn(card2));
console.log(checkLuhn(card3));
