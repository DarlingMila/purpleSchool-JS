"use strict";

const calc = document.querySelector(".calc");

const showSign = document.querySelector(".sign");
const operationSigns = document.querySelectorAll(".operationBtn");
const resultBtn = document.querySelector(".equalBtn");

const firstDigit = document.querySelector(".firstDigit");
const secondDigit = document.querySelector(".secondDigit");

const resultOutput = document.querySelector(".output");

function changeSign(e) {
  const newSign = e.target.innerText;
  if (newSign === "Clear") return clear();
  showSign.textContent = newSign;
}

function clear() {
  firstDigit.value = "";
  secondDigit.value = "";
  showSign.textContent = "";
  resultOutput.textContent = "";
}

function getResult() {
  if (firstDigit.value === "" || secondDigit.value === "")
    return alert("Введены не все значения");

  if (showSign.textContent === "") return alert("Не выбран знак");

  const dig1 = +firstDigit.value;
  const dig2 = +secondDigit.value;

  let result;

  switch (showSign.textContent) {
    case "+":
      result = dig1 + dig2;
      break;
    case "-":
      result = dig1 - dig2;
      break;
    case "/":
      if (dig2 === 0) return alert("Деление на ноль");
      result = dig1 / dig2;
      break;
    case "*":
      result = dig1 * dig2;
      break;
  }

  resultOutput.textContent = result;
}

function getBtnFunc(e) {
  const target = e.target;

  switch (true) {
    case target.classList.contains("equalBtn"):
      getResult();
      break;
    case target.classList.contains("operationBtn"):
      changeSign(e);
      break;
  }
}

calc.addEventListener("click", getBtnFunc);
