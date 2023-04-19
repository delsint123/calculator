/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Project: Calculator
Org/Course: The Odin Project
Related files: index.html, style.css, README.md, calculation.txt
Date Started: July 29, 2022
Recent Update: January 23, 2023
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/

//initializing and declarations------------------------------------------------
const display = document.querySelector('.display');
const buttons = document.querySelectorAll('button');

let numbers = new Set("1234567890.");
let operators = new Set("+-*/");

class mainCalc {
    constructor(displayValue = "0", currOperation = "", expressionValues = []){
        this.displayValue = displayValue;
        this.currOperation = currOperation;
        this.expressionValues = expressionValues;
    }

    //setters
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

    setCurrOperation(operation){
        if(!operators.has(operation) && operation.length > 0) {
            throw new Error(`${operation} is not a valid operator`);
        }
        this.currOperation = operation;
    }

    setExpressionValues(values){
        const inRange = (currVal) => {
            numbers.has(currVal);
        }
        const strProcessing = (curr) => {
            let temp = Array.from(curr);
            let res = true;

            temp.forEach((val) => {
                res && inRange(val);
            })

            return res
        };

        if(values.every(strProcessing)) {
            this.expressionValues = values;
        }
        else {
            throw new Error(`${values} are not valid`)
        }
    }

    //getters
    getDisplayValue(){
        return this.displayValue;
    }

    getCurrOperation(){
        return this.currOperation;
    }

    getExpressionValues(){
        return this.expressionValues;
    }
}

//function calls --------------------------------------------------------------
let Calc = new mainCalc();
populateDisplay();


//functions -------------------------------------------------------------------

//operations
function add() {
    //must be numbers because of string concatenation as default
    let tempArr = Calc.getExpressionValues();
    tempArr.push(roundDecimals(parseFloat(tempArr.pop()) + parseFloat(tempArr.pop())));

    Calc.setExpressionValues(tempArr);
    display.textContent = (Calc.getExpressionValues())[0];
};

function subtract() {
    let tempArr = Calc.getExpressionValues();
    let tempVal = tempArr.pop();
    tempArr.push(roundDecimals(tempArr.pop() - tempVal));

    Calc.setExpressionValues(tempArr);
    display.textContent = (Calc.getExpressionValues())[0];
};

function multiply() {
    let tempArr = Calc.getExpressionValues();
    let curr = roundDecimals(tempArr.pop() * tempArr.pop())
    tempArr.push(curr);

    Calc.setExpressionValues(tempArr);
    display.textContent = (Calc.getExpressionValues())[0];
};

function divide() {
    let tempArr = Calc.getExpressionValues();
    let temp = tempArr.pop();
    tempArr.push(roundDecimals(tempArr.pop() / temp));

    //handles division by 0
    if((Calc.getExpressionValues())[0] === Infinity) {
        display.textContent = "Stop That!"
        Calc.setExpressionValues([0]);
    }
    else {
        Calc.setExpressionValues(tempArr);
        display.textContent = (Calc.getExpressionValues())[0];
    }
};

function roundDecimals(result) {
    if(Math.floor(result) === result) return result;
    return parseFloat(result.toFixed(6)); 
};


//decipher which operation to do
function operate() {
    let currOperator = Calc.getCurrOperation();

    if(currOperator == '+') {
        add();
    }
    else if(currOperator == '-') {
        subtract();
    }
    else if(currOperator == '*') {
        multiply();
    }
    else if(currOperator == '/') {
        divide();
    }

    Calc.setCurrOperation("");
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
        else if(operators.has(temp) && Calc.getCurrOperation().length === 0 && Calc.getExpressionValues().length >= 1){
            //check if need to be operated since only 2 numbers can be evaluated at once
            if(Calc.getExpressionValues().length >= 2) {
                operate();
                idx = 0;
            }
            
            Calc.setCurrOperation(temp);
            highlight();

            idx++;
        }
        //complete operation
        else {
            if(Calc.getExpressionValues().length >= 2) {
                operate();
                idx = 0;
            }
        }
    }))

    //function definitions for above calls
    const clearDisplay = () => {
        Calc.setCurrOperation("");
        Calc.setExpressionValues([]);
        Calc.setDisplayValue("0");
        idx = 0;
        clearButtons();

        display.textContent = Calc.getDisplayValue();
    }

    //functions as a backspace
    const backspace = () => {
        let tempArr = Calc.getExpressionValues();

        if(tempArr[idx].length > 0) {
            tempArr[idx] = tempArr[idx].slice(0, tempArr[idx].length - 1);

            //if last value is a decimal
            if(tempArr.length > 0 && tempArr[idx].at(-1) === '.') {
                tempArr[idx] = tempArr[idx].slice(0, tempArr[idx].length - 1);
            }
            //if there is no values
            if(tempArr[idx].length === 0) {
                tempArr[idx] = '0';
            }

            Calc.setExpressionValues(tempArr);
            display.textContent = Calc.getExpressionValues();
        }

    }

    //stores the input values
    const getValues = (temp) => {
        let tempArr = Calc.getExpressionValues();

        if(tempArr.length > idx) {
            //only do this if it is an integer or there is no decimals in the value
            if(!(temp === '.' && tempArr[idx] && tempArr[idx].includes('.'))) {
                tempArr[idx] += temp;
            }
        }
        else {
            //if decimal is the first button clicked
            if(temp === '.') {
                tempArr.push('0.');
            }
            else {
                tempArr.push(temp); 
            }
        }

        Calc.setExpressionValues(tempArr);

        //handles leading zeroes;
        processZeroes(idx);

        Calc.setDisplayValue(Calc.getExpressionValues()[idx]);
        display.textContent = Calc.getDisplayValue();
    }

}

//highlights the current operation
function highlight() {
    let currButton = document.getElementById(`${Calc.getCurrOperation()}`);
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
    let tempArr = Calc.getExpressionValues();

    if(tempArr[idx][0] === '0' && tempArr[idx][1] !== '.') {
        if(tempArr[idx].length > 1) {
            let val = "";

            let i = 0;
            while(tempArr[idx][i] === '0') {
                i++;
            }

            for(; i < tempArr[idx].length; i++) {
                val += tempArr[idx][i];
            }

            tempArr[idx] = val;
        }
    }

    Calc.setExpressionValues(tempArr);
}
