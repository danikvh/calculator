let calculation;
let operation;
let operating = false; //reset display when in an operation
let first = true; //first iteration of an operation
let calculated = false; //Pressed the equals button

const display = document.querySelector(".display");
const numberButtons = document.querySelectorAll(".number-button");
const operatorButtons = document.querySelectorAll(".operator-button");
const equalButton = document.querySelector("#equals");


//Listeners
numberButtons.forEach((button) => {
    button.addEventListener('click', () => {
        let actualNumber = display.textContent;
        if (actualNumber === "0" || operating === true || calculated === true) actualNumber = "";
        actualNumber = actualNumber + button.textContent;
        display.textContent = actualNumber;
        calculated = false;
    });
});

operatorButtons.forEach((button) => {
    button.addEventListener('click',() => {
        operation = button.getAttribute("id");
        if (first) { 
            calculation = display.textContent;
            first = false;
        }
        else {
            calculation = operate(eval(operation), 
            parseInt(calculation), parseInt(display.textContent));
        }
        operating = true;
        display.textContent = calculation;
    });
});

equalButton.addEventListener('click', () => {
    calculation = operate(eval(operation), parseInt(calculation), parseInt(display.textContent));
    display.textContent = calculation;
    first = true;
    operating = false;
    calculated = true;
});


//Basic Math Operators
function add(array) {
	return array.reduce((total, num) => {
        return total += num;
      }, 0);
};

function subtract(array) {
	return array.reduce((total, num) => {
        return total -= num;
      }, 0);
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
    let numbers = new Array(x,y);
    return operator(numbers);
}
