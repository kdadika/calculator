const display = document.querySelector('.display')
const numberKeys = document.querySelectorAll('.number')
const operatorKeys = document.querySelectorAll('.operator')
const decimalKey = document.querySelector('.decimal')
const clearButton = document.querySelector('.clear')
const equalButton = document.querySelector('.equal')

let displayValue, isPressed, operation, number1, number2
let result = 0

function operate(operator, num1, num2) {
  switch (operator) {
    case 'add':
      return num1 + num2
      break
    case 'subtract':
      return num1 - num2
      break
    case 'multiply':
      return num1 * num2
      break
    case 'divide':
      return num2 === 0 ? 'Cannot divide with zero' : num1 / num2
  }
}

function clear() {
  number1 = 0
  number2 = 0
  displayValue = ''
  result = 0
  isPressed = null
  display.innerText = result
}

function updateDisplay(e) {
  if (number2 && !result) {
    displayValue += e.target.innerText
    display.innerText = displayValue

    number2 = Number(displayValue)
  } else if (isPressed) {
    displayValue = e.target.innerText
    display.innerText = displayValue

    number2 = Number(displayValue)
    isPressed = false
  } else {
    displayValue += e.target.innerText
    display.innerText = displayValue
    number1 = Number(displayValue)
  }

  console.log(number1, number2, result, displayValue, operation, isPressed)
}

function handleOperation(e) {
  if (!operation) {
    operation = e.target.dataset.action
  }
  if (isPressed === false) {
    equal(operation, number1, number2)
    operation = e.target.dataset.action
    isPressed = true
    number1 = result
  } else if ((isPressed = false && displayValue)) {
    equal(operation, number1, number2)
  } else {
    number1 = Number(displayValue)
    isPressed = true
    operation = e.target.dataset.action
  }
  console.log(number1, number2, result, displayValue, operation, isPressed)
}

function handleDecimal() {
  if (!displayValue.includes('.')) {
    displayValue += '.'
  }
}

function equal() {
  if (operation === '') {
    displayValue = displayValue
  } else if (number2) {
    result = operate(operation, number1, number2)
    display.innerText = result
    number1 = Number(result)
    number2 = 0
    displayValue = result
    operation = ''
  }
  console.log(number1, number2, result, displayValue, operation, isPressed)
}

// Click Events
numberKeys.forEach((numberKey) => {
  numberKey.addEventListener('click', (e) => updateDisplay(e))
})

operatorKeys.forEach((operatorKey) => {
  operatorKey.addEventListener('click', (e) => handleOperation(e))
})

decimalKey.addEventListener('click', handleDecimal)

clearButton.addEventListener('click', () => clear())

equalButton.addEventListener('click', () => equal())

clear()
