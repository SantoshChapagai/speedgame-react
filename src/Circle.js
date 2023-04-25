import React from 'react';
import './Circle.css'

const Circle = (props) => {
  const { click, index, active } = props;
  return (
    <div className={`circle ${active === index + 1 ? 'active' : ''}`}
      onClick={() => click(index + 1)}>
      <div>
      </div>

    </div>
  );

}
export default Circle;