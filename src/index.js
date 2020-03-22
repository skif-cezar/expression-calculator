function eval() {
    // Do not use eval!!!
    return;
}

function expressionCalculator(expr) {
    // write your solution here
    function getElementsArr(expr) {
        arr = expr.split('');
        for (let i = 0; i < arr.length; i++) {
            if (arr[i] === '+' || arr[i] === '-' || arr[i] === '*' || arr[i] === '/' || arr[i] === '(' || arr[i] === ')') {
                arr[i] = ' ' + arr[i] + ' ';
            }
        }
        arr = arr.join('').split(' ');
        for (let i = 0; i < arr.length; i++) {
            if (arr[i] === '') {
                arr.splice(i, 1);
                i--;
            } else if (!isNaN(arr[i])) {
                arr[i] = Number(arr[i]);
            } else {
                arr[i] = arr[i];
            }
        }

        return arr;
}

    function operation(expr, num1, num2) {
        switch (expr) {
            case '*':{
                return num1*num2;
            }
            case '/': {
                if(num2 == 0) throw new Error('TypeError: Division by zero.');
                return num1/num2;
            }
            case '+':{
                return num1+num2;
            }
            case '-': {
                return num1-num2;
            }
        }
    }

    const priorities = {
        "+": 1,
        "-": 1,
        "*": 2,
        "/": 2
    }

    function checkBracke(expr){
        let arr = getElementsArr(expr);
        let arrLeftBracke = arr.filter(function(item) {
            if(item === "("){
                return item;
            };
        });
        let arrRightBracke = arr.filter(function(item) {
            if(item === ")"){
                return item;
            }
        });
        if (arrLeftBracke.length === arrRightBracke.length){
            return true;
        } else{
            throw new Error("ExpressionError: Brackets must be paired");
        }
    }

    checkBracke(expr);
    expr = getElementsArr(expr);

    let operatorStack = [];
    let numberStack = [];
    for(var i = 0; i < expr.length;i++){

        if (numberStack.length === 0 || operatorStack.length === 0){

            if (/[0-9]/.test(expr[i])){
                numberStack.push(expr[i]);
            } else {
                operatorStack.push(expr[i]);
            }
        }
        else if (/[0-9]/.test(expr[i])){
            numberStack.push(expr[i]);
        }
        else if (priorities[expr[i]] > priorities[operatorStack[operatorStack.length-1]] ||
            expr[i] ==="(" || operatorStack[operatorStack.length-1] === "("){
            operatorStack.push(expr[i]);
        }
        else if (priorities[expr[i]] <= priorities[operatorStack[operatorStack.length-1]]){
            while (priorities[expr[i]] <= priorities[operatorStack[operatorStack.length-1]] ||
            priorities[operatorStack[operatorStack.length-1]] === "("){
                let result = operation(operatorStack[operatorStack.length-1],numberStack[numberStack.length-2],
                    numberStack[numberStack.length-1]);
                numberStack.splice(numberStack.length-2,2);
                numberStack.push(result);
                operatorStack.splice(operatorStack.length-1,1);
            }
            operatorStack.push(expr[i]);
        }
        else if (expr[i] == ")"){
            while (operatorStack[operatorStack.length-1] != "("){
                let result = operation(operatorStack[operatorStack.length-1],
                    numberStack[numberStack.length-2],numberStack[numberStack.length-1]);
                numberStack.splice(numberStack.length-2,2);
                numberStack.push(result);
                operatorStack.splice(operatorStack.length-1,1);
            }
            operatorStack.splice(operatorStack.length-1,1);
        }

    }
    while (numberStack.length > 1){
        let result = operation(operatorStack[operatorStack.length-1],numberStack[numberStack.length-2],
            numberStack[numberStack.length-1]);
        numberStack.splice(numberStack.length-2,2);
        numberStack.push(result);
        operatorStack.splice(operatorStack.length-1,1);
    }
    return numberStack[0];
}

module.exports = {
    expressionCalculator
}