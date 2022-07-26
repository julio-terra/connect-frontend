import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAuth } from '../../hooks/auth';
import { useHeader } from '../../hooks/header';
import api from '../../services/axios';

import Post from '../../components/Post';

import './styles.css'

type Tfollower = {
  _id?: String;
}
type Tuser = {
  followers: Tfollower[];
  _doc:{
    displayName?: String;
    userName?: String;
    fileUrl?: string;
    following: string[]
  }
}
type Tpost = {
  _id: String;
  user_id: String;
}

const User: React.FC = () => {
  const [me, setMe] = useState<Tuser>()
  const [posts, setPosts] = useState<Tpost[]>();
  const params = useParams();
  const { updateTitle } = useHeader();
  const { user, follow, unfollow } = useAuth();
  const [isFollowing, setIsFollowing] = useState<Tfollower[]>();
  const [loading, setLoading] = useState<Boolean>(true)

  const fetchData = async () => {
    setLoading(true)
    const response = await api.get(`/users/user/${params.id}`);
    setIsFollowing(response.data.user.followers.filter((e: Tfollower) => e._id === user._id));
    setMe(response.data.user);
    updateTitle(response?.data.user._doc.displayName);
    setPosts((await(api.get(`/users/posts/${response?.data.user._doc._id}`))).data.posts);
    setTimeout(() =>{
      setLoading(false)
    }, 250)
  }
  useEffect(() =>{
    fetchData()
  }, [params])
  return (
    <>
      <div className="user__profile d-flex flex-wrap">
        <div className="col-3">
          <img
            src={me?._doc.fileUrl} 
            alt="" 
            className="img-fluid rounded-circle"
          />
        </div>
        <div className='ms-2'>
          <h4>
            {me?._doc.displayName}
          </h4>
          <strong>
            {me?._doc.userName}
          </strong>
        </div>
        <div className='ms-auto'>
          {
            params.id === user._id && (
              <button className="btn-follow btn">
                edit
              </button>
            )
          }
          {
            params.id !== user._id && loading && (
              <button className="btn-follow btn">
                <span className="spinner-border spinner-border-sm"/>
              </button>
            )
          }
          {
            params.id !== user._id && isFollowing?.length === 0 && !loading && (
              <button className="btn-follow btn" onClick={() => {follow(user._id || '', params.id || ''); fetchData()}}>
                follow
              </button>
            )
          }
          {
            params.id !== user._id && isFollowing?.length !== 0 && !loading && (
              <button className="btn-following btn" onClick={() => {unfollow(user._id || '', params.id || ''); fetchData()}}>
                following
              </button>
            )
          }
        </div>
      </div>
      <div className='user__numbers d-flex py-3 my-3'>
        <div className="col-4 d-flex flex-column align-items-center">
          <strong>{posts?.length}</strong>
          <span>Total posts</span>
        </div>
        <div className="col-4 d-flex flex-column align-items-center">
          <strong>{me?.followers.length}</strong>
          <span>Followers</span>
        </div>
        <div className="col-4 d-flex flex-column align-items-center">
          <strong>{me?._doc.following.length}</strong>
          <span>Following</span>
        </div>
      </div>
      <div>
        {
          posts?.map((e, i) => (
            <Post
              key={i}
              {...e}
            />
          ))
        }
      </div>
    </>
  )
}

export default User;