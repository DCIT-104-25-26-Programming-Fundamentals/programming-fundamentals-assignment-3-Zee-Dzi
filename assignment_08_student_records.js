// =============================================================================
// PROGRAMMING FUNDAMENTALS — Assignment 8
// =============================================================================
//
// TASK: Student Record Management System
//
// Build a console-based program that stores and manages student information.
// Each student is represented as a JavaScript object containing:
//
//   - name   : the student's full name  (string)
//   - id     : a unique student ID number (number, e.g. 20240001)
//   - scores : an array of scores from multiple assessments (e.g. [75, 88, 90])
//
// Example object:
//   { name: "Alice Mensah", id: 20240001, scores: [78, 85, 90] }
//
// -----------------------------------------------------------------------------
// HOW TO RUN THIS PROGRAM
// -----------------------------------------------------------------------------
// 1. Install the input library (only once):  npm install readline-sync
// 2. Run the program:                        node assignment_08_student_records.js
//
// -----------------------------------------------------------------------------
// FEATURES YOUR PROGRAM MUST SUPPORT
// -----------------------------------------------------------------------------
//
//   1. Add a Student
//      - Ask the user to enter the student's name and ID.
//      - Ask how many scores to enter, then collect each score one by one.
//      - Save the student object and confirm it was added.
//
//   2. Display All Students
//      - Print a formatted table showing every student's:
//          Name, ID, individual scores, and their average score.
//      - If no students have been added yet, print a message saying so.
//
//   3. Calculate Average Score for a Specific Student
//      - Ask the user to enter a student ID.
//      - Find the student and print their average score.
//      - If the ID is not found, print an error message.
//
//   4. Quit
//
// -----------------------------------------------------------------------------
// HOW THE MENU SHOULD LOOK
// -----------------------------------------------------------------------------
//
//   ================================
//      STUDENT RECORD SYSTEM MENU
//   ================================
//   1. Add student
//   2. Display all students
//   3. Calculate average score
//   4. Quit
//   Enter your choice (1-4):
//
// -----------------------------------------------------------------------------
// EXPECTED INTERACTION EXAMPLE
// -----------------------------------------------------------------------------
//
//   Enter your choice (1-4): 1
//   Student name: Alice Mensah
//   Student ID: 20240001
//   How many scores? 3
//   Enter score 1: 78
//   Enter score 2: 85
//   Enter score 3: 90
//   Student "Alice Mensah" added successfully.
//
//   Enter your choice (1-4): 3
//   Enter student ID: 20240001
//   Alice Mensah's average score: 84.33
//
// -----------------------------------------------------------------------------
// REQUIREMENTS
// -----------------------------------------------------------------------------
// - Store all student records in an array of objects.
// - Average scores must be displayed to 2 decimal places (use .toFixed(2)).
// - Each feature MUST be in its own function (see scaffold below).
// - Handle invalid menu choices and missing student IDs gracefully.
//

// =============================================================================
// YOUR CODE BELOW — remove the // symbols from the scaffold and fill it in
// =============================================================================


const readlineSync = require('readline-sync');

let students = [];


function displayMenu() {
    console.log('\n' + '='.repeat(32));
    console.log('   STUDENT RECORD SYSTEM MENU');
    console.log('='.repeat(32));
    console.log('1. Add student');
    console.log('2. Display all students');
    console.log('3. Calculate average score');
    console.log('4. Quit');
    console.log('='.repeat(32));
}


function addStudent() {
    console.log('\n--- Add New Student ---');
    
    const name = readlineSync.question('Student name: ');
    if (name.trim() === '') {
        console.log('Error: Student name cannot be empty.');
        return;
    }
    
    const id = readlineSync.questionInt('Student ID: ');
    if (isNaN(id) || id <= 0) {
        console.log('Error: Invalid student ID. Please enter a positive number.');
        return;
    }
    
    const existingStudent = students.find(s => s.id === id);
    if (existingStudent) {
        console.log(`Error: Student with ID ${id} already exists.`);
        return;
    }
    
    const numScores = readlineSync.questionInt('How many scores? ');
    if (isNaN(numScores) || numScores <= 0) {
        console.log('Error: Number of scores must be a positive integer.');
        return;
    }
    
    const scores = [];
    for (let i = 1; i <= numScores; i++) {
        const score = readlineSync.questionFloat(`Enter score ${i}: `);
        if (isNaN(score) || score < 0 || score > 100) {
            console.log('Error: Score must be between 0 and 100.');
            return;
        }
        scores.push(score);
    }
    
    const student = {
        name: name.trim(),
        id: id,
        scores: scores
    };
    
    students.push(student);
    console.log(`Student "${student.name}" added successfully.`);
}


function calculateAverage(scores) {
    if (scores.length === 0) return 0;
    const sum = scores.reduce((total, score) => total + score, 0);
    return sum / scores.length;
}


function displayAllStudents() {
    if (students.length === 0) {
        console.log('\nNo students have been added to the system yet. 📚');
        return;
    }
    
    console.log('\n' + '='.repeat(80));
    console.log('STUDENT RECORDS');
    console.log('='.repeat(80));
    
    for (let i = 0; i < students.length; i++) {
        const student = students[i];
        const avg = calculateAverage(student.scores);
        
        console.log(`\nStudent #${i + 1}:`);
        console.log(`  Name:    ${student.name}`);
        console.log(`  ID:      ${student.id}`);
        console.log(`  Scores:  ${student.scores.join(', ')}`);
        console.log(`  Average: ${avg.toFixed(2)}`);
        console.log('-'.repeat(40));
    }
}


function findStudentById(id) {
    return students.find(student => student.id === id) || null;
}


function calculateStudentAverage() {
    if (students.length === 0) {
        console.log('\nNo students in the system. Please add a student first.');
        return;
    }
    
    console.log('\n--- Calculate Average Score ---');
    const id = readlineSync.questionInt('Enter student ID: ');
    
    if (isNaN(id) || id <= 0) {
        console.log('Error: Invalid student ID. Please enter a positive number.');
        return;
    }
    
    const student = findStudentById(id);
    
    if (!student) {
        console.log(`Error: Student with ID ${id} not found.`);
        return;
    }
    
    const avg = calculateAverage(student.scores);
    console.log(`${student.name}'s average score: ${avg.toFixed(2)}`);
}


function quit() {
    console.log('\nGoodbye! 👋');
    process.exit(0);
}


function main() {
    console.log('WELCOME TO THE STUDENT RECORD MANAGEMENT SYSTEM');
    console.log('='.repeat(52));
    
    while (true) {
        displayMenu();
        
        const choice = readlineSync.question('Enter your choice (1-4): ');
        
        switch (choice) {
            case '1':
                addStudent();
                break;
            case '2':
                displayAllStudents();
                break;
            case '3':
                calculateStudentAverage();
                break;
            case '4':
                quit();
                break;
            default:
                console.log('Invalid choice. Please enter a number between 1 and 4.');
                break;
        }
    }
}

main();