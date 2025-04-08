"use strict";

const buttons = document.querySelector(".buttons-grid");
const display = document.getElementById("display");
let operator;
let numberOne;
let numberTwo;
let calculationComplete = false;

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

function formatResult(result) {
  if (!isFinite(result) || isNaN(result)) {
    return result === Infinity
      ? "Overflow"
      : result === -Infinity
      ? "-Overflow"
      : "Error";
  }

  const resultStr = result.toString();

  if (resultStr.length <= 8) {
    return result;
  }

  const wholePart = resultStr.split(".")[0];
  const isNegative = wholePart.startsWith("-");
  const wholeDigits = isNegative ? wholePart.length - 1 : wholePart.length;

  if (wholeDigits >= 8) {
    return result.toExponential(2);
  }

  const availableDecimals = 8 - wholePart.length - 1;
  return Number(result).toFixed(availableDecimals);
}

function handleDigit(digit) {
  if (display.textContent.length >= 9) return;

  if (!operator) {
    if (calculationComplete) {
      display.textContent = "";
      calculationComplete = false;
      numberOne = null;
    }

    if (display.textContent[0] === "0" && display.textContent[1] !== ".")
      display.textContent = display.textContent.substring(1);

    display.textContent += digit;
  } else {
    if (!numberTwo) {
      display.textContent = "";
    }

    display.textContent += digit;
    numberTwo = display.textContent;
  }
}

function handleDecimalPoint() {
  if (display.textContent.length >= 9 || display.textContent.includes("."))
    return;

  if (calculationComplete) {
    display.textContent = "0";
    calculationComplete = false;
    numberOne = null;
  }

  display.textContent += ".";
}

function handleOperator(op) {
  if (!operator) {
    numberOne = display.textContent;
    operator = op;
  } else if (!numberTwo) {
    operator = op;
  } else {
    const result =
      numberTwo === "0" && operator === "/"
        ? "Stupid?"
        : formatResult(operate(numberOne, operator, numberTwo));

    display.textContent = result;
    numberOne = display.textContent;
    operator = op;
    numberTwo = null;
    calculationComplete = true;
  }
}

function handleEquals() {
  if (!numberOne || !operator || !numberTwo) return;

  display.textContent =
    numberTwo === "0" && operator === "/"
      ? "Stupid?"
      : formatResult(operate(numberOne, operator, numberTwo));

  numberOne = display.textContent;
  operator = null;
  numberTwo = null;
  calculationComplete = true;
}

function handleClear() {
  numberOne = null;
  operator = null;
  numberTwo = null;
  display.textContent = "0";
}

function handleSign() {
  display.textContent = -display.textContent;
}

function handlePercent() {
  display.textContent = display.textContent / 100;
}

buttons.addEventListener("click", (e) => {
  const value = e.target.value;

  if (Number.isInteger(+value)) {
    handleDigit(value);
  } else if (value === ".") {
    handleDecimalPoint();
  } else if (["+", "-", "*", "/"].includes(value)) {
    handleOperator(value);
  } else if (value === "=") {
    handleEquals();
  } else if (value === "clear") {
    handleClear();
  } else if (value === "sign") {
    handleSign();
  } else if (value === "percent") {
    handlePercent();
  }
});

document.addEventListener("keydown", (e) => {
  if (["+", "-", "*", "/", "=", "Enter"].includes(e.key)) {
    e.preventDefault();
  }

  if (e.key >= "0" && e.key <= "9") {
    handleDigit(e.key);
  } else if (e.key === ".") {
    handleDecimalPoint();
  } else if (["+", "-", "*", "/"].includes(e.key)) {
    handleOperator(e.key);
  } else if (e.key === "Enter" || e.key === "=") {
    handleEquals();
  } else if (
    e.key === "Escape" ||
    e.key === "Delete" ||
    e.key === "c" ||
    e.key === "C"
  ) {
    handleClear();
  } else if (e.key === "%") {
    handlePercent();
  } else if (e.key === "Backspace") {
    handleBackspace();
  } else if (e.key === "F9" || e.key === "s" || e.key === "S") {
    handleSign();
  }
});

function handleBackspace() {
  if (calculationComplete) return;

  if (display.textContent.length > 1) {
    display.textContent = display.textContent.slice(0, -1);
  } else {
    display.textContent = "0";
  }

  if (operator && numberTwo) {
    numberTwo = display.textContent;
    if (display.textContent === "0" || display.textContent === "") {
      numberTwo = null;
    }
  }
}
