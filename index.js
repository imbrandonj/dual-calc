// This JavaScript file handles the functions of a calculator
// Where a button onclick event is selected from the html
// The phrase "first button selected", "second button selected", "third button", etc.
// Indicates the ordering of which button is clicked on the calculator


// Math Operators
const add = (a, b) => Math.round((a + b) * 1000000) / 1000000;  // decimal precision set to 6

const subtract = (a, b) => Math.round((a - b) * 1000000) / 1000000;

const multiply = (a, b) => Math.round((a * b) * 1000000) / 1000000;

const divide = (a, b) => Math.round((a / b) * 1000000) / 1000000;

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
// & the order of the value in the operation, 
// Or if this is an extended expression (second operator selected)
const storeVal = (val) => {
 
    // Disable the user from selecting operators sequentially
    if (( val === '+' || val === 'x' || val === '/' || val === '.' ) 
    && ( operation.slice(-1) == '+' || operation.slice(-1) == '-' || operation.slice(-1) == 'x' || operation.slice(-1) == '/'  || operation.slice(-1) == '.' )) {
        return;
    };

    // Expression contains a second operator (passed to val parameter)
    // Evaluate first portion of the operation
    if (( operation.length >= 3 ) && ( val === '+' || val === 'x' || val === '/' )) {
        continuedExpression();
    };

    // Store initial value:
    if ( operation.length < 1 ) {
        operation.push(val);
    
    // Value can only be 7 digits long
    } else if (( val != '+' && val != '-' && val != 'x' && val != '/' ) 
    && ( operation[operation.length - 1].length > 6 ))  {
        return;

    // Store a two digit value of a two click event
    } else if ( ( val != '+' && val != '-' && val != 'x' && val != '/' ) && 
    ( operation.slice(-1) != '+' && operation.slice(-1) != '-' && operation.slice(-1) != 'x' && operation.slice(-1) != '/') ) {
        operation[operation.length - 1] += val;
    
    // Decipher between a subtraction operator or negative number
    } else if ( operation.slice(-1) == '-' ) {

        // First value is a negative number
        if ( operation.length == 1 )  {
            
            // First value cannot be a double negative
            if ( val == '-' ) {
                return;

            } else {
                operation[operation.length - 1] = '-' + val;
            };

        // Disable triple negatives (or above)
        } else if (( operation[operation.length - 2] == '-') && ( val == '-' )) {
            return;
        
        // Subtraction operation
        } else if (( val != '+' && val != '-' && val != 'x' && val != '/' )
        && ( operation[operation.length - 2] != '+' && operation[operation.length - 2] != '-' && operation[operation.length - 2] != 'x' && operation[operation.length - 2] != '/' )) {
            operation.push(val);
        
        // Second value is a negative number
        } else {
            if (val == '-') {
                operation.push(val);
            } else {
                operation[operation.length - 1] += val;
            }
        };

        // Expression contains a second operator
        // Evaluate first portion of the operation
        if ( operation.length > 3 ) 
           continuedExpression();

        // End negative number or subtraction operator cascade

    // Store a standard second value
    } else {
        operation.push(val);
    };

    // Call to display on the calculator
    displayExpression(val);
};


// Second operator selected
// Evaluate the expression
// Update the operation array where the evaluated expression becomes operand value one (index 0)
const continuedExpression = () => {
    operation[0] = operate(operation[1], Number(operation[0]), Number(operation[2]));
    operation.splice(1, 2);
};


// Displays expression on Memory and Output Paragraphs of Calculator
const displayExpression = (val) => {

    let i = operation.length - 1; 

    // Display 0 if displayExpression is triggered without an adequate expression
    if ( i < 0 ) {
        outputA.textContent = 0;
        memoryA.textContent = 0;

    // Erase default 0
    // Display first value
    } else if ( i < 1 ) {  
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

        // Display operators
        if ( operation[1] === '+' || operation[1] === '-' || operation[1] === 'x' || operation[1] === '/' ) {
            outputA.textContent += ' ' + operation[1] + ' ';  // Adds spaces in operation between operators
            memoryA.textContent = outputA.textContent;

            // Display operand after operator (if it exists)
            if ( i >= 2 ) {  // i is the operation array length - 1
                outputA.textContent += operation[i];
                memoryA.textContent = outputA.textContent;
            }

        } else {
            // If there is not an operator following the first operand,
            // Display single value
            outputA.textContent += operation[i];
            memoryA.textContent = outputA.textContent;
        };
        // End del button function sequence


    // Display operators
    } else if ( operation[i] === '+' || operation[i] === '-' || operation[i] === 'x' || operation[i] === '/' ) {
        outputA.textContent += ' ' + operation[i] + ' ';  // Adds spaces in operation between operators
        memoryA.textContent = outputA.textContent;

    // Display second value
    } else {
        outputA.textContent += val;  // Second value is displayed via val argument on event click rather than operation array
        memoryA.textContent = outputA.textContent;
    }
};


// This function is called when the equals button is selected
// The expression is assessed and then passed to an evaluation function (operate)
// Updates output display to evaluation
// Memory display remains as the expression
const equalsActivated = () => {

    // Show nothing if equals is selected without an expression
    if ( operation.length === 0 ) {
        return;

    // First and only button selected is a number value
    } else if (( operation.length === 1) 
    && ( operation[0] != '+' && operation[0] != '-' && operation[0] != 'x' && operation[0] != '/' )) {
        outputA.textContent = operation[0];
        
    // Display 0 if only an operator is selected when equals is activated
    } else if (( operation.length === 1 ) 
    && ( operation[0] == '+' || operation[0] == '-' || operation[0] == 'x' || operation[0] == '/' )) {
        outputA.textContent = 0;

    // Expression evaluation
    // Where first button selected is a number value
    // Second button is an operator
    } else if (( operation.length === 2 ) 
    && ( operation[1] === '+' || operation[1] === '-' || operation[1] === 'x' || operation[1] === '/' )) {
        outputA.textContent = operation[0];

    // Expression evaluation
    // Where first button selected is an operator
    // Second button is a number value
    } else if (( operation.length === 2) 
    && ( operation[0] === '+' || operation[0] === '-' || operation[0] === 'x' || operation[0] === '/' )) {

        let a = 0;
        let b = Number(operation[1]);
        let operator = operation[0];

        outputA.textContent = operate(operator, a, b);

    } else if (( operation.length === 3)
    && ( operation.slice(-1) == '-' )) {
        outputA.textContent = operation[0];
        
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

    // If the value was a two button click event, remove last click
    if ( operation.slice(-1) > 9 ) {
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