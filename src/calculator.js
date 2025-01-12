import './calculator.scss';
import { useState, useEffect } from 'react';

function Calculator() {

    const [numbers, setNumbers] = useState([]); // proces as strings 
    const [operators, setOperators] = useState([]); // process as strings
    const [joint, setJoint] = useState([]); // process as string

    const test = (val) =>{
        setJoint((prev) => [...prev, val]);
        
    };

    useEffect(() => {
        console.log(joint);
    }, [joint]);


    return (
        <div className="calculator">
            <Display />
            <KeyPad functionPack={{test, setNumbers, setOperators}} />
        </div>
    );
};

function KeyPad({functionPack}){
    const numberButtons = ['.', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
    const buttonIds = ["decimal", "zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine"];
    const operationButtons = ['+', '-', '*', '/','clear', '='];
    const operationBtnIds = ["add", "subtract", "multiply", "divide", "clear", "equals"];

    function handleClick(e) {
        const origin = e.target;
        const key = origin.getAttribute('data-key');//value of the button
        const id = origin.id;//'name' of the button: 'seven' or 'add'
        const className = origin.className; // 'mathBtn' or 'operatorBtn' to be identified
        if(className === 'mathBtn'){
            functionPack.test(key);
        }

        console.log({key, id, className, functionPack});
        

    }

    return (
        <div className="calculator-keypad">
            {numberButtons.map((btn, index) => {return <button 
            data-key={btn} 
            onClick={handleClick} 
            className='mathBtn' 
            key={btn} 
            id={buttonIds[index]}
            >{btn}</button>})}
            {operationButtons.map((btn, index) => {return <button 
            data-key={btn} 
            onClick={handleClick}
            className='operatorBtn' 
            key={btn} 
            id={operationBtnIds[index]}
            >{btn}</button>})}
        </div>
    );
};

function Display(){

    const [input, setInput] = useState('');

    function simpleRegistry(entry){
        setInput(input + entry)
    }

    return (
        <div className="display">0</div>
    );
};

export { Calculator };