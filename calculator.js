const buttons = document.querySelectorAll('.btn');
const userInput = document.querySelector('.userInput');
const userOutput = document.querySelector('.userOutput');

//setting default values to variables and operators.
let varCount = 0;
let firstInput = '';
let secondInput = '';
let operator = '';
//for calculation
let operandOne, operandTwo, operatorCollector, calculate;

function reset() {
    varCount = 0;
    firstInput = '';
    secondInput = '';
    operator = '';
}

buttons.forEach((item) => item.addEventListener('click', (item) => {
    const temp = item.currentTarget.textContent; //takes the string inside tags.
    userDisplay(temp);
}));

function userDisplay(temp) {

    varSeparation(temp);  //differentiates no. operator and other buttons
    if (temp == '=') return;
    else if (temp == 'AC') {
        userInput.textContent = '';
        userOutput.textContent = '';
        reset();
        return;
    }
    userInput.textContent += temp; //updates the display.
}
function varSeparation(item) {


    if (item == '+' || item == '-' || item == '*' || item == '/') {

        if (operator == '') {
            operator = item;
        }
        else {
            operatorCollector = item;
        }
        varCount++;
    }
    else if (varCount == 0) {
        firstInput += item;
    }
    else if (varCount == 1) {
        secondInput += item;
    }
    // when requirements calculation are met
    if (varCount == 2 || (varCount == 1 && item == '=' && secondInput != '')) {
        calculate = operate(firstInput, secondInput, operator);
        userInput.textContent = calculate;
        updateDisplay(calculate);
        varCount = 1;
        firstInput = calculate.toString();
        secondInput = '';
        operator = operatorCollector;
    }


    return;
}

function operate(firstInput, secondInput, operator) {

    operandOne = parseInt(firstInput);
    operandTwo = parseInt(secondInput);
    console.log(operator);

    switch (operator) {
        case '+':
            return operandOne + operandTwo;
        case '-':
            return operandOne - operandTwo;
        case '*':
            return operandOne * operandTwo;
        case '/':
            return operandOne / operandTwo;
    }
}

function updateDisplay(output) {

    userOutput.textContent = output;
}