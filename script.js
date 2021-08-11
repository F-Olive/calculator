    //Class Object "Calculator". Constuctor is a function that creates an instance of a class Object.
    //A constructor gets called when you declare an object using the new keyword. See line 111 for Variable calling the "Calculator" Object.
    //The class Calculator Object is for for the "currentOperand" & "previousOperand" calculator display. All the Display functionaltiy
    //resides on the calculator object. Key input functionalty resides outside the calculator object.
class Calculator {
    constructor(previousOperandTextElement, currentOperandTextElement) {
    this.previousOperandTextElement = previousOperandTextElement
    this.currentOperandTextElement = currentOperandTextElement
    this.clear()  //call clear() as soon as Calculator Object called to set default values.
}
    //When AC button clicked, calls calculator.clear() and calculator.updateDisplay()
clear() {
    this.currentOperand = "" //what you see in large number main display
    this.previousOperand = "" //what you see in small number display above main display
    this.operation = undefined //operation (+ - * /) operators seen appended to previousOperand (small display)
    }

        //Removes single number at a time. slice starts at 0 index (first number entered) and removes 1 number at end of the 
        //array (index -1), so when you press delete button, one number is removed at a time.
delete() {
    this.currentOperand = this.currentOperand.toString().slice(0, -1)
    }

    // Add a single digit to the screen, each time user clicks on a number button. Convert currentOperand and another number to 
    //a string value, in order to append numbers together, otherwise JS will try add the numbers together and not append.
appendNumber(number) {
    if (number === "." && this.currentOperand.includes(".")) return //Cannot add "." more than 1 time to screen
    this.currentOperand = this.currentOperand.toString() + number.toString()  //convert to string to avoid JS adding numbers together.
   }
    
    //When clicking on any operand, the current operand screen becomes the previous operand screen and the current operand screen is
    //empited until further numbers are entered. Line 35 ensures that if the current operand screen is empty, clicking on an operation
    //does not empty the previousOperand screen unnecessarily.
chooseOperation(operation) {
    if (this.currentOperand === "") return //return nothing if main screen empty
    if (this.previousOperand !== "") {  //If not an emptry string, call compute() 
        this.compute()                  //Function executes result, while selecting another operation button (+ - * /) 
        }
    this.operation = operation  //Tell "Calculator.operation" to select "operation" value
    this.previousOperand = this.currentOperand //When selecting an operator, currentOperand becomes previousOperand with
    this.currentOperand = ""                    // appended operation and current operand blanks
    }

compute() {   //Takes values and returns a sinlge value 
    let computation  //Result of the compute function
    const prev = parseFloat(this.previousOperand) //Converts to string first (if needed), then to a floating point number
    const current = parseFloat(this.currentOperand)
    if (isNaN(prev) || isNaN(current)) return   //if no previous or current data, return 
    switch (this.operation) {   //switch allows a number of "IF statements" on a single object
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
        default:        //If all cases are undefined, "return". Like an "Else" statement
            return
        }
    this.currentOperand = computation   //Places computed result into currentOperand
    this.operation = undefined          
    this.previousOperand = ""
}

getDisplayNumber(number) {
    const stringNumber = number.toString() //Convert to string, so we can split number between integerDigits and decimalDigits
    const integerDigits = parseFloat(stringNumber.split(".")[0]) //Split stringNumber at index [0], meaning integer numbers before "." then turn to a float integer
    const decimalDigits = stringNumber.split(".")[1]    //Split stringNumber at index [1], meaning decimal numbers after the "."
    let integerDisplay
    if (isNaN(integerDigits)) {
        integerDisplay = ""
      }  else {
            integerDisplay = integerDigits.toLocaleString("en", { //If there are integerDigits, set locale string to have a comma after every 3rd digit
                maximumFractionDigits: 0 }) 
    }
    if (decimalDigits != null) {        //THere are digits after the "."
        return `${integerDisplay}.${decimalDigits}` //concatenate both these numbers
    } else {
        return integerDisplay //otherwise just the integers
    }
 }

updateDisplay() {
    this.currentOperandTextElement.innerText = this.getDisplayNumber(this.currentOperand)
    if (this.operation != null) {   //operation is NOT equal to null,
        this.previousOperandTextElement.innerText =     //then display something in this...
        `${this.getDisplayNumber(this.previousOperand)} ${this.operation}` //Concatenate "operation (+ - * /)" to "previousOperand, 
        } else {                                                            //(small top display digits)" in upper small display
            this.previousOperandTextElement.innerText = "" //If this is empty, then return ""
        }
    }
}

//End of Class Object "Calculator".

//DOM querySelectors. Hookup HTML elements to const Variables
const numberButtons = document.querySelectorAll("[data-number]")
const operationButtons = document.querySelectorAll("[data-operation]")
const equalsButton = document.querySelector("[data-equals]")
const deleteButton = document.querySelector("[data-delete]")
const allClearButton = document.querySelector("[data-all-clear]")
const previousOperandTextElement = document.querySelector("[data-previous-operand]")
const currentOperandTextElement = document.querySelector("[data-current-operand]")

    //Create a calculator const, which calls the constructor in the calculator class object in line 5, by use of the "new" keyword.
    // Check https://www.educative.io/edpresso/what-is-a-constructor-in-javascript
const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement)

    //Click eventListener when any number button or "." is clicked. Use "forEach" loop, to loop through all the number buttons.
numberButtons.forEach(button => {
button.addEventListener("click", () => {
    calculator.appendNumber(button.innerText) //Take the number of the button.innertext
    calculator.updateDisplay()                  //Update display with that number
    })
})

    //Click eventListener when any operation button is clicked
operationButtons.forEach(button => {
    button.addEventListener("click", () => {
        calculator.chooseOperation(button.innerText)
        calculator.updateDisplay()
        })
    })

    //Click eventListener when the equal sign button is clicked
    equalsButton.addEventListener("click", button =>  {
        calculator.compute()
        calculator.updateDisplay()
})

    //Click eventListener when the AC button is clicked
allClearButton.addEventListener("click", button =>  {
    calculator.clear()
    calculator.updateDisplay()
})

    //Click eventListener when the delete button is clicked
deleteButton.addEventListener("click", button =>  {
    calculator.delete()
    calculator.updateDisplay()
})