import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";

const RandomGenerator = () => {
    const [nums, setNums] = useState();
    const inputMin = useRef();
    const inputMax = useRef();
    const inputAmount = useRef();
    const [isUnique, setisUnique] = useState(false);
    
    const generateNumbers = () => {
        const max = +inputMax.current.value;
        const min = +inputMin.current.value;
        const amount = +inputAmount.current.value;

        switch (true) {
            case inputMax.current.value.length === 0 || inputMin.current.value.length === 0 || inputAmount.current.value.length === 0: return "Each input must be filled";
            case !Number.isInteger(min) || !Number.isInteger(max) || !Number.isInteger(amount): return "Input values must be integer";
            case min > max || min === max: return "Min value must be less than max value";
            case min > 1000 || min < -1000: return "Min value must be in given range";
            case max > 1000 || max < -1000: return "Max value must be in given range";
            case isUnique && ((max-min) < amount): return "In this case amount value must be bigger than given range";
            case amount < 1: return "Amount value must at least 1";
            case isUnique: {
                const numbers = new Set();
                while(numbers.size !== amount)
                {
                    numbers.add((Math.floor(Math.random() * (max - min + 1)) + min) + " ");
                }
                return numbers
            };
            case !isUnique: {
                const numbers = [];
                for (let counter = 0; counter < amount; counter++){
                    numbers.push((Math.floor(Math.random() * (max - min + 1)) + min) + " ");
                }
                return numbers
            };
            default: return []
        };
    };

    const isUniqueHandleChange = () => {
        setisUnique(current => !current);
    };

    const RandomGeneratorClickHandler = () =>{
        setNums(generateNumbers())
    };

    return (
        <div className="rand">
            <span><Link to="/">&lt;---Back to home</Link></span>
            <h1>Pseudorandom number generator in [-1000; 1000] range</h1>
            <fieldset>            
                <label htmlFor="min-range">Min: </label>
                <input type="number" name="minValue" id="min-range" min="-1000" max="1000" ref={inputMin} defaultValue="1" /><br />
                <label htmlFor="max-range">Max: </label>
                <input type="number" name="maxValue" id="max-range" min="-1000" max="1000" ref={inputMax} defaultValue="42" /><br />
                <label htmlFor="rand-amount">Amount: </label>
                <input type="number" name="amountValue" id="rand-amount" min="1" max="100"ref={inputAmount} defaultValue="5" /><br />
                <input type="checkbox" name="isUnique" id="unique" value={isUnique} defaultChecked={false} onChange={isUniqueHandleChange} />
                <label htmlFor="unique">Generate unique numbers </label><br />
                <button onClick={RandomGeneratorClickHandler}>Generete</button>
            </fieldset>
            <span className="rand-result">Your result: {nums} </span>
        </div>
    );
};

export default RandomGenerator;

