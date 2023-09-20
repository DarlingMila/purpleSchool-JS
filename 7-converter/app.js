const currencyConverter = (amount, from, to) => {
  let money;

  switch (`${from}/${to}`) {
    case "RUB/USD":
      money = amount * 0.01;
      break;
    case "RUB/EUR":
      money = amount * 0.0096;
      break;
    case "USD/RUB":
      money = amount * 96.02;
      break;
    case "USD/EUR":
      money = amount * 0.92;
      break;
    case "EUR/RUB":
      money = amount * 104.23;
      break;
    case "EUR/USD":
      money = amount * 1.09;
      break;
    default:
      money = null;
      break;
  }

  return money;
};

console.log(currencyConverter(1000, "RUB", "USD"));
console.log(currencyConverter(500, "USD", "RUB"));
console.log(currencyConverter(200, "USD", "EUR"));
console.log(currencyConverter(1700, "EUR", "RUB"));
console.log(currencyConverter(600, "CNY", "RUB"));
console.log(currencyConverter(800, "EUR", "CHF"));
