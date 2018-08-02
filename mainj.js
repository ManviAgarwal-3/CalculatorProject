const screen = document.querySelector(".screen");
let runningTotal = 0;
let currentInput = "0";
let previousOperator;

function handleButtonType(value) {
  if (isNaN(value)) {
    handleSymbols(value);
  } else {
    handleNumbers(value);
  }

  rerender();
}

function handleNumbers(value) {
  if (currentInput === "0") {
    currentInput = value;
  } else {
    currentInput += value;
  }
}

function handleMath(value) {
  if (currentInput === "0") {
    return;
  }

  const intCurrentInput = parseInt(currentInput);
  if (runningTotal === 0) {
    runningTotal = intCurrentInput;
  } else {
    flushOperation(intCurrentInput);
  }

  previousOperator = value;

  currentInput = "0";
}

function flushOperation(intCurrentInput) {
  if (previousOperator === "+") {
    runningTotal += intCurrentInput;
  } else if (previousOperator === "-") {
    runningTotal -= intCurrentInput;
  } else if (previousOperator === "x") {
    runningTotal *= intCurrentInput;
  } else if (previousOperator === "÷") {
    runningTotal /= intCurrentInput;
  }
}

function rerender() {
  screen.innerText = currentInput;
}

function handleSymbols(value) {
  switch (value) {
    case "C":
      currentInput = "0";
      runningTotal = 0;
      break;

    case "←":
      if (currentInput.length === 1) {
        currentInput = "0";
      } else {
        currentInput = currentInput.substring(0, currentInput.length - 1);
      }
      break;

    case "÷":
    case "x":
    case "-":
    case "+":
      handleMath(value);
      break;
    case "=":
      if (previousOperator === null) {
        return;
      }
      flushOperation(parseInt(currentInput));
      previousOperator = null;
      currentInput = +runningTotal;
      runningTotal = 0;
      break;
  }
}

function init() {
  document
    .querySelector(".calculator-btns")
    .addEventListener("click", function(event) {
      handleButtonType(event.target.innerText);
    });
}

init();
