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
numberButtons.forEach((button) => {
    button.addEventListener('click', () => {
        let actualNumber = display.textContent;
        if (button.textContent === '.' && actualNumber.includes('.')) return 
        if (actualNumber.length > 12 && actualNumber !== error) { 
            display.textContent = error;
            return;
        }
        if (actualNumber === "0" || operating === true || actualNumber === error) {
            actualNumber = "";
        }
        actualNumber = actualNumber + button.textContent;
        display.textContent = actualNumber;
        input = true;
        operating = false;
    });
});

operatorButtons.forEach((button) => {
    button.addEventListener('click',() => {
        updatePreviousOperation()
        operation = button.getAttribute("id"); 
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
    });
});

equalButton.addEventListener('click', () => {
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
});

clearButton.addEventListener('click', () => {
    display.textContent = "0";
    calculation = 0;
});

deleteButton.addEventListener('click', () => {
    let length = display.textContent.length;
    if (length === 1) display.textContent = "0";
    else display.textContent = display.textContent.substring(0, length - 1);
});


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