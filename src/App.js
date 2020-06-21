import React, { Component } from 'react';
import CSSClass from './App.module.css';
class App extends Component {
  state = {
    questions: [
      {
        id: 1, question: "Co Ania lubi najbardziej wieczorem?", answerA: 'owocki', answerB: 'lody',
        answerC: 'buszindo', answerD: 'wszystkie powyżej', answer: 'wszystkie powyżej'
      },
      {
        id: 2, question: 'Dlaczego Anna to ,,Owocowy oszust"?', answerA: 'bo kradnie owoce', answerB: 'bo oszukuje na wadze w sklepie',
        answerC: 'zalała mixer do szejków', answerD: 'bo je dużo owoców', answer: 'zalała mixer do szejków'
      },
      {
        id: 3, question: "Na czym chciała zjechać Anna ze szczytu góry podczas wycieczki na morskie Oko? ", answerA: 'na nartach', answerB: 'na plecaku',
        answerC: 'na koniu', answerD: 'gopr ją zniósł', answer: 'na plecaku',
      },
      {
        id: 4, question: "Jak nazywa się wioska startowa Anny? ", answerA: 'gaboń', answerB: 'nowy sącz',
        answerC: 'jaworzno', answerD: 'st hellens', answer: 'jaworzno',
      },
      {
        id: 5, question: "wymień zdanie najczęściej powtarzane przez Anne ", answerA: 'misiuuuś zawieziesz mnie do pracy?', answerB: 'misiuuuś pozmywasz naczynia?',
        answerC: 'misiuuuś zrobisz carbonare?', answerD: 'misiuuuś mamy coś słodkiego? (na wieczór)', answer: 'misiuuuś mamy coś słodkiego? (na wieczór)',
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
            <p>{this.state.currentQuestion.question}</p>
            <div> A)<button onClick={this.checkAnswer} className={CSSClass.button}>{this.state.currentQuestion.answerA}</button></div>
            <div> A)<button onClick={this.checkAnswer} className={CSSClass.button}>{this.state.currentQuestion.answerB}</button></div>
            <div> A)<button onClick={this.checkAnswer} className={CSSClass.button}>{this.state.currentQuestion.answerC}</button></div>
            <div> A)<button onClick={this.checkAnswer} className={CSSClass.button}>{this.state.currentQuestion.answerD}</button></div>
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
        <h1>Mietus Game v1.0</h1>
        <button className={buttonStyle.join(' ')} onClick={this.startGame}>zacznij gre</button>
        {/* <button onClick={this.checkInTime}>consoleLog</button> */}
        {question}

      </div>
    );
  }
}
export default App;
