import React from "react";
import Button from "./Button";
import {BUTTONS, getBtnClassName} from "../../../helper/calc/Calculator-helper";
import "./ButtonBox.css";

const ButtonBox = ({clickHandler}) => {
    return (
        <div className="button-box">
            {BUTTONS.flat().map((button, index) => {
                return (
                <Button
                    key={index}
                    className={getBtnClassName(button)}
                    value={button}
                    onClick={clickHandler(button)}
                />
                );
            })}
        </div>
    )
};

export default ButtonBox;
