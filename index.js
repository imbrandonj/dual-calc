// This JavaScript file handles the functions of a calculator
// Where a button onclick event is selected from the html
// The phrase "first button selected", "second button selected", "third button", etc.
// Indicates the ordering of which button is clicked on the calculator


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


// Primary event function
// Called on button event
// This function stores the button value
// Assesses the value as a number or operand,
// The order of the values, 
// Or if this is an extended expression (second operand selected)
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

    // Call to display on the calculator
    displayExpression(operation, val);
};


// Displays expression on Memory and Output Paragraphs of Calculator
const displayExpression = (operationArray, val) => {
    let i = operationArray.length - 1; 
    if ( i < 1 ) {  
        // Erases default 0
        // Displays first value
        outputA.textContent = operationArray[i];  // First value will always be first index of operation array
        memoryA.textContent = outputA.textContent;

    } else if ( operationArray[i] === '+' || operationArray[i] === '-' || operationArray[i] === 'x' || operationArray[i] === '/' ) {
        // Adds spaces in operation between operators
        outputA.textContent += ' ' + operationArray[i] + ' ';
        memoryA.textContent = outputA.textContent;

    } else {
        // Displays second value
        outputA.textContent += val;  // Second value is displayed via val argument on event click rather than operation array
        memoryA.textContent = outputA.textContent;
    }
};


// This function fires when equals is selected
// The expression is assessed and then passed to an evaluation function (operate)
// Updates output display to evaluation
// Memory remains as the expression
const equalsActivated = () => {

    if ( operation.length === 0 ) {
        // Show nothing if equals is selected without an expression
        return;

    } else if (( operation.length === 1) && 
    ( operation[0] != '+' || operation[0] != '-' || operation[0] != 'x' || operation[0] != '/' )) {
        // First and only button selected is a number value

        outputA.textContent = operation[0];
        
    } else if (( operation.length === 1 ) && 
    ( operation[0] === '+' || operation[0] === '-' || operation[0] === 'x' || operation[0] === '/' )) {
        // Display 0 if only an operand is selected when equals is activated
        outputA.textContent = 0;

    } else if (( operation.length === 2 ) &&
    ( operation[1] === '+' || operation[1] === '-' || operation[1] === 'x' || operation[1] === '/' )) {
        // Expression evaluation
        // Where first button selected is a number value
        // Second button is an operand

        outputA.textContent = operation[0];

    } else if (( operation.length === 2) && 
    ( operation[0] === '+' || operation[0] === '-' || operation[0] === 'x' || operation[0] === '/' )) {
        // Expression evaluation
        // Where first button selected is an operand
        // Second button is a number value

        let a = 0;
        let b = Number(operation[1]);
        let operator = operation[0];

        outputA.textContent = operate(operator, a, b);

    } else {
        // Standard expression to be evaluated
        // Where first button is a number value
        // Second button is an operand
        // Third button is a number value

        let a = Number(operation[0]);
        let b = Number(operation[2]);
        let operator = operation[1];

        outputA.textContent = operate(operator, a, b);
    };

    // Reset array for new operation:
    operation = [];
};


// Second operand selected
// Evaluate first two values
const continuedExpression = () => {

};


// AC button selected
const allClear = () => {
    operation = [];

    outputA.textContent = 0;
    memoryA.textContent = 0;
};


// del button selected
const delButton = () => {

};


// Store first value, operator, and second value:
let operation = [];


// Memory and Output Paragraphs for Calculator 1 (A)
const calc1 = document.getElementById('calc1');
const outputA = document.getElementById('outputA');
const memoryA = document.getElementById('memoryA');