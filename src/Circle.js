import React from 'react';
import './Circle.css'

const Circle = (props) => {
  const { active, index, click, color } = props;
  return (
    <div
      className={`circle ${active === index + 1 ? 'active' : ''}`}
      onClick={() => click(index + 1)}
      style={{ backgroundColor: active === index + 1 ? color : '' }}
    ></div>
  );

}
export default Circle;