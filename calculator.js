let firstOperand = '', secondOperand = '', currentOperator = null;
let shouldResetScreen = false;


const lastWorkingScreen = document.querySelector('.userInput');
const currentWorkingScreen = document.querySelector('.userOutput');
const numbers = document.querySelectorAll('[data-number]');
const operators = document.querySelectorAll('[operator]');
const equalBtn = document.getElementById('equal-btn');
const decimal = document.getElementById('decimal');
const acBtn = document.getElementById('ac-btn');
const clearBtn = document.getElementById('clear-btn');


window.addEventListener('keydown', handleKeyboard);
numbers.forEach(number => number.addEventListener('click', () => appendNumber(number.textContent)));
operators.forEach(operator => operator.addEventListener('click', () => checkOperation(operator.textContent)));
equalBtn.addEventListener('click', evaluate);
clearBtn.addEventListener('click', clearBtnOperation);
acBtn.addEventListener('click', acBtnOperation);
decimal.addEventListener('click',handleDecimal);


function clearBtnOperation() {
    currentWorkingScreen.textContent = currentWorkingScreen.textContent.slice(0, -1);
}

function acBtnOperation() {
    firstOperand = '', secondOperand = '', currentOperator = null;
    shouldResetScreen = false;
    currentWorkingScreen.textContent = '';
    lastWorkingScreen.textContent = '0';
}

function appendNumber(number) {
    if (shouldResetScreen == true) {
        resetScreen();
    }
    currentWorkingScreen.textContent += number;
}

function checkOperation(operator) {
    if (currentOperator == null) {
        shouldResetScreen = true;
        firstOperand = currentWorkingScreen.textContent;
        currentOperator = operator;
        currentWorkingScreen.textContent = `${firstOperand}${currentOperator}`;
    }
    else {
        secondOperand = currentWorkingScreen.textContent;
        evaluate();
    }
}

function evaluate() {
    if (currentOperator == null) return;
    let calc;
    secondOperand = currentWorkingScreen.textContent;
    const a = parseFloat(firstOperand);
    const b = parseFloat(secondOperand);
    switch (currentOperator) {
        case '+':
            calc = Math.round((a + b) * 100) / 100;
            break;
        case '-':
            calc = Math.round((a - b) * 100) / 100;
            break;
        case '*':
            calc = Math.round((a * b) * 100) / 100;
            break;
        case '/':
            if( secondOperand == 0) {
                currentWorkingScreen.textContent = 'Error, Press AC to continue';
                return;
            }
            calc = Math.round((a / b) * 100) / 100;
            break;
    }
    lastWorkingScreen.textContent = `${firstOperand}${currentOperator}${secondOperand}  = ${calc}`;
    currentWorkingScreen.textContent = calc;
    shouldResetScreen = true;
    currentOperator = null;
}

function resetScreen() {
    if (lastWorkingScreen.textContent !== '' || lastWorkingScreen.textContent !== '0') lastWorkingScreen.textContent = currentWorkingScreen.textContent;
    currentWorkingScreen.textContent = '';
    shouldResetScreen = false;
}

function handleKeyboard(btn) {
    if (btn.key >= 0 && btn.key <= 9) appendNumber(btn.key);
    if (btn.key == '+' || btn.key == '-' || btn.key == '*' || btn.key == '/') checkOperation(btn.key);
    if (btn.key == 'Enter') evaluate();
    if (btn.key == 'Backspace') clearBtnOperation();
    if (btn.key == 'Esc') acBtnOperation();
}

function handleDecimal() {
    if(! currentWorkingScreen.textContent.includes('.') ){
        currentWorkingScreen.textContent += '.';
    }
}


























