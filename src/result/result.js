import React, { useRef } from 'react';

import styleResult from './result.module.css';

var i = 0;
function move() {
  if (i === 0) {
    i = 1;
    var elem = document.getElementsByClassName('siema');
    
    var width = 1;
    var id = setInterval(frame, 100);
    function frame() {
      if (width >= 100) {
        clearInterval(id);
        i = 0;
      } else {
        width++;
        elem.style.width = width + "%";
      }
    }
  }
}





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

  


const Result = (props) =>
{

  const test= useRef(null);



  const mover = () =>
    {
      const element = test;
      console.log(element);
     
      let width = 1;

      let action = () =>
      {
        if(width >= 100)
        {
            clearInterval(timer);
        }
        else
        {
          width++;
          element.current.style.width = width + "%";
          element.current.textContent = width + "%";


        }
      } 

      const timer = setInterval(action,10);

      
      // test.current.style.width = "3rem";
    
    
    }
    
 
    
    return (
        <div className={styleResult.item}>
          <div className={styleResult.myProgress}>
            <div ref={test}  className={styleResult.myBar}>1%</div>
           
          </div>
          <button onClick={mover}>Click Me</button> 
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

export default Result;

