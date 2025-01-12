import { useState, useEffect } from 'react';
import { evaluate } from 'mathjs';

function Calculator() {

    const [numbers, setNumbers] = useState([]); // proces as strings 
    const [operators, setOperators] = useState([]); // process as strings
    const [joint, setJoint] = useState([]); // process as continuos string
    const [latestEntry, setLatestEntry] = useState(''); // process as string
    const [result, setResult] = useState('0'); // process as number

    const handleJoint = (val) => {
        setJoint((prev) => {
            const lastEntry = prev[prev.length - 1];
    
            // Prevent multiple decimals in a single number
            if (val === "." && /\.\d*$/.test(prev.join(""))) return prev;
    
            // Prevent consecutive operators
            if (/[\+\-\*\/]/.test(val) && /[\+\-\*\/]$/.test(prev.join(""))) return prev;
    
            // Prevent leading operators
            if (prev.length === 0 && /[\+\-\*\/]/.test(val)) return prev;
    
            // Automatically prefix decimal with zero
            if (val === "." && (!lastEntry || /[\+\-\*\/]/.test(lastEntry))) {
                return [...prev, "0", val];
            }
    
            console.log("Joint array:", [...prev, val]);
            return [...prev, val];
        });
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
        setResult("0"); //reset the result
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

    const calc = () => {
        const joined = joint.join("") || 0;
    
        // Prevent division by zero
        if (/\/\s*0(\D|$)/.test(joined)) {
            alert("Error: Division by zero is not allowed!");
            return;
        }
    
        try {
            const calcResult = evaluate(joined);
            setResult(calcResult.toString());
        } catch (err) {
            alert("Invalid expression. Please check your input.");
        }
    };

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
    const numberButtons = ['.', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9'].reverse();
    const buttonIds = ["decimal", "zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine"].reverse();
    const operationButtons = ['+', '-', '*', '/'];
    const operationBtnIds = ["add", "subtract", "multiply", "divide"];
    const clearBtns = ['CE', 'C', '='];
    const clearBtnIds = ['clearOne', 'clear', "equals"];

    function handleClick(e) {
        const origin = e.target;
        const key = origin.getAttribute('data-key');//value of the button
        const id = origin.id;//'name' of the button: 'seven' or 'add'
        const className = origin.className; // 'mathBtn' or 'operatorBtn' to be identified
        if(className.includes('mathBtn')){
            console.log('event triggered by click!', origin);
            functionPack.handleJoint(key);
            functionPack.handleNumbers(key);
            functionPack.setLatestEntry(key);
        } else if (className.includes('operatorBtn')){
            functionPack.handleJoint(key);
            functionPack.handleOperators(key);
            functionPack.setLatestEntry(key);
        } else {
            if(id === 'clear'){
                functionPack.setLatestEntry('');
                functionPack.handleClearAll();
            } else if (id === 'clearOne'){
                functionPack.handleClear();
                functionPack.setLatestEntry('');
            } else if (id === 'equals'){
                functionPack.setLatestEntry('');
                functionPack.calc();
            }}};

    return (
        <div className="calculator-keypad
        d-flex flex-wrap justify-content-center align-items-center
        flex-column m-auto" style={{maxWidth: 500}}>
            <div className="mathButtons row justify-content-center d-flex justify-content-center align-items-center">
            {numberButtons.map((btn, index) => {return <button 
            data-key={btn} 
            onClick={handleClick} 
            className='mathBtn col-4 btn btn-info btn-outline-dark' 
            key={btn} 
            id={buttonIds[index]}
            >{btn}</button>})}
            </div>
            
            <div className='container operatorButtons row'>
            {operationButtons.map((btn, index) => {return <button 
            data-key={btn} 
            onClick={handleClick}
            className='operatorBtn btn btn-outline-dark text-dark fw-bold col-6' 
            key={btn} 
            id={operationBtnIds[index]}
            >{btn}</button>})}
            </div>
            
            <div className="container clearButtons row">
            {clearBtns.map((btn, index) => {return <button 
            data-key={btn} 
            onClick={handleClick}
            className='clearBtn btn outline-btn-dark col-4' 
            key={btn} 
            id={clearBtnIds[index]}
            >{btn}</button>})}
            </div>

        </div>
    );
};

function Display({ expression, result }) {
    console.log("Expression:", expression); 
    console.log("Result:", result);
    
    return (
        <div id='display' className="display container-md 
        d-flex flex-column justify-content-center align-items-center
        border border-2 border-info" style={{maxWidth: 500}}>
            {expression}
            {result && <div className="result 
            container-fluid text-center
            border-top border-2 border-info">{result || "0"}</div>}
        </div>
    );
};

export { Calculator };