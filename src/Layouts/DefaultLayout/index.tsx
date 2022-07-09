import React from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';
import Header from '../../components/Header';
import LeftSide from '../../components/LeftSide';
import RightSide from '../../components/RightSide';

type props = {
  children?: JSX.Element
}

const DefaultLayout: React.FC<props> = ({children}) => {
  return (
    <>
      <Header />
      <div className="default__layout container d-flex pt-5">
        <div className="col-3 pe-0 pe-lg-3 d-none d-lg-flex">
          <LeftSide />
        </div>
        <PerfectScrollbar className="col-12 col-lg-6">
          {children}
        </PerfectScrollbar>
        <div className="col-3 ps-0 ps-lg-3 d-none d-lg-flex">
          <RightSide />
        </div>
      </div>
    </>
  )
}

export default DefaultLayout;