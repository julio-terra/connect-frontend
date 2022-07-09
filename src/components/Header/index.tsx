import React from 'react';
import { useHeader } from '../../hooks/header';
import Logo from '../../assets/logo.png';

import './styles.css';

const Header: React.FC = () => {
  const { title } = useHeader();
  return (
    <header className="header container d-flex align-items-center">
      <div className="col-3 ">
        
      </div>
      <div className="col-6">
        <h2>{title}</h2>
      </div>
      <div className="col-3 d-flex justify-content-end">
        <img
          src={Logo}
          className="img-fluid logo"
          alt=""
        />
      </div>
    </header>
  )
}
export default Header;