import Big from "big.js";

const BUTTONS = [
    ["C", "+-", "Del", "/"],
    [7, 8, 9, "X"],
    [4, 5, 6, "-"],
    [1, 2, 3, "+"],
    ["%", 0, ".", "="]
];

const getBtnClassName = btn => {
    switch(btn) {
        case "%" : btn ="percent"; break;
        case "/" : btn ="divide"; break;
        case "X" : btn ="mult"; break;
        case "-" : btn ="minus"; break;
        case "+" : btn ="plus"; break;
        case "+-" : btn ="invert"; break;
        case "." : btn ="comma"; break;
        case "=" : btn ="equals"; break;
        default: break;
    }
    return("btn btn-"+btn)
};

const toLocaleString = num => String(num).replace(/(?<!\..*)(\d)(?=(?:\d{3})+(?:\.|$))/g, "$1 ");

const removeSpaces = num => num.toString().replace(/\s/g, "");

const math = (a, b, operator) => {
    let res = 0;
    switch(operator) {
        case "+" : res = Big(a).plus(b); break;
        case "-" : res = Big(a).minus(b); break;
        case "X" : res = Big(a).times(b); break;
        case "/" : res = Big(a).div(b); break;
        default: break;
    }
    return res;
};

export{  
    BUTTONS,
    getBtnClassName,
    toLocaleString,
    removeSpaces,
    math
};
