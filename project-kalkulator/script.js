let displayValue = '0';
let firstinput = null;
let waitingForOperand = false;
let nextOperator = null;

function updateDisplay() {
  document.getElementById('calculator-display').value = displayValue;
}

function inputDigit(digit) {
  if (waitingForOperand) {
    displayValue = digit;
    waitingForOperand = false;
  } else{
    displayValue = displayValue === '0'? digit : displayValue + digit;
  }

  updateDisplay();
}

function handleOperator(opBaru) {
  const angkaSekarang = parseFloat(displayValue)
    if (firstinput === null) {
      firstinput = angkaSekarang;
    } else{
      const result = calculate(firstinput, angkaSekarang, nextOperator);
      displayValue = `${parseFloat(result.toFixed(7))}`;
      angkaSekarang = result;
      updateDisplay();
    }

    nextOperator = opBaru;
    waitingForOperand = true;
}

function handleDecimal() {
    if (!displayValue.includes('.')) {
      displayValue += '.';
      updateDisplay();
    }
}

function calculate(a, b, operator) {
    if (operator=== null) {
      return;
    } else if (operator === '+') {
      return a + b;
    } else if (operator === '-') {
      return a - b;
    } else if (operator === '*') {
      return a * b;
    } else if (operator === '/') {
        return a / b;
    }  
    return b;
}

function equalSign() {
    if (nextOperator && firstinput !== null) {
      const hasil = calculate(firstinput, parseFloat(displayValue), nextOperator);
      displayValue = String(hasil);
      firstinput = null;
      nextOperator = null;
      waitingForOperand = false;
      updateDisplay();
    }
}

function hapusAll() {
  displayValue = '0';
  firstinput = null;
  operator = null;
  waitingForOperand = false;
  updateDisplay();
}

document.querySelector('.calculator-keys').addEventListener('click', (e) => {
  const tombol = e.target;
  if (tombol.tagName !== 'BUTTON') return;
  const nilai = tombol.value;
  if (!isNaN(nilai)) {
    inputDigit(nilai);
  } else if (nilai === '.') {
    handleDecimal();
  } else if (['+','-','/','*'].includes(nilai)) {
    handleOperator(nilai);
  }
});

document.querySelector('.equal-sign').addEventListener('click', equalSign);
document.querySelector('.allClear').addEventListener('click', hapusAll);
updateDisplay();