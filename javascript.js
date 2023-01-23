const container = document.querySelector('.container');

const display = document.querySelector('.display');

const buttons = document.querySelectorAll('button');

let displayValue = "";

let expressionValues = [];

populateDisplay();
getValues();
checkIfCanOperate();


function add(expressionValues) {
    expressionValues.push(expressionValues.pop() + expressionValues.pop());
};

function subtract(expressionValues) {
    let temp = expressionValues.pop();
    expressionValues.push(expressionValues.pop() - temp);
};

function multiply(expressionValues) {
    expressionValues.push(expressionValues.pop() * expressionValues.pop());
};

function divide(expressionValues) {
    let temp = expressionValues.pop();
    expressionValues.push(roundDecimals(expressionValues.pop() / temp));
};

function roundDecimals(result) {
    if(Math.floor(result) === result) return result;
    return parseFloat(result.toFixed(6)); 
};

function operate(expressionValues) {

    if(operator == '+') {
        add(expressionValues);
    }
    else if(operator == '-') {
        subtract(expressionValues);
    }
    else if(operator == '*') {
        multiply(expressionValues);
    }
    else if(operator == '/') {
        divide(expressionValues);
    }
};

function populateDisplay() {
    buttons.forEach(button => button.addEventListener('click', button => {

        displayValue = button.composedPath()[0].id;

        
        display.textContent = displayValue;
        
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

