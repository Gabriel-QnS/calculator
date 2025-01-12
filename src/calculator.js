import { useState, useEffect } from 'react';
import { evaluate } from 'mathjs';

function Calculator() {

    const [numbers, setNumbers] = useState([]); // proces as strings 
    const [operators, setOperators] = useState([]); // process as strings
    const [joint, setJoint] = useState([]); // process as continuos string
    const [latestEntry, setLatestEntry] = useState(''); // process as string
    const [result, setResult] = useState(''); // process as number

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
        const calcResult = evaluate(joined);
        setResult(calcResult);
    }

    function handleDisplay(){
        return joint.join('');
    };


    return (
        <div className="calculator d-flex flex-column justify-content-center">
            <Display result={result} expression={handleDisplay()} />
            <KeyPad functionPack={{handleJoint, handleNumbers, handleOperators, setLatestEntry, handleClear, handleClearAll, calc}} />
        </div>
    );
};

function KeyPad({functionPack}) {
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
            }}};

    return (
        <div className="calculator-keypad
        d-flex flex-wrap justify-content-center align-items-center
        flex-column">
            <div className="mathButtons row justify-content-center">
            {numberButtons.map((btn, index) => {return <button 
            data-key={btn} 
            onClick={handleClick} 
            className='mathBtn col-4' 
            key={btn} 
            id={buttonIds[index]}
            >{btn}</button>})}
            </div>
            
            <div className='container operatorButtons row'>
            {operationButtons.map((btn, index) => {return <button 
            data-key={btn} 
            onClick={handleClick}
            className='operatorBtn col-6' 
            key={btn} 
            id={operationBtnIds[index]}
            >{btn}</button>})}
            </div>
            
            <div className="container clearButtons row">
            {clearBtns.map((btn, index) => {return <button 
            data-key={btn} 
            onClick={handleClick}
            className='clearBtn col-4' 
            key={btn} 
            id={clearBtnIds[index]}
            >{btn}</button>})}
            </div>

        </div>
    );
};

function Display({ expression, result }) {
    
    return (
        <div className="display container-md 
        d-flex flex-column justify-content-center align-items-center
        border border-2 border-info">
            {expression}
            {result && <div className="result 
            container-fluid text-center
            border-top border-2 border-info">{result}</div>}
        </div>
    );
};

export { Calculator };