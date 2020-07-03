import React, { Component } from 'react';
import CSSClass from './App.module.css';
import QuestionFrame from './questionFrame/questionFrame.js';
import Result from './result/result.js';

class App extends Component {
  state = {
    BaseQuestions: [
      {
        id: 1, question: "Jak nazywa się słynny jarmark, który odbywa się w Gdańsku od ponad 750 lat ?", answerA: 'Jarmark Europa', answerB: 'Jarmark Poznański',
        answerC: 'Jarmark Warszawski', answerD: 'Jarmark Dominikański', answer: 'Jarmark Dominikański',answerUser:null
      },
      {
        id: 2, question: 'Co znaczy słowo "biblion" ?', answerA: 'księgę', answerB: 'bibuła',
        answerC: 'bibilioteka', answerD: 'krzesło', answer: 'księgę',answerUser:null
      },
      {
        id: 3, question: "Posiadał czapkę która czyniła go niewidzialnym , był rzadkim bywalcem olimpu , o kogo chodzi ?", answerA: 'o Hadesa', answerB: 'Pateon',
        answerC: 'o zeusa', answerD: 'o hermesa', answer: 'o Hadesa',answerUser:null
      },
      {
        id: 4, question: "Pośrednik, stręczyciel nierządu to inaczej:", answerA: 'mastema', answerB: 'krzysiek',
        answerC: 'rajfur', answerD: 'błazen', answer: 'rajfur',answerUser:null
      },
      {
        id: 5, question: '"Gorąca 20 " to lista przebojów radia : ', answerA: ' Eska', answerB: 'radio zet',
        answerC: 'trojka', answerD: 'rm fmm', answer: ' Eska',answerUser:null
      },
    ],
    currentQuestions:null,
    currentQuestion: null,

    copiedQuestions: [],

    visibleQuiz: false,
    visibleResult: false,
    
    counter: 3,
    score: 0,
    click: 0,
    
  };

  checkInTime = () => {
    console.log("currentQuestions",this.state.currentQuestions);
    console.log("currentQuestion",this.state.currentQuestion);
    console.log("visibleQuiz",this.state.visibleQuiz);
    console.log("copiedQuestions",this.state.copiedQuestions);
  }

 


  startGame = () =>
  {

    
    const counter = this.state.counter;
     const currentQuestions = [...this.state.BaseQuestions];
     const emptyArray = [];
   
    const newArray = [];
    for(let j = 0;j<counter;j++)
    {
      let randomQuestion = currentQuestions[Math.floor(Math.random() * currentQuestions.length)];
      let finded = newArray.find((item)=> item === randomQuestion);
      if(finded === undefined)
      {
        newArray.push(randomQuestion);
      }
      else
      {
        j--;
      }
    }

    const randomQuestion = newArray[Math.floor(Math.random() * newArray.length)];
    const array = newArray.filter((item) => item !== randomQuestion);
    emptyArray.push(randomQuestion);
    this.setState({ currentQuestion: randomQuestion, currentQuestions: array,visibleQuiz:true});

    
      
      
    
  }
  restart = (respond) =>
  {
    
    if(respond === 'restart')
    {
      this.setState({currentQuestions : null,currentQuestion:null,score: 0,click: 0,visibleResult:false,copiedQuestions:[]});
      this.startGame();
    }
    else
    {
      this.setState({currentQuestions : null,currentQuestion:null,score: 0,click: 0,visibleResult:false,copiedQuestions:[]});
    }
     
  }
  
  createRandomQuestion = () => {
 
    
    const newArrray = [...this.state.currentQuestions];
    if (newArrray.length !== 0) {
      const randomQuestion = this.state.currentQuestions[Math.floor(Math.random() * this.state.currentQuestions.length)];
      const array = newArrray.filter((item) => item !== randomQuestion);
      this.setState({ currentQuestion: randomQuestion, currentQuestions: array});
    }
    else {
      
      this.setState({ visibleQuiz: false,visibleResult:true });
    }

  }
  checkAnswer = (e) => {
    let clicked = this.state.click;
     
    
    clicked++;
    const answer = this.state.currentQuestion.answer;
    console.log(e.target.innerHTML);
    const buffor = this.state.copiedQuestions;
    let questionObject = this.state.currentQuestion;
    questionObject.answerUser = e.target.innerHTML; 
    buffor.push(questionObject);

    if (e.target.innerHTML === answer) {
      let bufforScore = this.state.score;
      bufforScore++
      this.setState({ score: bufforScore, click: clicked,copiedQuestions:buffor });
      this.createRandomQuestion();
    }
    else {
      this.setState({ click: clicked,copiedQuestions:buffor });
      this.createRandomQuestion();
    }
  }

  
  render() {
    let questions = null;
    let result = null;
    let buttonStyle = [];
    buttonStyle.push(CSSClass.StartButton);


    if (this.state.visibleQuiz === true) {
     
        questions = <QuestionFrame currentQuestion={this.state.currentQuestion} checkAnswer = {this.checkAnswer}></QuestionFrame>;
        buttonStyle.push(CSSClass.disabledVision);
    }
    else {

     questions = null;
    }

    if(this.state.visibleResult === true)
    {

      
      const percentResult = (this.state.score / this.state.click) * 100;
      buttonStyle.push(CSSClass.disabledVision);
    result = (
        <Result percentResult={percentResult} 
                score={this.state.score} 
                click={this.state.click}
                restart={this.restart}
                copiedQuestions={this.state.copiedQuestions}> </Result>
      );
    }
    else
    {
      result = null;
    }

    
 
    return (
      <div className={CSSClass.App}>
        <h1>QUIZ Game</h1>
        <button className={buttonStyle.join(' ')} onClick={this.startGame}>zacznij gre</button>
        {/* <button onClick={this.checkInTime}>consoleLog</button> */}
        {questions}
        {result}
       


      </div>
    );
  }
}
export default App;
