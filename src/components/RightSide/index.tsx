import React from 'react';
import Icon from '@mdi/react';
import {
  mdiApplicationSettingsOutline,
  mdiEmailOutline,
  mdiFaceManOutline, 
  mdiHomeOutline,
  mdiTagSearchOutline,
  mdiExitToApp
} from '@mdi/js';
import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/auth';

import './styles.css';


const RightSide: React.FC = () => {
  const { user, signOut } = useAuth();
  return (
    <div className="col-12 right__side">
      <ul>
        <li>
          <Link to="/" className="d-flex">
            <Icon
              path={mdiHomeOutline}
              size={1.3}
            />
            <span className='d-none d-lg-flex'>
              Homepage
            </span>
          </Link>
        </li>
        <li>
          <Link to={`/user/${user._id}/profile`} className="d-flex mt-3">
            <Icon
              path={mdiFaceManOutline}
              size={1.2}
            />
            <span className='d-none d-lg-flex'>
              Profile
            </span>
          </Link>
        </li>
        <li>
          <Link  to="/explore" className="d-flex mt-3">
            <Icon
              path={mdiTagSearchOutline}
              size={1.2}
            />
            <span className='d-none d-lg-flex'>
              Explore
            </span>
          </Link>
        </li>
        <li>
          <Link to="/" className="d-flex mt-3">
            <Icon
              path={mdiEmailOutline}
              size={1.2}
            />
            <span className='d-none d-lg-flex'>
              Messages
            </span>
          </Link>
        </li>
        <li>
          <Link to="/settings" className="d-flex mt-3">
            <Icon
              path={mdiApplicationSettingsOutline}
              size={1.1}
            />
            <span className='d-none d-lg-flex'>
              Settings
            </span>
          </Link>
        </li>
        <li onClick={() => signOut()}>
          <Link to="/settings" className="d-flex mt-3">
            <Icon
              path={mdiExitToApp}
              size={1.1}
            />
            <span className='d-none d-lg-flex'>
              Sign out
            </span>
          </Link>
        </li>
      </ul>
    </div>
  )
}

export default RightSide;