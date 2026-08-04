// =============================================================================
// PROGRAMMING FUNDAMENTALS — Assignment 4
// =============================================================================
//
// TASK: Matrix Operations
//
// Write a JavaScript program that performs three operations on matrices
// (2D arrays), each implemented in its own function.
//
// In JavaScript, a matrix is represented as an array of arrays:
//   let matrix = [[1, 2, 3], [4, 5, 6]];   // 2 rows, 3 columns
//
// -----------------------------------------------------------------------------
// HOW TO RUN THIS PROGRAM
// -----------------------------------------------------------------------------
// 1. Install the input library (only once):  npm install readline-sync
// 2. Run the program:                        node assignment_04_matrix_operations.js
//
// -----------------------------------------------------------------------------
// PART A — Transpose a Matrix
// -----------------------------------------------------------------------------
// - Read an M x N matrix from the user.
// - Compute and display its transpose (rows become columns, columns become rows).
//
// Example (2 x 3 input):
//
//   Original Matrix:      Transposed Matrix:
//   1  2  3               1  4
//   4  5  6               2  5
//                         3  6
//
// -----------------------------------------------------------------------------
// PART B — Add Two Matrices
// -----------------------------------------------------------------------------
// - Read two matrices of exactly the same size (M x N).
// - Compute their element-wise sum and display the result.
//
// -----------------------------------------------------------------------------
// PART C — Multiply Two Matrices
// -----------------------------------------------------------------------------
// - Read matrix A of size M x N and matrix B of size N x P.
//   (Number of COLUMNS in A must equal number of ROWS in B.)
// - Compute and display the matrix product A x B (result is M x P).
//
// -----------------------------------------------------------------------------
// EXPECTED INPUT FORMAT
// -----------------------------------------------------------------------------
// When entering a row, the user types all values on one line separated by spaces:
//
//   Enter number of rows: 2
//   Enter number of columns: 3
//   Enter row 1: 1 2 3
//   Enter row 2: 4 5 6
//
// Hint: Use row.split(' ').map(Number) to convert a line of text into an array
// of numbers.
//
// -----------------------------------------------------------------------------
// REQUIREMENTS
// -----------------------------------------------------------------------------
// - Use nested loops for all operations (no external libraries).
// - Each operation must be in its own function (see scaffold below).
// - Display each matrix in a neat, aligned grid format.
// - Tip: Complete Part A first, then Parts B and C.
//

// =============================================================================
// YOUR CODE BELOW — remove the // symbols from the scaffold and fill it in
// =============================================================================

const readlineSync = require('readline-sync');


function readMatrix(name) {
    const rows = readlineSync.questionInt(`Enter number of rows for ${name}: `);
    const cols = readlineSync.questionInt(`Enter number of columns for ${name}: `);
    
    const matrix = [];
    console.log(`Enter ${name} matrix:`);
    
    for (let i = 0; i < rows; i++) {
        const rowInput = readlineSync.question(`Enter row ${i + 1}: `);
        const row = rowInput.split(' ').map(Number);
        
        if (row.length !== cols) {
            console.log(`Error: Row ${i + 1} must have exactly ${cols} numbers.`);
            return null;
        }
        
        matrix.push(row);
    }
    
    return matrix;
}


function displayMatrix(matrix, label) {
    console.log(`\n${label}:`);
    if (!matrix || matrix.length === 0) {
        console.log('  (empty matrix)');
        return;
    }
    
    let maxWidth = 0;
    for (let i = 0; i < matrix.length; i++) {
        for (let j = 0; j < matrix[i].length; j++) {
            const width = String(matrix[i][j]).length;
            if (width > maxWidth) maxWidth = width;
        }
    }
    
    for (let i = 0; i < matrix.length; i++) {
        let rowStr = '';
        for (let j = 0; j < matrix[i].length; j++) {
            rowStr += String(matrix[i][j]).padStart(maxWidth + 2);
        }
        console.log(rowStr);
    }
}


function transposeMatrix(matrix) {
    if (!matrix || matrix.length === 0) return [];
    
    const rows = matrix.length;
    const cols = matrix[0].length;
    const transposed = [];
    
    for (let i = 0; i < cols; i++) {
        transposed.push([]);
        for (let j = 0; j < rows; j++) {
            transposed[i].push(matrix[j][i]);
        }
    }
    
    return transposed;
}


function runTranspose() {
    console.log('\n=== PART A: Transpose a Matrix ===');
    const matrix = readMatrix('Matrix');
    if (!matrix) return;
    
    displayMatrix(matrix, 'Original Matrix');
    const transposed = transposeMatrix(matrix);
    displayMatrix(transposed, 'Transposed Matrix');
}


function addMatrices(matrixA, matrixB) {
    if (!matrixA || !matrixB || matrixA.length === 0 || matrixB.length === 0) {
        return null;
    }
    
    const rows = matrixA.length;
    const cols = matrixA[0].length;
    const result = [];
    
    for (let i = 0; i < rows; i++) {
        result.push([]);
        for (let j = 0; j < cols; j++) {
            result[i].push(matrixA[i][j] + matrixB[i][j]);
        }
    }
    
    return result;
}


function runAddition() {
    console.log('\n=== PART B: Add Two Matrices ===');
    console.log('Both matrices must have the same dimensions.\n');
    
    const matrixA = readMatrix('Matrix A');
    if (!matrixA) return;
    
    const matrixB = readMatrix('Matrix B');
    if (!matrixB) return;
    
    if (matrixA.length !== matrixB.length || matrixA[0].length !== matrixB[0].length) {
        console.log('Error: Matrices must have the same dimensions for addition.');
        return;
    }
    
    displayMatrix(matrixA, 'Matrix A');
    displayMatrix(matrixB, 'Matrix B');
    
    const result = addMatrices(matrixA, matrixB);
    displayMatrix(result, 'Sum (A + B)');
}


function multiplyMatrices(matrixA, matrixB) {
    if (!matrixA || !matrixB || matrixA.length === 0 || matrixB.length === 0) {
        return null;
    }
    
    const m = matrixA.length;
    const n = matrixA[0].length;
    const p = matrixB[0].length;
    
    const result = [];
    
    for (let i = 0; i < m; i++) {
        result.push([]);
        for (let j = 0; j < p; j++) {
            let sum = 0;
            for (let k = 0; k < n; k++) {
                sum += matrixA[i][k] * matrixB[k][j];
            }
            result[i].push(sum);
        }
    }
    
    return result;
}


function runMultiplication() {
    console.log('\n=== PART C: Multiply Two Matrices ===');
    console.log('Number of columns in Matrix A must equal number of rows in Matrix B.\n');
    
    const matrixA = readMatrix('Matrix A');
    if (!matrixA) return;
    
    const matrixB = readMatrix('Matrix B');
    if (!matrixB) return;
    
    if (matrixA[0].length !== matrixB.length) {
        console.log('Error: Number of columns in Matrix A must equal number of rows in Matrix B.');
        return;
    }
    
    displayMatrix(matrixA, 'Matrix A');
    displayMatrix(matrixB, 'Matrix B');
    
    const result = multiplyMatrices(matrixA, matrixB);
    displayMatrix(result, 'Product (A × B)');
}


function main() {
    console.log('MATRIX OPERATIONS PROGRAM');
    console.log('=========================');
    
    runTranspose();
    
    runAddition();
    
    runMultiplication();
    
    console.log('\nProgram completed.');
}

main();