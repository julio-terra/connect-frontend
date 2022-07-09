import React from 'react';

type props = {
  children?: JSX.Element
}

const AuthLayout: React.FC<props> = ({children}) => {
  return (
    <div className="container d-flex justify-content-center align-items-center page">
      {children || <> </>}
    </div>
  )
}

export default AuthLayout;