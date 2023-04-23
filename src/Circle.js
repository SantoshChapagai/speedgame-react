import React from 'react';
import './Circle.css'

const Circle = (props) => {
  const circleClass = props.active ? 'circle active' : 'circle';
  return (
    <div className={circleClass} style={{ backgroundColor: 'blue' }} onClick={props.click}>
    </div>

  );
}
export default Circle;