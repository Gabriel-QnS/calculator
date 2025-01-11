import './calculator.scss';

function Calculator() {
    return (
        <div className="calculator">
        </div>
    );
};

function KeyPad(){
    const numberButtons = ['.', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
    const buttonIds = ["decimal", "zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine"];
    const operationButtons = ['+', '-', '*', '/','clear', '='];
    const operationBtnIds = ["add", "subtract", "multiply", "divide", "clear", "equals"];
    return (
        <div className="calculator-keypad">
            {buttons.map(button => <button>{button}</button>)}
        </div>
    );
};

function Display(){
    return (
        <div className="display">0</div>
    );
};