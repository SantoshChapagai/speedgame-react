import React from 'react';
import './Modal.css'
const Modal = (props) => {
  return (
    <div className='modal'>
      <div className='overlay'>
        <h1>Game Over</h1>
        <p>Score:{props.score}</p>
        <p><span>{props.message}</span></p>
        <button className='close' onClick={props.close}>X</button>
      </div>
    </div>
  );
};

export default Modal;