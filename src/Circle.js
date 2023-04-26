import React from 'react';
import './Circle.css'

const Circle = (props) => {
  return (
    <div className={props.class}
      onClick={props.click}
      style={{
        pointerEvents: props.pointerToggle ? 'auto' : 'none'
      }}
    >
    </div >
  );

}
export default Circle;
