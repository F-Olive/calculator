    //Class Object "Calculator". Constuctor is a function that creates an instance of a class Object.
    //A constructor gets called when you declare an object using the new keyword. See line 48 for Variable calling the "Calculator" Object.
    //The class Calculator Object is for for the "currentOperand" & "previousOperand" calculator display. All the Display functionaltiy
    //resides on the calculator object. Key input functionalty resides outside the calculator object.
class Calculator {
    constructor(previousOperandTextElement, currentOperandTextElement) {
    this.previousOperandTextElement = previousOperandTextElement
    this.currentOperandTextElement = currentOperandTextElement
    this.clear()
}

clear() {
    this.currentOperand = ""
    this.previousOperand = ""
    this.operation = undefined

    }

        //slice starts at 0 index and removes 1 number
delete() {
    this.currentOperand = this.currentOperand.toString().slice(0, -1)

    }

    // Convert currentOperand and another number to a string value, in order to append numbers together, otherwise JS will try add the 
    //numbers together and not append.
appendNumber(number) {
    if (number === "." && this.currentOperand.includes(".")) return
    this.currentOperand = this.currentOperand.toString() + number.toString()  

    }
    
    //When clicking on any operand, the current operand screen becomes the previous operand screen and the current operand screen is
    //empited until further numbers are entered. Line 35 ensures that if the current operand screen is empty, clicking on an operation
    //does not empty the previousOperand screen unnecessarily.
chooseOperation(operation) {
    if (this.currentOperand === "") return
    if (this.previousOperand !== "") {  //If not an emptry string, call compute()
        this.compute()
        }
    this.operation = operation
    this.previousOperand = this.currentOperand
    this.currentOperand = ""
    }

compute() {
    let computation 
    const prev = parseFloat(this.previousOperand)
    const current = parseFloat(this.currentOperand)
    if (isNaN(prev) || isNaN(current)) return
    switch (this.operation) {
        case "+" :
            computation = prev + current
            break
        case "-" :
            computation = prev - current
            break
        case "*" :
            computation = prev * current
            break
        case "÷" :
            computation = prev / current
            break 
        default:
            return
        }
    this.currentOperand = computation
    this.operation = undefined
    this.previousOperand = ""
}

getDisplayNumber(number) {
    const stringNumber = number.toString()
    const integerDigits = parseFloat(stringNumber.split(".")[0])
    const decimalDigits = stringNumber.split(".")[1]
    let integerDisplay
    if (isNaN(integerDigits)) {
        integerDisplay = ""
      }  else {
            integerDisplay = integerDigits.toLocaleString("en", {
                maximumFractionDigits: 0 })
    }
    if (decimalDigits != null) {
        return `${integerDisplay}.${decimalDigits}`
    } else {
        return integerDisplay
    }
 }

updateDisplay() {
    this.currentOperandTextElement.innerText = this.getDisplayNumber(this.currentOperand)
    if (this.operation != null) {
        this.previousOperandTextElement.innerText = 
        `${this.getDisplayNumber(this.previousOperand)} ${this.operation}` //Append operator to end of previousOperand
        } else {
            this.previousOperandTextElement.innerText = ""
        }
    }
}

const numberButtons = document.querySelectorAll("[data-number]")
const operationButtons = document.querySelectorAll("[data-operation]")
const equalsButton = document.querySelector("[data-equals]")
const deleteButton = document.querySelector("[data-delete]")
const allClearButton = document.querySelector("[data-all-clear]")
const previousOperandTextElement = document.querySelector("[data-previous-operand]")
const currentOperandTextElement = document.querySelector("[data-current-operand]")

    //Create a calculator const, which calls the constructor in the calculator class object in line 1, by use of the "new" keyword.
    // Check https://www.educative.io/edpresso/what-is-a-constructor-in-javascript
const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement)

    //Click eventListener when any button or "." is clicked
numberButtons.forEach(button => {
button.addEventListener("click", () => {
    calculator.appendNumber(button.innerText)
    calculator.updateDisplay()
    })
})

    //Click eventListener when any operation button is clicked
operationButtons.forEach(button => {
    button.addEventListener("click", () => {
        calculator.chooseOperation(button.innerText)
        calculator.updateDisplay()
        })
    })

    equalsButton.addEventListener("click", button =>  {
        calculator.compute()
        calculator.updateDisplay()
})

allClearButton.addEventListener("click", button =>  {
    calculator.clear()
    calculator.updateDisplay()
})

deleteButton.addEventListener("click", button =>  {
    calculator.delete()
    calculator.updateDisplay()
})