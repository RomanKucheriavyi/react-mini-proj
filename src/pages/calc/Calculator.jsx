import React, { useState } from "react";
import Display from "./components/Display";
import ButtonBox from "./components/ButtonBox";
import { toLocaleString, removeSpaces, math } from "../../helper/calc/Calculator-helper";
import { Link } from "react-router-dom";
import "./Calculator.css"

const Calculator = () => {
    let [calc, setCalc] = useState({sign: "", num: 0, res: 0});

    const getClickHandler = button => {
        switch(button) {
            case "C" : return resetClickHandler; 
            case "Del" : return deleteClickHandler; 
            case "+-" : return invertClickHandler; 
            case "%" : return percentClickHandler;
            case "=" : return equalsClickHandler; 
            case "/"  : return signClickHandler; 
            case "+"  : return signClickHandler; 
            case "-"  : return signClickHandler; 
            case "X"  : return signClickHandler; 
            case "." : return commaClickHandler; 
            default: return numClickHandler; 
        }
    };

    const numClickHandler = e => {
        e.preventDefault();
        const value = e.target.innerHTML;
        if (removeSpaces(calc.num).length < 15) {
            setCalc({
                ...calc,
                num:
                removeSpaces(calc.num) % 1 === 0 && !calc.num.toString().includes(".")
                    ? toLocaleString(Number(removeSpaces(calc.num + value)))
                    : toLocaleString(calc.num + value),
                res: !calc.sign ? 0 : calc.res,
            });
        }
    };

    const commaClickHandler = e => {
        e.preventDefault();
        const value = e.target.innerHTML;

        setCalc({
            ...calc,
            num: !calc.num.toString().includes(".") ? calc.num + value : calc.num,
        });
    };

    const signClickHandler = e => {
        setCalc({
            ...calc,
            sign: e.target.innerHTML,
            res: calc.res === "Can't divide with 0" ? calc.res = 0 : 
                !calc.num ? calc.res : !calc.res
                ? calc.num : toLocaleString(
                    math(
                        Number(removeSpaces(calc.res)),
                        Number(removeSpaces(calc.num)),
                        calc.sign
                    )
                ),
            num: 0,
        });
    };

    const equalsClickHandler = () => {
        if (calc.sign && calc.num) {
            setCalc({
                ...calc,
                res:
                    (calc.num == 0 && calc.sign === "/") ? "Can't divide with 0" : toLocaleString(
                        math(
                            Number(removeSpaces(calc.res)),
                            Number(removeSpaces(calc.num)),
                            calc.sign
                        )
                    ),
                sign: "",
                num: 0,
            });
        }
    };

    const invertClickHandler = () => {
        setCalc({
            ...calc,
            num: calc.num && calc.num !== "Can't divide with 0" ? toLocaleString(removeSpaces(calc.num) * -1) : 0,
            res: calc.res && calc.res !== "Can't divide with 0" ? toLocaleString(removeSpaces(calc.res) * -1) : 0,
            sign: "",
        });
    };

    const percentClickHandler = () => {
        let num = calc.num && calc.num !== "Can't divide with 0" ? parseFloat(removeSpaces(calc.num)) : 0;
        let res = calc.res && calc.res !== "Can't divide with 0" ? parseFloat(removeSpaces(calc.res)) : 0;
        setCalc({
            ...calc,
            num: (num /= Math.pow(100, 1)),
            res: (res /= Math.pow(100, 1)),
            sign: "",
        });
    };

    const resetClickHandler = () => {
        setCalc({
            ...calc,
            sign: "",
            num: 0,
            res: 0,
        });
    };

    const deleteClickHandler = () => {
        setCalc({
            ...calc,
            num: calc.num && calc.num.slice(0, -1) !== "-" && calc.num !== "Can't divide with 0" ? toLocaleString(calc.num.slice(0, -1)) : 0,
            sign: "",
        });
    };

    return (
        <div className="calculator">
            <span><Link to="/">&lt;---Back to home</Link></span>
            <div className="calculator-wrapper">
                <Display value={calc.num ? calc.num : calc.res} />
                <ButtonBox clickHandler={getClickHandler}/>
            </div>
        </div>
    );
};

export default Calculator;