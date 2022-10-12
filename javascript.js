const container = document.querySelector('.container');

const display = document.querySelector('.display');

const buttons = document.querySelectorAll('button');

let displayValue = "";

//includes operator
let expressionValues = {
    operator: "",
};

populateDisplay();
getValues();
checkIfCanOperate();


function add(expressionValues) {
    let result = expressionValues.value1 + expressionValues.value2;

    //save result if further calculations need to be made
    expressionValues.value1 = result;
    expressionValues.value2 = 0;
    
    return result;
};

function subtract(expressionValues) {
    let result = expressionValues.value1 - expressionValues.value2;

    //save result if further calculations need to be made
    expressionValues.value1 = result;
    expressionValues.value2 = 0;
    
    return result;
};

function multiply(expressionValues) {
    let result = expressionValues.value1 * expressionValues.value2;

    //save result if further calculations need to be made
    expressionValues.value1 = result;
    expressionValues.value2 = 0;
    
    return result;
};

function divide(expressionValues) {
    let result = expressionValues.value1 / expressionValues.value2;

    //save result if further calculations need to be made
    expressionValues.value1 = result;
    expressionValues.value2 = 0;

    result = roundDecimals(result);
    
    return result;
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

        displayValue = parseFloat(button.composedPath()[0].id);

        if(displayValue == NaN) {
            displayValue = button.composedPath()[0].id;
        }
        else {
            display.textContent = displayValue;
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

