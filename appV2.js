const error = "ERROR. Too big"

let firstOperand = ''
let secondOperand = ''
let currentOperation = null
let shouldResetScreen = false

const currentOperationScreen = document.querySelector(".display");
const numberButtons = document.querySelectorAll(".number-button");
const operatorButtons = document.querySelectorAll(".operator-button");
const equalButton = document.querySelector("#equals");
const clearButton = document.querySelector("#clear-button");
const deleteButton = document.querySelector("#delete-button");


//Listeners
numberButtons.forEach((button) =>
    button.addEventListener('click', () => appendNumber(button.textContent))
)

operatorButtons.forEach((button) =>
button.addEventListener('click', () => setOperation(button.getAttribute("id")))
)

equalButton.addEventListener('click', evaluate);
clearButton.addEventListener('click', clear);
deleteButton.addEventListener('click', deleteNumber);


//Basic Math Operators
function add(array) {
	return array.reduce((total, num) => {
        return total += num;
      }, 0);
};

function subtract(array) {
	return array.reduce((total, num) => {
        return total = total - num;
      });
};

function multiply(array) {
  return array.reduce((total,num) => {
    return total = total * num;
  }, 1);
};

function divide(array) {
	return array.reduce((total,num) => {
        total = total / num;
        return total.toFixed(4);
      });
};


//Operate
function operate(operator, x, y) {
    input = false;
    let numbers = new Array(x,y);
    return operator(numbers);
}


//Buttons
function appendNumber(number) {
    if (currentOperationScreen.textContent === '0' || shouldResetScreen)
      resetScreen()
    currentOperationScreen.textContent += number
}

function setOperation(operator) {
    if (currentOperation !== null) evaluate()
    firstOperand = currentOperationScreen.textContent
    currentOperation = operator
    //lastOperationScreen.textContent = `${firstOperand} ${currentOperation}`
    shouldResetScreen = true
}

function evaluate() {
    if (currentOperation === null || shouldResetScreen) return
    if (currentOperation === '÷' && currentOperationScreen.textContent === '0') {
      alert("You can't divide by 0!")
      return
    }
    secondOperand = currentOperationScreen.textContent
    currentOperationScreen.textContent = roundResult(
      operate(Function('"use strict";return (' + currentOperation + ')').call(), 
        parseInt(firstOperand), parseInt(secondOperand))
    )
    //lastOperationScreen.textContent = `${firstOperand} ${currentOperation} ${secondOperand} =`
    currentOperation = null
}

function clear() {
    currentOperationScreen.textContent = '0'
    //lastOperationScreen.textContent = ''
    firstOperand = ''
    secondOperand = ''
    currentOperation = null
  }

function deleteNumber() {
    currentOperationScreen.textContent = currentOperationScreen.textContent
      .toString()
      .slice(0, -1)
  }
  
function resetScreen() {
    currentOperationScreen.textContent = ''
    shouldResetScreen = false
}

function roundResult(number) {
    return Math.round(number * 1000) / 1000
}