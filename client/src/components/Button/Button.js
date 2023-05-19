import React from 'react';
import './Button.css';

const Button = ({ className, onClick, children, style }) => {
  return (
    <button className={`${className}-button`} onClick={onClick} style={style}>
      {children}
    </button>
  );
};

export default Button;
