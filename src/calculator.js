import './calculator.scss';

function Calculator() {
    return (
        <div className="calculator">
        <div className="calculator-display">0</div>
        <div className="calculator-keypad">
            <button>7</button>
            <button>8</button>
            <button>9</button>
            <button>+</button>
            <button>4</button>
            <button>5</button>
            <button>6</button>
            <button>-</button>
            <button>1</button>
            <button>2</button>
            <button>3</button>
            <button>*</button>
            <button>0</button>
            <button>.</button>
            <button>=</button>
            <button>/</button>
        </div>
        </div>
    );
};

function KeyPad(){
    const numberButtons = ['.', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
    const buttonIds = ["decimal", "zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine"];
    const operationButtons = ['+', '-', '*', '/'];
    const operationBtnIds = ["add", "subtract", "multiply", "divide"];
    return (
        <div className="calculator-keypad">
            {buttons.map(button => <button>{button}</button>)}
        </div>
    );
}