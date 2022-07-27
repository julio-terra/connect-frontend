import React from 'react';
import Header from '../../components/Header';
import LeftSide from '../../components/LeftSide';
import RightSide from '../../components/RightSide';
import Tabs from '../../components/Tabs';

import './styles.css';

type props = {
  children?: JSX.Element
}

const DefaultLayout: React.FC<props> = ({children}) => {
  return (
    <>
      <Header />
      <div className="default__layout container d-flex pt-5">
        <div className="position-sticky col-3 pe-0 pe-lg-3 d-none d-lg-flex">
          <LeftSide />
        </div>
        <div className="col-12 col-md-9 col-lg-6 mid">
          {children}
        </div>
        <div className="col-3 ps-0 ps-lg=-3 d-none d-md-flex">
          <RightSide />
        </div>
      </div>
      <Tabs />
    </>
  )
}

export default DefaultLayout;