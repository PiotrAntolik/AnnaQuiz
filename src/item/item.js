import React from 'react';
import CSSclass from './item.module.css';


const item = (props) =>
{
    return (
            <div className={CSSclass.item}>
                <p >{props.question}</p>
                <div> A)<button className={CSSclass.button}>A</button></div>
                <div> A)<button className={CSSclass.button}>A</button></div>
                <div> A)<button className={CSSclass.button}>A</button></div>
                <div> A)<button className={CSSclass.button}>A</button></div>
                           
            </div>
    );
}

export default item; 