import React from 'react';
import './Circle.css'

const Circle = (props) => {
  return (
    <div className='circle'>
      <div className={`click ${props.active ? "active" : ""}`}
        onClick={props.click}
        style={{ pointerEvents: props.activeEvent ? "all" : "none" }}
      >

      </div>
    </div>

  );
}
export default Circle;