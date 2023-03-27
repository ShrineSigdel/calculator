let firstOperand = '', secondOperand = '', opr = '';
let gotOperator = false; // to make the calculations occur in pair.


const userInput = document.querySelector('.userInput');
const userOutput = document.querySelector('.userOutput');
const numbers = document.querySelectorAll('[data-number]');
const operators = document.querySelectorAll('[operator]');
const equalBtn = document.getElementById('equal-btn');
const decimal = document.getElementById('decimal');
const acBtn = document.getElementById('ac-btn');
const clearBtn = document.getElementById('clear-btn');


window.addEventListener('keydown',handleKeyboard);
numbers.forEach(number => number.addEventListener('click', () => appendNumber(number.textContent)));
operators.forEach(operator => operator.addEventListener('click', () => checkOperation(operator.textContent)));
equalBtn.addEventListener('click', equalBtnOperation);

function equalBtnOperation () {
    userOutput.textContent = evaluate(firstOperand, secondOperand, opr);
    opr = '';
    restoreValues();
    return;
}


acBtn.addEventListener('click', () => {

    firstOperand = '', secondOperand = '', opr = '';
    gotOperator = false;
    userInput.textContent = '';
    userOutput.textContent = '00';
});

// clearBtn.addEventListener('click', () => {
//     userInput.textContent = userInput.textContent.slice(0,-1);
    
//     if(gotOperator === true) {
//         secondOperand = secondOperand.slice(0,-1);
//     }
//     else{
//         firstOperand = userInput.textContent;
//     }
// });

function appendNumber(number) {
    userInput.textContent += number;
    if (gotOperator === true) {
        secondOperand += number;
    }
    return;
}

function checkOperation(operator) {
    
    if (opr === '') {
        opr = operator;
        firstOperand = userInput.textContent;
        gotOperator = true;
        userInput.textContent += opr;
        return;
    }
    else {
        userOutput.textContent = evaluate(firstOperand, secondOperand, opr);
        opr = operator;
        restoreValues();
        return;
    }
}

function evaluate(firstOperand, secondOperand, opr) {
    const a = parseFloat(firstOperand);
    const b = parseFloat(secondOperand);
    switch (opr) {
        case '+':
            return Math.round((a + b) * 100) / 100;
        case '-':
            return Math.round((a - b) * 100) / 100;
        case '*':
            return Math.round((a * b) * 100) / 100;
        case '/':
            return Math.round((a / b) * 100) / 100;
    }
}

function restoreValues() {
    firstOperand = userOutput.textContent;
    secondOperand = '';
    userInput.textContent = userOutput.textContent + opr;
}

function handleKeyboard(btn) {
    if(btn.key >=0 && btn.key<=9) appendNumber(btn.key);
    if(btn.key == '+' ||btn.key == '-' || btn.key == '*' || btn.key == '/') checkOperation(btn.key);
    if(btn.key =='Enter') equalBtnOperation();

}























