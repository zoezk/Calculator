"use strict";

const buttons = document.querySelector(".buttons-grid");
const display = document.getElementById("display");
let operator;
let numberOne;
let numberTwo;

const add = function (a, b) {
  console.log(a, b);
  return +a + +b;
};

const subtract = function (a, b) {
  console.log(a, b);
  return +a - +b;
};

const multiply = function (a, b) {
  return +a * +b;
};

const divide = function (a, b) {
  return +a / +b;
};

const operate = function (numberOne, operator, numberTwo) {
  if (operator === "+") return add(numberOne, numberTwo);
  if (operator === "-") return subtract(numberOne, numberTwo);
  if (operator === "*") return multiply(numberOne, numberTwo);
  if (operator === "/") return divide(numberOne, numberTwo);
};

buttons.addEventListener("click", (e) => {
  if (
    Number.isInteger(+e.target.value) &&
    display.textContent.length < 8 &&
    !operator
  ) {
    if (display.textContent[0] === "0")
      display.textContent = display.textContent.substring(1);
    display.textContent += e.target.value;
  }

  if (
    !operator &&
    (e.target.value === "+" ||
      e.target.value === "/" ||
      e.target.value === "-" ||
      e.target.value === "*")
  ) {
    numberOne = display.textContent;
    operator = e.target.value;
    console.log(numberOne, operator);
  }

  if (
    Number.isInteger(+e.target.value) &&
    numberOne &&
    operator &&
    display.textContent.length < 8
  ) {
    if (!numberTwo) {
      display.textContent = "";
    }
    display.textContent += e.target.value;

    numberTwo = display.textContent;
    console.log(numberTwo);
  }

  if (numberOne && operator && numberTwo && e.target.value === "=") {
    display.textContent = operate(numberOne, operator, numberTwo);
    console.log(operate(numberOne, operator, numberTwo));

    numberOne = display.textContent;
    operator = null;
    numberTwo = null;
  }

  if (
    numberOne &&
    operator &&
    numberTwo &&
    (e.target.value === "-" ||
      e.target.value === "+" ||
      e.target.value === "*" ||
      e.target.value === "/")
  ) {
    display.textContent = operate(numberOne, operator, numberTwo);
    console.log(operate(numberOne, operator, numberTwo));

    numberOne = display.textContent;
    operator = e.target.value;
    numberTwo = null;
  }

  if (e.target.value === "sign") {
    display.textContent = -display.textContent;
  }

  if (e.target.value === "clear") {
    numberOne = null;
    operator = null;
    numberTwo = null;
    display.textContent = 0;
  }

  if (e.target.value === "percent") {
    display.textContent = display.textContent / 100;
  }
});
