import React from 'react';
import Routes from './routes/index';
import { ToastContainer } from 'react-toastify';
import { AuthProvider } from './hooks/auth';

import 'react-loading-skeleton/dist/skeleton.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/globalStyles.css';
import { HeaderProvider } from './hooks/header';


const App: React.FC = () => {
  return (
    <AuthProvider>
      <HeaderProvider>
      <>
        <ToastContainer />
        <Routes />
      </>
      </HeaderProvider>
    </AuthProvider>
  );
}

export default App;