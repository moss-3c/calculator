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

function isDigit(string) {
    const digits = ".0123456789";
    return digits.includes(string);
}

function backspace(string) {
    return string.toString().substring(0, string.length - 1);
}

//--------------------------------//

let equation = {
    num1: '',
    num2: '',
    operator: '',
    isComplete: function () {
        return this.num1 && this.num2 && this.operator;
    },
    softReset: function () {
        this.num2 = '';
        this.operator = '';
    },
    hardReset: function () {
        this.num1 = '';
        this.num2 = '';
        this.operator = '';
    },
    hasOperator: function () { 
        return !!this.operator;
    },

} ;



let display;

const table = document.querySelector('table');
table.addEventListener('click', (event) => {
        let input = event.target.textContent;
        console.log(input);
        
        if (input === "AC") {
            equation.hardReset();
            updateDisplay('');
        }
        else if (input === "Del") {
            if (equation.isComplete()) {
                equation.num2 = backspace(equation.num2);
                updateDisplay(equation.num2);
            }
            else {
                equation.num1 = backspace(equation.num1);
                updateDisplay(equation.num1);
            }
        }
        else if(input === '=' || isOperator(input)) {
            if (equation.isComplete()) {
                equation.num1 = operate(equation.operator, equation.num1, equation.num2);
                equation.softReset();
                updateDisplay(parseFloat(+equation.num1.toFixed(2)));
            }
            else if (isOperator(input)) {
                equation.operator = input;
                updateDisplay('');
            }
        }
        else if (isDigit(input)) {
            if (equation.hasOperator()) {
                equation.num2 += input;
                updateDisplay(equation.num2);
            }
            else {
                equation.num1 += input;
                updateDisplay(equation.num1);
            }
        }
        
        
    }
)
 

  
    

