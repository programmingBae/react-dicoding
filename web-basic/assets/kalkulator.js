const calculator = {
    displayNumber: '0',
    operator: null,
    firstNumber:  null,
    waitingForSecondNumber: false,
    newCalculation: false,
}

const updateDisplay = () => {
    document.querySelector('#displayNumber').innerText = calculator.displayNumber;
}

const clearCalc = () => {
    calculator.displayNumber = '0';
    calculator.operator = null;
    calculator.firstNumber = null;
    calculator.waitingForSecondNumber = false;
    calculator.newCalculation = false;
}

const inputDigit = (digit) => {
    if (calculator.newCalculation === true){
        clearCalc();
    }
    if (calculator.displayNumber === "0"){
        calculator.displayNumber = digit
    } else {
        calculator.displayNumber += digit;
    }
}

const inverseNumber = () => {
    if (calculator.displayNumber === '0'){
        return;
    }
    calculator.displayNumber = calculator.displayNumber * -1;
}

const handleOperator = (operator) => {
    if (!calculator.waitingForSecondNumber){
        calculator.operator = operator;
        calculator.waitingForSecondNumber = true;
        calculator.firstNumber = calculator.displayNumber;
        calculator.displayNumber = "0";
    } else {
        alert("Operator sudah ditetapkan!")
    }
}

const performCalculation = () => {
    calculator.displayNumber = eval(calculator.firstNumber + calculator.operator + calculator.displayNumber);
    calculator.newCalculation = true;
}

const buttons = document.querySelectorAll('.button');

for (const button of buttons){
    button.addEventListener("click", (event) => {
        // get clicked element object
        const target = event.target;
        if (target.classList.contains('clear')){
            clearCalc();
            updateDisplay();
            return;
        } else if (target.classList.contains('negative')){
            inverseNumber();
            updateDisplay();
            return;
        } else if (target.classList.contains('equals')){
            performCalculation();
            updateDisplay();
            return;
        } else if (target.classList.contains('operator')){
            handleOperator(target.innerText);
            return;
        }
        inputDigit(target.innerText);
        updateDisplay();
    })
}


