import React, { useEffect, useState } from "react";
import "./Trivia.css";

const Trivia = ({data, setQuestionNumber, questionNumber, isLoading, setIsLose, isOver, isLose, earned}) => {
    const [question, setQuestion] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [className, setClassName] = useState("answer");

    useEffect(() => {
        setQuestion(data[questionNumber - 1]);
    }, [data, questionNumber]);

    const handleClick = (answer) => {
        setSelectedAnswer(answer);
        setClassName("answer active");
        setClassName(answer === question.correct ? "answer correct" : "answer wrong");
        setTimeout (() => {
            if (answer === question.correct) {
                setQuestionNumber(num => num + 1);
                setSelectedAnswer(null)
            } else setIsLose(true);
        }, 3000) 
    };

    if (isLoading ) {
        return
    };

    switch(true) {
        case questionNumber > 15 : return <h1>Congratulation you win the game!</h1>;
        case isOver : return <h1>You got: {earned} $</h1>;
        case isLose && questionNumber > 5 && questionNumber < 10: return <h1>You got: 1.000 $</h1>;
        case isLose && questionNumber > 10 && questionNumber < 15: return <h1>You got: 32.000 $</h1>;
        default: break;
    };

    return(
        <div className="trivia">
            <div className="question">
                {question?.question}
            </div>
            <div className="answers">
                {Array.isArray(question?.answers)
                    ? question?.answers.map(answer => (
                        <div key ={answer}
                            className={selectedAnswer === answer ? className : "answer"}
                            onClick={() => !selectedAnswer && handleClick(answer)}
                        >
                            {answer}
                        </div>
                    ))
                    : null
                }
            </div>
        </div>
    )
};

export default Trivia;
