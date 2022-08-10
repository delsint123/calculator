// const container = document.querySelector('.container');

// const display = document.querySelector('.display');

// const buttons = document.querySelector('.buttons');

//set as object for later use
function add(object) {
    let result = object.value1 + object.value2;

    //save result if further calculations need to be made
    object.value1 = result;
    object.value2 = 0;
    
    return result;
}

function subtract(object) {
    let result = object.value1 - object.value2;

    //save result if further calculations need to be made
    object.value1 = result;
    object.value2 = 0;
    
    return result;
}

function multiply(object) {
    let result = object.value1 * object.value2;

    //save result if further calculations need to be made
    object.value1 = result;
    object.value2 = 0;
    
    return result;
}

function divide(object) {
    let result = object.value1 / object.value2;

    //save result if further calculations need to be made
    object.value1 = result;
    object.value2 = 0;
    
    return result;
}

//testing purposes
let object = {
    value1: 4,
    value2: 10,
}
console.log(divide(object));