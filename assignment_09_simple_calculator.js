// =============================================================================
// PROGRAMMING FUNDAMENTALS — Assignment 9
// =============================================================================
//
// TASK: Console-Based Simple Calculator
//
// Build a calculator program that runs in the console and performs basic
// arithmetic operations based on the user's input.
//
// -----------------------------------------------------------------------------
// HOW TO RUN THIS PROGRAM
// -----------------------------------------------------------------------------
// 1. Install the input library (only once):  npm install readline-sync
// 2. Run the program:                        node assignment_09_simple_calculator.js
//
// -----------------------------------------------------------------------------
// OPERATIONS YOUR CALCULATOR MUST SUPPORT
// -----------------------------------------------------------------------------
//
//   1. Addition          ( + )    e.g.  10 + 3  =  13
//   2. Subtraction       ( - )    e.g.  10 - 3  =  7
//   3. Multiplication    ( * )    e.g.  10 * 3  =  30
//   4. Division          ( / )    e.g.  10 / 3  =  3.33
//   5. Modulus           ( % )    e.g.  10 % 3  =  1  (remainder)
//   6. Exponentiation    ( ** )   e.g.  2 ** 8  =  256
//   7. Quit
//
// -----------------------------------------------------------------------------
// HOW THE MENU SHOULD LOOK
// -----------------------------------------------------------------------------
//
//   ============================
//        SIMPLE CALCULATOR
//   ============================
//   1. Addition
//   2. Subtraction
//   3. Multiplication
//   4. Division
//   5. Modulus
//   6. Exponentiation
//   7. Quit
//   Select an operation (1-7):
//
// -----------------------------------------------------------------------------
// EXPECTED INTERACTION EXAMPLE
// -----------------------------------------------------------------------------
//
//   Select an operation (1-7): 4
//   Enter first number : 10
//   Enter second number: 3
//   Result: 10 / 3 = 3.33
//
//   Select an operation (1-7): 4
//   Enter first number : 5
//   Enter second number: 0
//   Error: Cannot divide by zero.
//
//   Select an operation (1-7): 7
//   Goodbye!
//
// -----------------------------------------------------------------------------
// REQUIREMENTS
// -----------------------------------------------------------------------------
// - Each arithmetic operation MUST be written as its own function.
// - Use a loop so the calculator keeps running until the user selects Quit.
// - Division by zero must be caught and handled with a clear error message
//   (do NOT let the program crash).
// - Display results to 2 decimal places using .toFixed(2).
// - Handle invalid menu choices gracefully.
//

//
// =============================================================================
// YOUR CODE BELOW — remove the // symbols from the scaffold and fill it in
// =============================================================================


const readlineSync = require('readline-sync');


function displayMenu() {
    console.log('\n' + '='.repeat(28));
    console.log('     SIMPLE CALCULATOR');
    console.log('='.repeat(28));
    console.log('1. Addition');
    console.log('2. Subtraction');
    console.log('3. Multiplication');
    console.log('4. Division');
    console.log('5. Modulus');
    console.log('6. Exponentiation');
    console.log('7. Quit');
    console.log('='.repeat(28));
}


function getNumbers() {
    const num1 = readlineSync.questionFloat('Enter first number: ');
    const num2 = readlineSync.questionFloat('Enter second number: ');
    return { num1, num2 };
}


function displayResult(num1, num2, operator, result) {
    if (result === undefined || result === null || isNaN(result)) {
        console.log('Error: Invalid result.');
        return;
    }
    console.log(`Result: ${num1} ${operator} ${num2} = ${result.toFixed(2)}`);
}


function addition() {
    const { num1, num2 } = getNumbers();
    const result = num1 + num2;
    displayResult(num1, num2, '+', result);
}


function subtraction() {
    const { num1, num2 } = getNumbers();
    const result = num1 - num2;
    displayResult(num1, num2, '-', result);
}


function multiplication() {
    const { num1, num2 } = getNumbers();
    const result = num1 * num2;
    displayResult(num1, num2, '*', result);
}


function division() {
    const { num1, num2 } = getNumbers();
    
    if (num2 === 0) {
        console.log('Error: Cannot divide by zero.');
        return;
    }
    
    const result = num1 / num2;
    displayResult(num1, num2, '/', result);
}


function modulus() {
    const { num1, num2 } = getNumbers();
    
    if (num2 === 0) {
        console.log('Error: Cannot perform modulus with zero.');
        return;
    }
    
    const result = num1 % num2;
    displayResult(num1, num2, '%', result);
}


function exponentiation() {
    const { num1, num2 } = getNumbers();
    const result = Math.pow(num1, num2);
    displayResult(num1, num2, '**', result);
}


function quit() {
    console.log('\nGoodbye! 👋');
    process.exit(0);
}


function main() {
    console.log('WELCOME TO THE SIMPLE CALCULATOR');
    console.log('='.repeat(32));
    
    const operations = {
        '1': { name: 'Addition', func: addition },
        '2': { name: 'Subtraction', func: subtraction },
        '3': { name: 'Multiplication', func: multiplication },
        '4': { name: 'Division', func: division },
        '5': { name: 'Modulus', func: modulus },
        '6': { name: 'Exponentiation', func: exponentiation },
        '7': { name: 'Quit', func: quit }
    };
    
    while (true) {
        displayMenu();
        
        const choice = readlineSync.question('Select an operation (1-7): ');
        
        if (!operations[choice]) {
            console.log('Error: Invalid choice. Please select a number between 1 and 7.');
            continue;
        }
        
        const operation = operations[choice];
        
        if (choice === '7') {
            operation.func();
        } else {
            console.log(`\n--- ${operation.name} ---`);
            operation.func();
        }
    }
}

main();