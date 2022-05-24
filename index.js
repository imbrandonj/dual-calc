// Math Operators
const add = (a, b) => a + b;

const subtract = (a, b) => a - b;

const multiply = (a, b) => a * b;

const divide = (a, b) => a / b;

// Takes an operator and two numbers and calls one of the above functions
const operate = (operator, a, b) => {
    switch ( operator ) {
        case '+':
            return add(a, b);
        case '-':
            return subtract(a, b);
        case 'x':
            return multiply(a, b);
        case '/':
            return divide(a, b);
    }
}

// This function stores the value on button event and displays
// On Memory and Output
const storeVal = (val) => {
    operation.push(val);

    let i = operation.length - 1;
    if ( i < 1 ) {  // Erases default 0
        outputA.textContent = operation[i];
        memoryA.textContent = outputA.textContent;
    } else if ( operation[i] === '+' || operation[i] === '-' || operation[i] === 'x' || operation[i] === '/' ) {
        // Adds spaces in operation
        outputA.textContent += ' ' + operation[i] + ' ';
        memoryA.textContent = outputA.textContent;
    } else {
        outputA.textContent += operation[i];
        memoryA.textContent = outputA.textContent;
    }
}

// This function fires when equals is selected
const equalsActivated = () => {
    let a = operation[0];
    let b = operation[2];
    let operator = operation[1];

    outputA.textContent = operate(operator, a, b);
    memoryA.textContent = outputA.textContent;
}

// Stores operation values and operators
let operation = [];


// Memory and Output Paragraphs for Calculator 1 (A)
const calc1 = document.getElementById('calc1')
const outputA = document.getElementById('outputA');
const memoryA = document.getElementById('memoryA');