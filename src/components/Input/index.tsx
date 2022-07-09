import React from 'react';

import './styles.css';

type props = {
    className?:String;
    name?: String;
    type?: string;
    placeholder?: String;
    set: React.Dispatch<React.SetStateAction<string>>
    value?: string;
}
const Input: React.FC<props> = ({className, name, type, placeholder, value, set}) => {
  return (
    <input
      className={`form-control ${className}`}
      name={`${name}`} 
      type={`${type}`}
      placeholder={`${placeholder}`}
      required
      value={value}
      onChange={e => set(e.target.value)}
    />
  )
}

export default Input;