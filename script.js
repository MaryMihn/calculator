class Calculator {
  constructor(previousOperandTextElement, currentOperandTextElement) {
    this.previousOperandTextElement = previousOperandTextElement;
    this.currentOperandTextElement = currentOperandTextElement;
    this.readyToReset = false;
    this.clear();
  }

  clear() {
    this.currentOperand = '';
    this.previousOperand = '';
    this.operation = undefined;
    this.readyToReset = false;
  }

  delete() {
    this.currentOperand = this.currentOperand.toString().slice(0, -1);
  }

  appendNumber(number) {
    if (number === '.' && this.currentOperand.includes('.')) return;
    this.currentOperand = this.currentOperand.toString() + number.toString();
  }

  chooseOperation(operation) {
    if (this.currentOperand === '') return;
    if (this.currentOperand !== '' && this.previousOperand !== '') {
      this.compute();
    }
    this.operation = operation;
    this.previousOperand =this.currentOperand
    this.currentOperand = '';
  
  }

  numberSing(){
    if(this.currentOperand === '') return;
    if(this.currentOperand !== '' && this.previousOperand === ''){
      this.currentOperand= +this.currentOperand*(-1) 
    }
    if(this.currentOperand !== '' && this.previousOperand !== ''){
      this.currentOperand= +this.currentOperand*(-1)
    }

  }


  compute() {
    let computation;
    const prev = parseFloat(this.previousOperand);
    const current = parseFloat(this.currentOperand);
    if (isNaN(prev) || isNaN(current)) return;

    let p = String(prev).length;
    let c = String(current).length;
    let numP = String(prev).indexOf('.');
    let numC = String(current).indexOf('.');
    
    let cLength = (numC<0)? c-1 : c-numC-1;
    let pLength = (numP<0)?  p-1 : p-numP-1; 

    console.log(prev);
    console.log(current);
   
    switch (this.operation) {
      case '+':
        if(numP<0 && numP<0){
          computation = (prev + current)
        } else{
              if(pLength > cLength){
                computation = (prev + current).toFixed(pLength);
              }
              else{
                computation = (prev + current).toFixed(cLength);
              }
          }
        break
      case '-':
        if(pLength > cLength){
          computation = (prev - current).toFixed(pLength);
        }
        else{
          computation = (prev - current).toFixed(cLength);
        }
        break
      case '*':
          computation = (prev * current).toFixed(cLength+pLength);
        break
      case '÷':
        if(numP<0 && numP<0){
          computation = (prev / current)
        } else{
          computation = (prev / current).toFixed(cLength+pLength);
        }
        break
      case "√" :
        computation = Math.sqrt(prev);
        
        if(isNaN(computation)) return alert('error');
        break
      case 'Xn':
        computation = Math.pow(prev, current)
        break
      default:
        return;
    }
    this.readyToReset = true;

    let stringComputation= String(computation);
    if(stringComputation.includes('.') && stringComputation.endsWith('0')){
      stringComputation.slice(0, -1);
    }
    this.currentOperand = +stringComputation;
    this.operation = undefined;
    this.previousOperand = '';
  }

  getDisplayNumber(number) {
    const stringNumber = number.toString()
    const integerDigits = parseFloat(stringNumber.split('.')[0])
    const decimalDigits = stringNumber.split('.')[1]
    let integerDisplay
    if (isNaN(integerDigits)) {
      integerDisplay = ''
    } else {
      integerDisplay = integerDigits.toLocaleString('en', { maximumFractionDigits: 0 })
    }
    if (decimalDigits != null) {
      return `${integerDisplay}.${decimalDigits}`
    } else {
      return integerDisplay
    }
  }

  updateDisplay() {
    this.currentOperandTextElement.innerText =
      this.getDisplayNumber(this.currentOperand)
    if (this.operation != null) {
      this.previousOperandTextElement.innerText =
        `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`
    } else {
      this.previousOperandTextElement.innerText = ''
    }
  }
}


const numberButtons = document.querySelectorAll('[data-number]');
const operationButtons = document.querySelectorAll('[data-operation]');
const equalsButton = document.querySelector('[data-equals]');
const deleteButton = document.querySelector('[data-delete]');
const allClearButton = document.querySelector('[data-all-clear]');
const previousOperandTextElement = document.querySelector('[data-previous-operand]');
const currentOperandTextElement = document.querySelector('[data-current-operand]');
const numberButtonOperand = document.querySelector('[data-number-operand]');

const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement)

numberButtons.forEach(button => {
  button.addEventListener("click", () => {

      if(calculator.previousOperand === "" &&
      calculator.currentOperand !== "" &&
      calculator.readyToReset) {
          calculator.currentOperand = "";
          calculator.readyToReset = false;
      }
      calculator.appendNumber(button.innerText)
      calculator.updateDisplay();
  })
})

numberButtonOperand.addEventListener('click', button => {
  calculator.numberSing()
  calculator.updateDisplay();
})

operationButtons.forEach(button => {
  button.addEventListener('click', () => {
    calculator.chooseOperation(button.innerText);
    calculator.updateDisplay();
  })
})

equalsButton.addEventListener('click', button => {
  calculator.compute();
  calculator.updateDisplay();
})

allClearButton.addEventListener('click', button => {
  calculator.clear();
  calculator.updateDisplay();
})

deleteButton.addEventListener('click', button => {
  calculator.delete();
  calculator.updateDisplay();
})
