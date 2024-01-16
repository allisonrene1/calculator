"use strict";
let operator = "";
let previousValue = "";
let currentValue = "";

const displayScreen = document.getElementById("currentOperationScreen");
const smallDisplayScreen = document.getElementById("lastOperationScreen");
const numberButtons = document.querySelectorAll("[data-number]");
const operatorButtons = document.querySelectorAll("[data-operator]");
const equalsButton = document.getElementById("equalsBtn");
const clearButton = document.getElementById("clearBtn");
const deleteButton = document.getElementById("deleteBtn");
const decimalButton = document.getElementById("pointBtn");

displayScreen.textContent = "0";
displayScreen.style.fontFamily = "Arial";
smallDisplayScreen.style.fontFamily = "Arial";

function performOperation() {
  previousValue = Number(previousValue);
  currentValue = Number(currentValue);

  switch (operator) {
    case "+":
      previousValue += currentValue;
      break;
    case "-":
      previousValue -= currentValue;
      break;
    case "x":
      previousValue *= currentValue;
      break;
    case "÷":
      if (currentValue <= 0) {
        previousValue = "Error";
        displayResults();
        return;
      } else {
        previousValue /= currentValue;
      }
      break;
  }
  previousValue = roundResult(previousValue);
  displayResults();
}

// this ties into the performOperation() function
function displayResults() {
  previousValue = previousValue.toString();
  if (previousValue.length <= 9) {
    displayScreen.textContent = previousValue;
  } else {
    previousValue = previousValue.toString();
    displayScreen.textContent = previousValue.slice(0, 9) + "...";
  }
  smallDisplayScreen.textContent = "";
  operator = "";
  currentValue = "";
}

// Display the clicked number on main display screen
numberButtons.forEach((number) =>
  number.addEventListener("click", function (e) {
    handleNumber(e.target.textContent);
    displayScreen.textContent = currentValue;
  })
);

// Display operation in small screenand new number on main display screen
operatorButtons.forEach((op) =>
  op.addEventListener("click", function (e) {
    handleOperator(e.target.textContent);
    smallDisplayScreen.textContent = `${previousValue} ${operator}`;
    displayScreen.textContent = currentValue;
  })
);

// Evaluating and displaying the result of operation
equalsButton.addEventListener("click", function () {
  if ((previousValue != "" && currentValue != "") || previousValue == "") {
    performOperation();
  }
});

// Reset the calculator to its initial condition
clearButton.addEventListener("click", function () {
  displayScreen.textContent = "0";
  smallDisplayScreen.textContent = "";
  currentValue = "";
  previousValue = "";
  operator = null;
});

// Delete button as a named function with an event listener right below it. Don't ask me why. I'm tired
function deleteButtonClickHandler() {
  currentValue = currentValue.toString().slice(0, -1);
  displayScreen.textContent = currentValue;

  if (previousValue !== "" && currentValue === "" && operator === "") {
    previousValue = previousValue.toString().slice(0, 8);
    previousValue = previousValue.toString().slice(0, -1);
    displayScreen.textContent = previousValue;
  }
}
deleteButton.addEventListener("click", deleteButtonClickHandler);

// You know, decimal points and what not
decimalButton.addEventListener("click", function () {
  addDecimcal();
  displayScreen.textContent = currentValue;
});

// Evaluates whether theres an ongoing calculation (chaining operators)
function handleOperator(op) {
  if (previousValue === "") {
    previousValue = currentValue;
    operatorCheck(op);
  } else if (currentValue === "") {
    operatorCheck(op);
  } else {
    performOperation();
    operator = op;
    displayScreen.textContent = "0";
    smallDisplayScreen.textContent = previousValue + " " + operator;
  }
}

// this ties into the handleOperator function
function operatorCheck(text) {
  operator = text;
  smallDisplayScreen.textContent = previousValue + " " + operator;
  displayScreen.textContent = "0";
  currentValue = "";
}

// Some other functions to take care of stuff
function handleNumber(num) {
  if (currentValue.length <= 9) {
    currentValue += num;
    displayScreen.textContent = currentValue;
  }
}
function roundResult(number) {
  return Math.round(number * 1000) / 1000;
}
function addDecimcal() {
  currentValue += ".";
}
