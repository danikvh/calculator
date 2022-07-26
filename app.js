const error = "ERROR. Too big"

let calculation;
let operation;
let previousOperation; //used when chaining operations
let hangingOperation = ""; //used when chaining operations
let operating = false; //reset display when in an operation
let first = true; //first iteration of an operation
let calculated = false; //Pressed the equals button
let input = false; //don't operate until new number is inputted

const display = document.querySelector(".display");
const numberButtons = document.querySelectorAll(".number-button");
const operatorButtons = document.querySelectorAll(".operator-button");
const equalButton = document.querySelector("#equals");
const clearButton = document.querySelector("#clear-button");
const deleteButton = document.querySelector("#delete-button");


//Listeners
numberButtons.forEach((button) => 
    button.addEventListener('click', () => introduceNumber(button.textContent))
);

operatorButtons.forEach((button) => 
    button.addEventListener('click', () => setOperator(button.getAttribute("id")))
);

equalButton.addEventListener('click', evaluate);
clearButton.addEventListener('click', clear);
deleteButton.addEventListener('click', deletion);
window.addEventListener('keydown', handleKeyboard);


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
        return total.toFixed(2);
      });
};


//Operate
function operate(operator, x, y) {
    input = false;
    let numbers = new Array(x,y);
    return operator(numbers);
}

function updatePreviousOperation() {
    if (hangingOperation !== "") { //operation gets overriden
        previousOperation = hangingOperation;
        hangingOperation = "";
    } else { //operation is not overriden
        previousOperation = operation;
    }
}


//Buttons
function introduceNumber(number) {
    let actualNumber = display.textContent;
    if (number === '.' && actualNumber.includes('.')) return 
    if (actualNumber.length > 12 && actualNumber !== error) { 
        display.textContent = error;
        return;
    }
    if (actualNumber === "0" || operating === true || actualNumber === error) {
        actualNumber = "";
    }
    actualNumber = actualNumber + number;
    display.textContent = actualNumber;
    input = true;
    operating = false;
}

function setOperator(op) {
    updatePreviousOperation()
    operation = op; 
    if (first) { //First iteration
        calculation = display.textContent;
        first = false;
    } else if (!input) { //Need a second number to operate, dont use the same!
    } else {
        if (operation !== previousOperation) {
            hangingOperation = operation;
            operation = previousOperation;
        }
        calculation = operate(Function('"use strict";return (' + operation + ')').call(), 
            parseFloat(calculation), parseFloat(display.textContent)); 
    }
    operating = true;
    calculated = false;
    display.textContent = calculation;
}

function evaluate() {
    updatePreviousOperation()
    if (operation !== previousOperation) {
        operation = previousOperation;
    }
    //Calculate if we have an input and we are not making equals again
    if (input && !calculated) {
        calculation = operate(Function('"use strict";return (' + operation + ')').call(), 
            parseFloat(calculation), parseFloat(display.textContent));
        display.textContent = calculation;
    }

    //ERROR big number
    if (display.textContent.length > 12) { 
        display.textContent = error;
        calculation = 0;
    }

    first = true; //Reset operation 
    operating = false; //Reset operation
    calculated = true; //Finished calculation
}

function clear() {
    display.textContent = "0";
    calculation = 0;
}

function deletion() {
    let length = display.textContent.length;
    if (length === 1) display.textContent = "0";
    else display.textContent = display.textContent.substring(0, length - 1);
}

function handleKeyboard(e) {
    if ((e.key >= 0 && e.key <= 9) || e.key === '.') introduceNumber(e.key)
    else if (e.key === '+') setOperator(add)
    else if (e.key === '-') setOperator(subtract)
    else if (e.key === '*') setOperator(multiply)
    else if (e.key === '/') setOperator(divide)
    else if (e.key === 'Enter' || e.key === '=') evaluate()
    else if (e.key === 'Backspace') deletion()
    else if (e.key === 'Escape') clear()
}