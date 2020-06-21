import React, { Component } from 'react';
import CSSClass from './App.module.css';
class App extends Component {
  state = {
    questions: [
      {
        id: 1, question: "Jak nazywa się słynny jarmark, który odbywa się w Gdańsku od ponad 750 lat ?", answerA: 'Jarmark Europa', answerB: 'Jarmark Poznański',
        answerC: 'Jarmark Warszawski', answerD: 'Jarmark Dominikański', answer: 'Jarmark Dominikański'
      },
      {
        id: 2, question: 'Co znaczy słowo "biblion" ?', answerA: 'księgę', answerB: 'bibuła',
        answerC: 'bibilioteka', answerD: 'krzesło', answer: 'księgę'
      },
      {
        id: 3, question: "Posiadał czapkę która czyniła go niewidzialnym , był rzadkim bywalcem olimpu , o kogo chodzi ?", answerA: 'o Hadesa', answerB: 'Pateon',
        answerC: 'o zeusa', answerD: 'o hermesa', answer: 'o Hadesa',
      },
      {
        id: 4, question: "Pośrednik, stręczyciel nierządu to inaczej:", answerA: 'mastema', answerB: 'krzysiek',
        answerC: 'rajfur', answerD: 'błazen', answer: 'rajfur',
      },
      {
        id: 5, question: '"Gorąca 20 " to lista przebojów radia : ', answerA: ' Eska', answerB: 'radio zet',
        answerC: 'trojka', answerD: 'rm fmm', answer: ' Eska',
      },
    ],
    copiedQuestions: null,
    currentQuestion: null,
    visibleQuiz: false,
    score: 0,
    click: 0,
    
  };

  checkInTime = () => {
    console.log(this.state.questions);
  }

  nameOfPoint = (point) => {
    if (point === 1) {
      return point + " punkt";
    }
    else if (point === 2) {
      return point + " punkty";
    }
    else {
      return point + " punktów";
    }
  }


  startGame = () =>
  {
      this.setState({visibleQuiz: true,copiedQuestions:this.state.questions});
      this.createRandomQuestion();
  }

  restart = () =>
  {
      this.setState({questions : this.state.copiedQuestions,score: 0,click: 0});
  }
  createRandomQuestion = () => {
 
    const newArrray = [...this.state.questions];
    if (newArrray.length !== 0) {
      const randomQuestion = this.state.questions[Math.floor(Math.random() * this.state.questions.length)];
      const array = newArrray.filter((item) => item !== randomQuestion);
      this.setState({ currentQuestion: randomQuestion, questions: array});
    }
    else {
      console.log('pusto');
      this.setState({ visibleQuiz: false, questions: null });
    }

  }
  checkAnswer = (e) => {
    let clicked = this.state.click;
    clicked++;
    const answer = this.state.currentQuestion.answer;
    if (e.target.innerHTML === answer) {
      let bufforScore = this.state.score;
      bufforScore++
      this.setState({ score: bufforScore, click: clicked });
      this.createRandomQuestion();
    }
    else {
      this.setState({ click: clicked });
      this.createRandomQuestion();
    }
  }
  render() {
    let question = null;
    let buttonStyle = [];
    buttonStyle.push(CSSClass.StartButton);
    if (this.state.questions !== null) {
      if (this.state.visibleQuiz === true) {
        question = (
          <div className={CSSClass.item}>
            <div className={CSSClass.questionFrame}>
             <h3 className={CSSClass.question}>{this.state.currentQuestion.question}</h3>
            </div>
            <div> A)<button onClick={this.checkAnswer} className={CSSClass.button}>{this.state.currentQuestion.answerA}</button></div>
            <div> B)<button onClick={this.checkAnswer} className={CSSClass.button}>{this.state.currentQuestion.answerB}</button></div>
            <div> C)<button onClick={this.checkAnswer} className={CSSClass.button}>{this.state.currentQuestion.answerC}</button></div>
            <div> D)<button onClick={this.checkAnswer} className={CSSClass.button}>{this.state.currentQuestion.answerD}</button></div>
          </div>
        );
        buttonStyle.push(CSSClass.disabledVision);
      }
    }
    else {

      const percentResult = (this.state.score / this.state.click) * 100;
      buttonStyle.push(CSSClass.disabledVision);
      question = (
        <div className={CSSClass.item}>
          <p>wykonałeś {Math.round(percentResult)} % testu ({this.nameOfPoint(this.state.score)} na {this.state.click})</p>
          <button onClick={this.restart}>Od nowa</button>
        </div>
      );
    }
 
    return (
      <div className={CSSClass.App}>
        <h1>QUIZ Game

        </h1>
        <button className={buttonStyle.join(' ')} onClick={this.startGame}>zacznij gre</button>
        {/* <button onClick={this.checkInTime}>consoleLog</button> */}
        {question}

      </div>
    );
  }
}
export default App;
