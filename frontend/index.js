import { backend } from 'declarations/backend';

const display = document.getElementById('display');
const buttons = document.querySelectorAll('button');
const clearBtn = document.getElementById('clear');
const equalsBtn = document.getElementById('equals');

let currentInput = '';
let currentOperation = null;
let previousInput = null;

buttons.forEach(button => {
    if (button.classList.contains('num') || button.classList.contains('op')) {
        button.addEventListener('click', () => appendToDisplay(button.textContent));
    }
});

clearBtn.addEventListener('click', clearDisplay);
equalsBtn.addEventListener('click', calculate);

function appendToDisplay(value) {
    if (value === '.' && currentInput.includes('.')) return;
    if (['+', '-', '*', '/'].includes(value)) {
        if (currentOperation) calculate();
        currentOperation = value;
        previousInput = parseFloat(currentInput);
        currentInput = '';
    } else {
        currentInput += value;
    }
    updateDisplay();
}

function updateDisplay() {
    display.value = currentInput || '0';
}

function clearDisplay() {
    currentInput = '';
    currentOperation = null;
    previousInput = null;
    updateDisplay();
}

async function calculate() {
    if (previousInput === null || currentOperation === null) return;

    const current = parseFloat(currentInput);
    let result;

    try {
        switch (currentOperation) {
            case '+':
                result = await backend.add(previousInput, current);
                break;
            case '-':
                result = await backend.subtract(previousInput, current);
                break;
            case '*':
                result = await backend.multiply(previousInput, current);
                break;
            case '/':
                if (current === 0) {
                    throw new Error('Division by zero');
                }
                const divisionResult = await backend.divide(previousInput, current);
                if ('err' in divisionResult) {
                    throw new Error(divisionResult.err);
                }
                result = divisionResult.ok;
                break;
        }

        currentInput = result.toString();
        currentOperation = null;
        previousInput = null;
        updateDisplay();
    } catch (error) {
        display.value = 'Error: ' + error.message;
        currentInput = '';
        currentOperation = null;
        previousInput = null;
    }
}

updateDisplay();
