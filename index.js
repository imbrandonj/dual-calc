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
// Assesses the value as a number or operator,
// The order of the value in the operation, 
// Or if this is an extended expression (second operator selected)
const storeVal = (val) => {
 
    // Disable the user from selecting operators sequentially
    if (( val === '+' || val === '-' || val === 'x' || val === '/' || val === '.' ) && 
    ( operation.slice(-1) == '+' || operation.slice(-1) == '-' || operation.slice(-1) == 'x' || operation.slice(-1) == '/'  || operation.slice(-1) == '.')) {
        return;
    };

    // Expression contains a second operator (passed to val parameter)
    // Evaluate first portion of the operation
    if (( operation.length >= 3 ) && (val === '+' || val === '-' || val === 'x' || val === '/' )) {
        continuedExpression();
    };

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
    displayExpression(val);
};


// Second operator selected
// Evaluate the expression
// Update the operation array where the evaluated expression becomes operand value one (index 0)
const continuedExpression = () => {
    operation[0] = operate(operation[1], operation[0], operation[2]);
    operation.splice(1, 2);
};


// Displays expression on Memory and Output Paragraphs of Calculator
const displayExpression = (val) => {

    let i = operation.length - 1; 

    if ( i < 0 ) {
        // Displays 0 if displayExpression is triggered without an adequate expression
        outputA.textContent = 0;
        memoryA.textContent = 0;

    } else if ( i < 1 ) {  
        // Erases default 0
        // Displays first value
        outputA.textContent = operation[i];  // First value will always be first index of operation array
        memoryA.textContent = outputA.textContent;

    } else if ( val === 'del' ) {
        // If val is 'del' passed by pressing the del button,
        // Called from delButton function,
        // Requires adding blocks of the operation (operand -> operator -> operand) if present
        // These operands can be changed from two digit to one digit values
        // Thus, the expression needs to be assessed and displayed in blocks

        // The first display will always be the first index of the operation array
        outputA.textContent = operation[0];
        memoryA.textContent = outputA;

        if ( operation[1] === '+' || operation[1] === '-' || operation[1] === 'x' || operation[1] === '/' ) {
            // Display operators
            outputA.textContent += ' ' + operation[1] + ' ';  // Adds spaces in operation between operators
            memoryA.textContent = outputA.textContent;

            if ( i >= 2 ) {  // i is the operation array length - 1
                // Display operand after operator (if it exists)
                outputA.textContent += operation[i];
                memoryA.textContent = outputA.textContent;
            }

        } else {
            // This triggers if there is not an operator following the first operand
            outputA.textContent += operation[i];
            memoryA.textContent = outputA.textContent;
        };
        // End del button function sequence

    } else if ( operation[i] === '+' || operation[i] === '-' || operation[i] === 'x' || operation[i] === '/' ) {
        // Display operators
        outputA.textContent += ' ' + operation[i] + ' ';  // Adds spaces in operation between operators
        memoryA.textContent = outputA.textContent;

    } else {
        // Displays second value
        outputA.textContent += val;  // Second value is displayed via val argument on event click rather than operation array
        memoryA.textContent = outputA.textContent;
    }
};


// This function is called when the equals button is selected
// The expression is assessed and then passed to an evaluation function (operate)
// Updates output display to evaluation
// Memory display remains as the expression
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
        // Display 0 if only an operator is selected when equals is activated
        outputA.textContent = 0;

    } else if (( operation.length === 2 ) &&
    ( operation[1] === '+' || operation[1] === '-' || operation[1] === 'x' || operation[1] === '/' )) {
        // Expression evaluation
        // Where first button selected is a number value
        // Second button is an operator
        outputA.textContent = operation[0];

    } else if (( operation.length === 2) && 
    ( operation[0] === '+' || operation[0] === '-' || operation[0] === 'x' || operation[0] === '/' )) {
        // Expression evaluation
        // Where first button selected is an operator
        // Second button is a number value

        let a = 0;
        let b = Number(operation[1]);
        let operator = operation[0];

        outputA.textContent = operate(operator, a, b);

    } else {
        // Standard expression to be evaluated
        // Where first button is a number value
        // Second button is an operator
        // Third button is a number value

        let a = Number(operation[0]);
        let b = Number(operation[2]);
        let operator = operation[1];

        outputA.textContent = operate(operator, a, b);
    };

    // Reset array for new operation:
    operation = [];
};


// AC button selected
const allClear = () => {
    operation = [];

    outputA.textContent = 0;
    memoryA.textContent = 0;
};


// del button selected
const delButton = () => {
    if ( operation.slice(-1) > 9 ) {
        // If the value was a two button click event, remove last click
        operation[operation.length - 1] = Math.floor(operation[operation.length - 1] / 10);

    } else {
        operation.splice(-1, 1);
    };

    displayExpression('del');
};


// Store first value, operator, and second value:
let operation = [];


// Memory and Output Paragraphs for Calculator 1 (A)
const calc1 = document.getElementById('calc1');
const outputA = document.getElementById('outputA');
const memoryA = document.getElementById('memoryA');