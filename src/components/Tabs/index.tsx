import React from 'react';
import Icon from '@mdi/react';
import {
  mdiEmailOutline,
  mdiFaceManOutline, 
  mdiHomeOutline,
  mdiExitToApp
} from '@mdi/js';

import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/auth';

import './styles.css';

const Tabs: React.FC = () => {
  const { user, signOut } = useAuth();
  return (
    <div className='tabs d-md-none d-flex py-2'>
      <ul className='m-0 d-flex align-items-center justify-content-around container'>
        <li>
          <Link to="/">
            <Icon
              path={mdiHomeOutline}
              size={1.4}
            />
          </Link>
        </li>
        <li>
          <Link to={`/user/${user._id}/profile`}>
            <Icon
              path={mdiFaceManOutline}
              size={1.3}
            />
          </Link>
        </li>
        <li>
          <Link to="/">
            <Icon
              path={mdiEmailOutline}
              size={1.3}
            />
          </Link>
        </li>
        <li onClick={() => signOut()}>
          <Link to="/">
            <Icon
              path={mdiExitToApp}
              size={1.2}
            />
          </Link>
        </li>
      </ul>
    </div>
  )
}

export default Tabs;