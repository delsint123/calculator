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

//let displayValue = "0";
let currOperation = "";
let expressionValues = [];

let numbers = new Set("1234567890.");
let operators = new Set("+-*/");

class mainCalc {
    constructor(displayValue = "0", currOperation = "", expressionValues = []){
        this.displayValue = displayValue;
        this.currOperation = currOperation;
        this.expressionValues = expressionValues;
    }
    setDisplayValue(displayValue){
        let tempArr = displayValue.split('');
        const inRange = (currVal) => numbers.has(currVal);
        
        if(tempArr.every(inRange)) {
            this.displayValue = displayValue;
        }
        else {
            throw new Error(`${displayValue} is not a number`);
        }
        
    }
    getDisplayValue(){
        return this.displayValue;
    }
}

// let mainCalc = function(){
    // var displayValue = "0";
    // var currOperation = "";
    // var expressionValues = [];

    //setters
    // var settersAndGetters = {
        //setters
        // setDisplayValue: function(displayVal){
        //     if(!numbers.has(displayVal)) {
        //         throw new Error(`${displayVal} is not a number`);
        //     }
        //     displayValue = displayVal;
        // },
        // function setCurrOperation(operation){
        //     if(!operators.has(operation)) {
        //         throw new Error(`${operation} is not a valid operator`);
        //     }
        //     currOperation = operation;
        // }
        // function setExpressionValues(values){
        //     if(values.every((currVal) => {numbers.has(currVal);})) {
        //         expressionValues = values;
        //     }
        //     else {
        //         throw new Error(`${values} are not valid`)
        //     }
        // }

        //getters
        // getDisplayValue: function(){
        //     return displayValue;
        // }
        // function getCurrOperation(){
        //     return currOperation;
        // }
        // function getExpressionValues(){
        //     return expressionValues;
        // }
//     }
    
//     return settersAndGetters;
// }

//function calls --------------------------------------------------------------
let Calc = new mainCalc();
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
    expressionValues.push(roundDecimals(expressionValues.pop() - temp));
    display.textContent = expressionValues[0];
};

function multiply(expressionValues) {
    let curr = roundDecimals(expressionValues.pop() * expressionValues.pop())
    expressionValues.push(curr);
    display.textContent = expressionValues[0];
};

function divide(expressionValues) {
    let temp = expressionValues.pop();
    expressionValues.push(roundDecimals(expressionValues.pop() / temp));

    //handles division by 0
    if(expressionValues[0] === Infinity) {
        display.textContent = "Stop That!"
        expressionValues[0] = 0;
    }
    else {
        display.textContent = expressionValues[0];
    }
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

    currOperation = "";
    //clear highlighted operations
    clearButtons();
};


function populateDisplay() {
    let idx = 0;

    buttons.forEach(button => button.addEventListener('click', button => {

        let temp = button.composedPath()[0].id;

        if(temp === "clear") {
            clearDisplay();
        }
        //backspace number 
        else if(temp === "backspace") {
            backspace();
        }
        //add number to stack
        else if(numbers.has(temp)) {
            getValues(temp); 
        }
        //set operation
        else if(operators.has(temp) && currOperation.length === 0 && expressionValues.length >= 1){
            //check if need to be operated since only 2 numbers can be evaluated at once
            if(expressionValues.length >= 2) {
                operate(expressionValues);
                idx = 0;
            }
            
            currOperation = temp;
            highlight();

            idx++;
        }
        //complete operation
        else {
            if(expressionValues.length >= 2) {
                operate(expressionValues);
                idx = 0;
            }
        }
    }))

    //function definitions for above calls
    const clearDisplay = () => {
        currOperation = "";
        expressionValues = [];
        Calc.setDisplayValue("0");
        idx = 0;
        clearButtons();

        display.textContent = Calc.getDisplayValue();
    }

    //functions as a backspace
    const backspace = () => {
        if(expressionValues[idx].length > 0) {
            expressionValues[idx] = expressionValues[idx].slice(0, expressionValues[idx].length - 1);

            //if last value is a decimal
            if(expressionValues.length > 0 && expressionValues[idx].at(-1) === '.') {
                expressionValues[idx] = expressionValues[idx].slice(0, expressionValues[idx].length - 1);
            }
            //if there is no values
            if(expressionValues[idx].length === 0) {
                expressionValues[idx] = '0';
            }

            display.textContent = expressionValues[idx];
        }

    }

    //stores the input values
    const getValues = (temp) => {
        if(expressionValues.length > idx) {

            //only do this if it is an integer or there is no decimals in the value
            if(!(temp === '.' && expressionValues[idx] && expressionValues[idx].includes('.'))) {
                expressionValues[idx] += temp;
            }
        }
        else {
            //if decimal is the first button clicked
            if(temp === '.') {
                expressionValues.push('0.');
            }
            else {
                expressionValues.push(temp); 
            }
        }

        //handles leading zeroes;
        processZeroes(idx);

        console.log(Calc.getDisplayValue());

        Calc.setDisplayValue(expressionValues[idx]);
        display.textContent = Calc.getDisplayValue();
    }

}

//highlights the current operation
function highlight() {
    let currButton = document.getElementById(`${currOperation}`);
    currButton.style.cssText = 'background-color: rgb(0, 187, 187); color:rgb(226, 226, 226)';
}

//clears operation highlight after calculation is complete
function clearButtons() {
    let ops = Array.from(operators);

    for(let i = 0; i < ops.length; i++) {
        let currButton = document.getElementById(`${ops[i]}`);

        if(currButton.hasAttribute('style')) {
            currButton.removeAttribute('style');
        }
    }    
}

//handles leading zeros
function processZeroes(idx) {
    if(expressionValues[idx][0] === '0' && expressionValues[idx][1] !== '.') {
        if(expressionValues[idx].length > 1) {
            let val = "";

            let i = 0;
            while(expressionValues[idx][i] === '0') {
                i++;
            }

            for(; i < expressionValues[idx].length; i++) {
                val += expressionValues[idx][i];
            }

            expressionValues[idx] = val;
        }
    }
}
