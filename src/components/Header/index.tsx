import React from 'react';
import Icon from '@mdi/react';
import { mdiArrowLeftBold } from '@mdi/js';
import { useHeader } from '../../hooks/header';
import Logo from '../../assets/logo.png';

import './styles.css';
import { useLocation, useNavigate } from 'react-router-dom';

const Header: React.FC = () => {
  const navigate = useNavigate()
  const location = useLocation();
  const { title } = useHeader();
  return (
    <header className="header container d-flex align-items-center">
      <div className="col-3 d-none d-lg-flex">
        
      </div>
      <div className="col-6 col-md-9 col-lg-6 d-flex align-items-center">
        {
          location.pathname != '/' && (
            <div onClick={() => window.history.back()} className="back me-2">
              <Icon 
                path={mdiArrowLeftBold}
                size={1.3}
              />
            </div>
          )
        }
        <h2 className="m-0">{title}</h2>
      </div>
      <div className="col-6 col-md-3 d-flex justify-content-end" onClick={() => navigate('/')}>
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