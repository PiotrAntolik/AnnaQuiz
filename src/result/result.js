import React from 'react';

import styleResult from './result.module.css';
import styleApp from '../App.module.css';


const nameOfPoint = (point) => {
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

  const renderAnswer = (answerUser,answer) =>
  {
      if(answerUser === answer)
      {
      return (
        <div className={styleResult.answerFrame}>
        <p style={{marginRight:'10px'}}>  Twoja odpowiedź:</p>
      
        <p className={styleResult.green}>{answerUser}</p>
        </div>
      );
       
      }
      else
      {
        return (
          <div style={{textAlign:'left'}}>
           <div className={styleResult.answerFrame}>
          <p style={{marginRight:'10px'}}>  Twoja odpowiedź:</p>
          <p className={styleResult.red}>{answerUser}</p>

          </div>
           <div className={styleResult.answerFrame}>
           <p  style={{marginRight:'10px',marginTop:'0'}}>poprawna:</p>
           <p style={{marginTop:'0'}} className={styleResult.green}>{answer}</p>
 
           </div>
          </div>
         



         
       
        );

      }
  }

  


const result = (props) =>
{

 
    
    return (
        <div className={styleResult.item}>
        <p>wykonałeś <strong>{Math.round(props.percentResult)} % testu</strong>  ({nameOfPoint(props.score)} na {props.click})</p>
        <button  onClick={props.restart.bind('restart')}>Od nowa</button>
        <button  onClick={props.restart.bind('menu')}>Menu główne</button>
        <h2><strong>odpowiedzi:</strong></h2>
    
        { <div>
              {props.copiedQuestions.map((item,index) => {
            return (
              <div className={styleResult.resultItem}>

               
                 <h3> Pytanie numer {index+1}</h3>
                 <div>{item.question}</div>
                 {renderAnswer(item.answerUser,item.answer)}
                
              </div>       
           
            );
            
        
            })}</div> }
       
        
       
      </div>
    );
}

export default result;

