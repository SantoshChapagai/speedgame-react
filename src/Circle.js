import React from 'react';
import './Circle.css'

const Circle = (props) => {
  const circleStyle = {
    color: "red"
  }
  return (
    <div className='circle' onClick={props.click} style={circleStyle}>


      {/* style={{ pointerEvents: props.activeEvent ? "all" : "none" }} */}
    </div>

  );
}
export default Circle;