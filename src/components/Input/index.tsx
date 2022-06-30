import React from 'react';

import './styles.css';

type props = {
    loading?: Boolean;
    name?: String;
    type?: string;
    placeholder?: String

}
const Input: React.FC<props> = ({loading, name, type, placeholder}) => {
  return (
    <input
      className="form-control mt-3"
      name={`${name}`} 
      type={`${type}`}
      placeholder={`${placeholder}`}
    />
  )
}

export default Input;