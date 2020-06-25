import React from 'react';
import styleQuestion from './questionFrame.module.css';


const questionFrame = (props) =>
{
    return (
        <div className={styleQuestion.item}>
        <div className={styleQuestion.questionFrame}>
         <h3 className={styleQuestion.question}>{props.currentQuestion.question}</h3>
        </div>
        <div> <span className={styleQuestion.pointer}>A</span><button onClick={props.checkAnswer} className={styleQuestion.button}>{props.currentQuestion.answerA}</button></div>
        <div> <span className={styleQuestion.pointer}>B</span><button onClick={props.checkAnswer} className={styleQuestion.button}>{props.currentQuestion.answerB}</button></div>
        <div> <span className={styleQuestion.pointer}>C</span><button onClick={props.checkAnswer} className={styleQuestion.button}>{props.currentQuestion.answerC}</button></div>
        <div> <span className={styleQuestion.pointer}>D</span><button onClick={props.checkAnswer} className={styleQuestion.button}>{props.currentQuestion.answerD}</button></div>
      </div>
    );
}

export default questionFrame;