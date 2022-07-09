import React from 'react';
import Icon from '@mdi/react';
import {
  mdiApplicationSettingsOutline,
  mdiEmailOutline,
  mdiFaceManOutline, 
  mdiHomeOutline,
  mdiTagSearchOutline 
} from '@mdi/js';
import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/auth';

import './styles.css';


const RightSide: React.FC = () => {
  const { user } = useAuth();
  return (
    <div className="col-12 right__side">
      <ul>
        <li>
          <Link to="/" className="d-flex">
            <Icon
              path={mdiHomeOutline}
              size={1.3}
            />
            <span>
              Homepage
            </span>
          </Link>
        </li>
        <li>
          <Link to={`/user/profile/${user._id}`} className="d-flex mt-3">
            <Icon
              path={mdiFaceManOutline}
              size={1.2}
            />
            <span>
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
            <span>
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
            <span>
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
            <span>
              Settings
            </span>
          </Link>
        </li>
      </ul>
    </div>
  )
}

export default RightSide;