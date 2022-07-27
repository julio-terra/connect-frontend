import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/auth';
import api from '../../services/axios';

import './styles.css'

type props = {
  avatar?: string;
  userName?: String;
  _id?: String
}

type Tfollower = {
  _id?: String;
}
type Tuser = {
  followers: Tfollower[];
}

const User: React.FC<props> = ({avatar, userName, _id}) => {
  const location = useLocation();
  const [loading, setLoading] = useState<Boolean>(true)
  const { user, follow, unfollow } = useAuth()
  const [isFollowing, setIsFollowing] = useState<Tfollower[]>();

  const fetchData = async () => {
    setLoading(true)
    const response = await api.get(`/users/user/${_id}`);
    setIsFollowing(response.data.user.followers.filter((e: Tfollower) => e._id === user._id))
    setTimeout(() =>{
      setLoading(false)
    }, 500)
  }
  useEffect(() =>{
    fetchData()
  }, [])
  return (
    <Link to={`/user/${_id}/profile`} className="col-12 d-flex align-items-center user__component mb-3">
      <div className="img me-2">
        <img
          src={avatar}
          alt=""
          className="img-fluid rounded-circle"
        />
      </div>
      <strong>{userName}</strong>
      <Link className='ms-auto' to={location.pathname}>
        {
          loading && (
            <button className="btn-follow btn" onClick={() => {follow(user._id || '', _id || ''); fetchData()}}>
              <span className="spinner-border spinner-border-sm"/>
            </button>
          )
        }
        {
          isFollowing?.length === 0 && !loading && (
            <button className="btn-follow btn" onClick={() => {follow(user._id || '', _id || ''); fetchData()}}>
              follow
            </button>
          )
        }
        {
          isFollowing?.length !== 0 && !loading && (
            <button className="btn-following btn" onClick={() => {unfollow(user._id || '', _id || ''); fetchData()}}>
              following
            </button>
          )
        }
      </Link>
    </Link>
  )
}

export default User;