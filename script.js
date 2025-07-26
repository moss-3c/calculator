function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    return a / b;
}

function operate(operator, num1, num2) {
    if (operator === "/" && num2 === "0") {
        alert("no division by 0... :angy:");
        return '';
    }

    num1 = Number(num1);
    num2 = Number(num2);

    let result;

    switch(operator) {
        case "+": 
            result = add(num1, num2);
            break;
        case "-":
            result = subtract(num1, num2);
            break;
        case "*":
            result = multiply(num1, num2);
            break;
        case "/":
            result = divide(num1, num2);
            break;     
    } 
    equation.justCalculated = true;
    
    return result;
}

function updateDisplay (content) {
    const display = document.querySelector(".display");
    display.textContent = content;
    return content;
}

function isOperator(string) {
    const operators = "+-/*";
    return operators.includes(string);
}

function isDigit(char) {
    const digits = ".0123456789";
    return digits.includes(char);
}

function backspace(string) {
    const newString = string.toString().substring(0, string.length - 1);
    updateDisplay(newString);
    return newString;
}


function handleInput(input) {
    
    if (input === "AC" || input === "c") {
        equation.hardReset();
    }
    else if (input === "Del" || input === "Backspace") {
        if (equation.isComplete()) {
            equation.num2 = backspace(equation.num2);
        }
        else {
            equation.num1 = backspace(equation.num1);
        }
    }
    else if(input === '=' || input === "Enter" || isOperator(input)) {
        if (equation.isComplete()) {
            equation.num1 = operate(equation.operator, equation.num1, equation.num2);
            equation.displayResult();
        }
        else if (isOperator(input)) {
            equation.operator = input;
        }
    }
    else if (input === '.') {
        const display = document.querySelector(".display");
        if(!display.textContent.includes(".")) {
            equation.updateCurrNum(input);
        }
    }
    else if (isDigit(input)) {
         equation.updateCurrNum(input);
    }
    
    
}
//------
let equation = {
    num1: '',
    num2: '',
    operator: '',
    justCalculated: false,
    isComplete: function () {
        return this.num1 && this.num2 && this.operator;
    },
    displayResult: function () {
        this.num2 = '';
        this.operator = '';
        updateDisplay(parseFloat((+this.num1).toFixed(2)));
    },
    hardReset: function () {
        this.num1 = '';
        this.num2 = '';
        this.operator = '';
        updateDisplay('');
    },
    hasOperator: function () { 
        return !!this.operator;
    },
    updateNum1: function (digit) {
        if (this.justCalculated) {
            this.hardReset();
            this.justCalculated = false;
        }
        this.num1 += digit;
        updateDisplay(this.num1);
    },
    updateNum2: function (digit) {
        this.num2 += digit;
        updateDisplay(this.num2);
    },
    updateCurrNum: function (input) {
        if (this.hasOperator()) {
            equation.updateNum2(input);
        }
        else {
            equation.updateNum1(input);
        }
    },
} ;


const table = document.querySelector('table');
table.addEventListener('click', (event) => handleInput(event.target.textContent));
let body = document.querySelector('body');
body.addEventListener('keydown', (event) => handleInput(event.key));


//add kb support
 

  
    

