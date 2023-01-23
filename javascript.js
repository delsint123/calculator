const container = document.querySelector('.container');

const display = document.querySelector('.display');

const buttons = document.querySelectorAll('button');

let displayValue = "";

let currOperation = "";
let expressionValues = [];

let numbers = new Set("1234567890.");
let operators = new Set("+-*/");

populateDisplay();
getValues();
checkIfCanOperate();


function add(expressionValues) {
    expressionValues.push(expressionValues.pop() + expressionValues.pop());
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

        if(numbers.has(temp)) {
            if(expressionValues.length > idx) {
                expressionValues[idx] += temp;
            }
            else {
                expressionValues.push(temp);
            }

            displayValue = expressionValues[idx];
            display.textContent = displayValue;
        }
        else if(operators.has(temp)){
            currOperation = temp;
            idx++;
        }
        else {
            operate(expressionValues);
            idx = 0;
        }
    }))
}

function getValues(expressionValues) {
    if(typeof displayValue == "number") {
        if(expressionValues.value1 == 0) {
            expressionValues.value1 = displayValue;
        }
        else if(expressionValues.value2 == 0) {
            expressionValues.value2 = displayValue;
        }
    }
    else if(typeof displayValue == "string") {
        expressionValues.operator = displayValue;
    }
}

function checkIfCanOperate(expressionValues) {
    if(typeof expressionValues.value1 == "number" && 
        typeof expressionValues.value2 == "number" && 
        typeof expressionValues.operator == "string") {
        operate(expressionValues);
    }
}

//testing purposes
console.log(divide(expressionValues));

