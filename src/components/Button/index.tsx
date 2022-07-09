import React from 'react';
import Icon from '@mdi/react';

import './styles.css';

type props = {
    loading?: Boolean;
    text: String;
    onClick?: () => void;
    icon?: string;
    className?: String;
}
const Button: React.FC<props> = ({loading, className, text, onClick, icon}) => {
  if(!loading){
    return (
      <button className={`btn bt ${className}`} type="submit" onClick={onClick}>
        {text}
        {
          icon && (
            <Icon path={icon} size={1}/>
          )
        }
      </button>
    )
  }else{
    return(
      <button className={`btn bt ${className}`} type="button" onClick={() => false}>
         <span className="spinner-border spinner-border-sm" />
      </button>
    )
  }
}

export default Button;