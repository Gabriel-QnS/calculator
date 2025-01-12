import './calculator.scss';
import { useState, useEffect } from 'react';
import Math from 'mathjs';
import { evaluate } from 'mathjs';

function Calculator() {

    const [numbers, setNumbers] = useState([]); // proces as strings 
    const [operators, setOperators] = useState([]); // process as strings
    const [joint, setJoint] = useState([]); // process as continuos string
    const [latestEntry, setLatestEntry] = useState(''); // process as string

    const handleJoint = (val) => {
        setJoint((prev) => [...prev, val]);
    };

    const handleNumbers = (val) => {
        setNumbers((prev) => [...prev, val]);
    };

    const handleOperators = (val) => {
        setOperators((prev) => [...prev, val]);
    };
    
    const handleClearAll = () => {
        setNumbers([]);
        setOperators([]);
        setJoint([]);
    };

    const handleClear = () => {
        if (numbers.includes(latestEntry)) {
            setNumbers(numbers.slice(0, -1));
        } else if (operators.includes(latestEntry)) {
            setOperators(operators.slice(0, -1));
        }
        setJoint(joint.slice(0, -1));

    }
    useEffect(() => {
        console.log(joint);
    }, [joint]);

    //Calcs

    function calc(){
        const joined = joint.join('');
        const result = evaluate(joined);
        console.log(result);
    }


    return (
        <div className="calculator">
            <Display />
            <KeyPad functionPack={{handleJoint, handleNumbers, handleOperators, setLatestEntry, handleClear, calc}} />
        </div>
    );
};

function KeyPad({functionPack}){
    const numberButtons = ['.', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
    const buttonIds = ["decimal", "zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine"];
    const operationButtons = ['+', '-', '*', '/'];
    const operationBtnIds = ["add", "subtract", "multiply", "divide"];
    const clearBtns = ['CE', 'C', '='];
    const clearBtnIds = ['clear', 'clearAll', "equals"];

    function handleClick(e) {
        const origin = e.target;
        const key = origin.getAttribute('data-key');//value of the button
        const id = origin.id;//'name' of the button: 'seven' or 'add'
        const className = origin.className; // 'mathBtn' or 'operatorBtn' to be identified
        if(className === 'mathBtn'){
            functionPack.handleJoint(key);
            functionPack.handleNumbers(key);
            functionPack.setLatestEntry(key);
        } else if (className === 'operatorBtn'){
            functionPack.handleJoint(key);
            functionPack.handleOperators(key);
            functionPack.setLatestEntry(key);
        } else {
            if(id === 'clearAll'){
                functionPack.setLatestEntry('');
                functionPack.handleClearAll();
            } else if (id === 'clear'){
                functionPack.handleClear();
                functionPack.setLatestEntry('');
            } else if (id === 'equals'){
                functionPack.setLatestEntry('');
                functionPack.calc();
            }
        };

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
            
            {clearBtns.map((btn, index) => {return <button 
            data-key={btn} 
            onClick={handleClick}
            className='clearBtn' 
            key={btn} 
            id={clearBtnIds[index]}
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