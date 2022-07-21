const display = document.querySelector(".display");
const numberButtons = document.querySelectorAll(".number-button");


//Listeners
numberButtons.forEach((button) => {
    button.addEventListener('click', () => {
        let actualNumber = display.textContent;
        actualNumber = actualNumber + button.textContent;
        display.textContent = actualNumber;
    });
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

