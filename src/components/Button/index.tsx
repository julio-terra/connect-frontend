import React from 'react';

import './styles.css';

type props = {
    loading?: Boolean;
    text: String;
    onClick?: () => void;
    icon?: string;

}
const Button: React.FC<props> = ({loading , text, onClick, icon}) => {
  if(!loading){
    return (
      <button className="btn bt mt-3" type="submit" onClick={onClick}>
        {text}
        {
          icon && (
            <i className="icon"/>
          )
        }
      </button>
    )
  }else{
    return(
      <button className="btn bt mt-3" type="button" onClick={() => false}>
         <span className="spinner-border spinner-border-sm" />
      </button>
    )
  }
}

export default Button;