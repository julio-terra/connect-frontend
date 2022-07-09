import React from 'react';
import { Link } from 'react-router-dom';
import Avatar from '../../assets/avatar.png';

import './styles.css'

type props = {
  avatar?: string;
  userName?: String;
  _id?: String
}
const User: React.FC<props> = ({avatar, userName, _id}) => {
  return (
    <Link to={`/user/${_id}`} className="col-12 d-flex align-items-center user__component mb-3">
      <div className="img me-2">
        <img
          src={avatar || Avatar}
          alt=""
          className="img-fluid rounded-circle"
        />
      </div>
      <strong>{userName}</strong>
      <button className="ms-auto btn">
        Follow
      </button>
    </Link>
  )
}

export default User;