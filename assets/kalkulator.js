const calculator = {
  displayNumber: "0",
  operator: null,
  firstNumber: null,
  waitingForSecondNumber: false,
};

function updateNumber() {
  document.querySelector("#displayNumber").innerText = calculator.displayNumber;
}

function clearCalculator() {
  (calculator.displayNumber = "0"),
    (calculator.operator = null),
    (calculator.firstNumber = null),
    (calculator.waitingForSecondNumber = false);
}

function inputDigit(digit) {
  calculator.displayNumber === "0"
    ? (calculator.displayNumber = digit)
    : (calculator.displayNumber += digit);
}

function inverseNumber() {
  if (calculator.displayNumber === "0") {
    return;
  }

  calculator.displayNumber = calculator.displayNumber * -1;
}

function handleOperator(operator) {
  if (!calculator.waitingForSecondNumber) {
    calculator.operator = operator;
    calculator.waitingForSecondNumber = true;
    calculator.firstNumber = calculator.displayNumber;

    //Set display number jadi 0
    calculator.displayNumber = "0";
  } else {
    alert("Operator sudah ditetapkan");
  }
}

function performCalculation() {
  if (calculator.firstNumber === null || calculator.operator === null) {
    alert("Silahkan tentukan operator yang ingin dipakai");
    return;
  }

  let result = "0";
  if (calculator.operator === "+") {
    result =
      parseInt(calculator.firstNumber) + parseInt(calculator.displayNumber);
  } else {
    result =
      parseInt(calculator.firstNumber) - parseInt(calculator.displayNumber);
  }

  const history = {
    firstNumber: calculator.firstNumber,
    operator: calculator.operator,
    secondNumber: calculator.displayNumber,
    result: result,
  };

  putHistory(history);
  calculator.displayNumber = result;
  renderHistory();
}

const buttons = document.querySelectorAll(".button");

for (let button of buttons) {
  button.addEventListener("click", (event) => {
    const target = event.target;

    if (target.classList.contains("negative")) {
      inverseNumber();
      updateNumber();
      return;
    }

    if (target.classList.contains("operator")) {
      handleOperator(target.innerText);
      return;
    }

    if (target.classList.contains("equals")) {
      performCalculation();
      updateNumber();
      return;
    }
    if (target.classList.contains("clear")) {
      clearCalculator();
      updateNumber();
      return;
    }

    inputDigit(target.innerText);
    updateNumber();
  });
}
