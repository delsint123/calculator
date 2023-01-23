/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Project: Calculator
Org/Course: The Odin Project
Related files: index.html, style.css, README.md, calculation.txt
Date Started: July 29, 2022
Recent Update: January 23, 2023
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/

//initializing and declarations------------------------------------------------
const container = document.querySelector('.container');
const display = document.querySelector('.display');
const buttons = document.querySelectorAll('button');

let displayValue = "0";
let currOperation = "";
let expressionValues = [];

let numbers = new Set("1234567890");
let operators = new Set("+-*/");

//function calls --------------------------------------------------------------
populateDisplay();


//functions -------------------------------------------------------------------

//operations
function add(expressionValues) {
    //must be numbers because of string concatenation as default
    expressionValues.push(parseFloat(expressionValues.pop()) + parseFloat(expressionValues.pop()));
    display.textContent = expressionValues[0];
};

function subtract(expressionValues) {
    let temp = expressionValues.pop();
    expressionValues.push(expressionValues.pop() - temp);
    display.textContent = expressionValues[0];
};

function multiply(expressionValues) {
    expressionValues.push(expressionValues.pop() * expressionValues.pop());
    display.textContent = expressionValues[0];
};

function divide(expressionValues) {
    let temp = expressionValues.pop();
    expressionValues.push(roundDecimals(expressionValues.pop() / temp));
    display.textContent = expressionValues[0];
};

function roundDecimals(result) {
    if(Math.floor(result) === result) return result;
    return parseFloat(result.toFixed(6)); 
};


//decipher which operation to do
function operate(expressionValues) {
    if(currOperation == '+') {
        add(expressionValues);
    }
    else if(currOperation == '-') {
        subtract(expressionValues);
    }
    else if(currOperation == '*') {
        multiply(expressionValues);
    }
    else if(currOperation == '/') {
        divide(expressionValues);
    }
};


function populateDisplay() {
    let idx = 0;

    buttons.forEach(button => button.addEventListener('click', button => {

        let temp = button.composedPath()[0].id;

        if(temp === "clear") {
            clear();
        }
        //add number to stack
        else if(numbers.has(temp)) {
            getValues(temp);
        }
        //set operation
        else if(operators.has(temp)){
            currOperation = temp;
            setOperation();

            idx++;
        }
        //complete operation
        else {
            operate(expressionValues);
            idx = 0;
        }
    }))

    //function definitions for above calls
    const clear = () => {
        currOperation = "";
        expressionValues = [];
        displayValue = "ENTER A VALUE";
        idx = 0;

        display.textContent = displayValue;
    }

    const getValues = (temp) => {
        if(expressionValues.length > idx) {
            expressionValues[idx] += temp;
        }
        else {
            expressionValues.push(temp);
        }

        //handles leading zeroes;
        if(expressionValues[idx][0] === '0') {
            processNum();
        }

        displayValue = expressionValues[idx];
        display.textContent = displayValue;
    }

}

//highlights the current operation
function setOperation() {

}

//handles leading zeros
function processNum() {

}
