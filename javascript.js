// const container = document.querySelector('.container');

// const display = document.querySelector('.display');

// const buttons = document.querySelector('.buttons');

//set as operand for later use
function add(operands) {
    let result = operand.value1 + operand.value2;

    //save result if further calculations need to be made
    operand.value1 = result;
    operand.value2 = 0;
    
    return result;
};

function subtract(operands) {
    let result = operand.value1 - operand.value2;

    //save result if further calculations need to be made
    operand.value1 = result;
    operand.value2 = 0;
    
    return result;
};

function multiply(operands) {
    let result = operand.value1 * operand.value2;

    //save result if further calculations need to be made
    operand.value1 = result;
    operand.value2 = 0;
    
    return result;
};

function divide(operand) {
    let result = operand.value1 / operand.value2;

    //save result if further calculations need to be made
    operand.value1 = result;
    operand.value2 = 0;

    result = roundDecimals(result);
    
    return result;
};

function roundDecimals(result) {
    if(Math.floor(result) === result) return result;
    return parseFloat(result.toFixed(6)); 
};

function operate(operand, operator) {
    if(operator == '+') {
        add(operand);
    }
    else if(operator == '-') {
        subtract(operand);
    }
    else if(operator == '*') {
        multiply(operand);
    }
    else if(operator == '/') {
        divide(operand);
    }
};

//testing purposes
let operand = {
    value1: 10,
    value2: 3,
};
console.log(divide(operand));