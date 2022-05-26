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
};

// This function stores the value on button event and displays
// On Memory and Output Paragraphs of Calculator
const storeVal = (val) => {

    // Store initial value:
    if ( operation.length < 1 ) {
        operation.push(val);

    } else if ( ( val != '+' && val != '-' && val != 'x' && val != '/' ) && 
    ( operation.slice(-1) != '+' && operation.slice(-1) != '-' && operation.slice(-1) != 'x' && operation.slice(-1) != '/') ) {
        // Store a two digit value of a two click event:
        operation[operation.length - 1] += val;

    } else {
        // Store the second value:
        operation.push(val);
    };

    let i = operation.length - 1; 
    if ( i < 1 ) {  
        // Erases default 0
        // Displays first value
        outputA.textContent = operation[i];  // First value will always be first index of operation array
        memoryA.textContent = outputA.textContent;

    } else if ( operation[i] === '+' || operation[i] === '-' || operation[i] === 'x' || operation[i] === '/' ) {
        // Adds spaces in operation between operators
        outputA.textContent += ' ' + operation[i] + ' ';
        memoryA.textContent = outputA.textContent;

    } else {
        // Displays second value
        outputA.textContent += val;  // Second value is displayed via val argument on event click rather than operation array
        memoryA.textContent = outputA.textContent;
    }
};

// This function fires when equals is selected
const equalsActivated = () => {
    let a = Number(operation[0]);
    let b = Number(operation[2]);
    let operator = operation[1];

    outputA.textContent = operate(operator, a, b);
    memoryA.textContent = outputA.textContent;

    // Reset array for new operation:
    operation = [];
};

// Store first value, operator, and second value:
let operation = [];


// Memory and Output Paragraphs for Calculator 1 (A)
const calc1 = document.getElementById('calc1');
const outputA = document.getElementById('outputA');
const memoryA = document.getElementById('memoryA');