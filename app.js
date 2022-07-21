let calculation;
let operation;
let operating = false; //reset display when in an operation
let first = true; //first iteration of an operation
let calculated = false; //Pressed the equals button
let input = false; //don't operate until new number is inputted

const display = document.querySelector(".display");
const numberButtons = document.querySelectorAll(".number-button");
const operatorButtons = document.querySelectorAll(".operator-button");
const equalButton = document.querySelector("#equals");


//Listeners
numberButtons.forEach((button) => {
    button.addEventListener('click', () => {
        let actualNumber = display.textContent;
        if (actualNumber === "0" || operating === true) actualNumber = "";
        actualNumber = actualNumber + button.textContent;
        display.textContent = actualNumber;
        input = true;
        operating = false;
    });
});

operatorButtons.forEach((button) => {
    button.addEventListener('click',() => {
        operation = button.getAttribute("id");
        if (first) { //First iteration
            calculation = display.textContent;
            first = false;
        }
        else if (!input) { //Need a second number to operate, dont use the same!

        } else {
            calculation = operate(Function('"use strict";return (' + operation + ')').call(), 
                parseInt(calculation), parseInt(display.textContent));  
        }
        operating = true;
        calculated = false;
        display.textContent = calculation;
    });
});

equalButton.addEventListener('click', () => {
    if (input && !calculated) {
        calculation = operate(Function('"use strict";return (' + operation + ')').call(), 
            parseInt(calculation), parseInt(display.textContent));
        display.textContent = calculation;
    }
    first = true; //Reset operation 
    operating = false; //Reset operation
    calculated = true; //Finished calculation
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
        return total = total / num;
      });
};


//Operate
function operate(operator, x, y) {
    input = false;
    let numbers = new Array(x,y);
    return operator(numbers);
}

console.log(subtract([3,2]))