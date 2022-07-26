import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Skeleton from 'react-loading-skeleton'
import date from 'date-and-time';
import Icon from '@mdi/react';
import { mdiThumbUpOutline } from '@mdi/js';
import api from '../../services/axios';

import './styles.css';

type props = {
  user_id?: String;
  _id?: String;
}
type Tdata = {
  userDisplayName?: String;
  userFileUrl?: string;
  displayText?: String;
  fileUrl?: string;
  createdAt?: Date;
  likes?: [String];
}
type TuserData = {
  displayName: String;
  fileUrl: string
}
type Tcomment = {
  _id: String;
}

const Post: React.FC<props> = ({ user_id, _id}) => {
  let navigate = useNavigate();
  const [data, setData] = useState<Tdata>()
  const [loading, setLoading] = useState(false);
  const [userData, setUserdata] = useState<TuserData>();
  const [comments, setComments] = useState<Tcomment[]>();
  useEffect(() =>{
    const fetchData = async () => {
      setLoading(true)
      const post = await api.get(`/posts/post/${_id}`);
      const user = await api.get(`/users/user/${user_id}`);
      setData(post.data.post)
      setUserdata(user.data.user._doc)
      setLoading(false)
    }
    fetchData();
  }, [])
  return (
    <div className="col-12 p-4 mb-3 post">
      <div className="d-flex user" onClick={() =>  navigate(`/user/${user_id}/profile`)}>
        <div className='img me-2'>
          {
            !userData?.fileUrl && loading && (
              <Skeleton 
                width={'100%'}
                height={'100%'} 
                className="rounded-circle"
              />
            )
          }
          <img 
            src={userData?.fileUrl}
            alt=""
            className="img-fluid rounded-circle"
          />
        </div>
        <div>
          <h1>{userData?.displayName || <Skeleton />}</h1>
        </div>
        <div className="ms-auto">
          {data?.createdAt && <small>{date.format(new Date(data.createdAt), 'YY/MM/DD HH:mm') || <Skeleton />}</small>}
        </div>
      </div>
      <div className="content mt-3" onClick={() => navigate(`/user/${user_id}/post/${_id}`)}>
        {
          !data?.displayText && loading &&(
            <div className="px-1 mt-2">
              <h1>{<Skeleton/>}</h1>
            </div>
          )
        }
        {
          data?.displayText && !loading &&(
            <div className="px-1 mt-2">
              <h1>{data.displayText}</h1>
            </div>
          )
        }
        {
          !data?.fileUrl && loading && (
            <div className="img d-flex justify-content-center rounded">
              <Skeleton 
                width={'100%'}
                height={'500px'} 
                className="rounded-circle"
              />
            </div>
          )
        }
        {
          data?.fileUrl && !loading && (
            <div className="img d-flex justify-content-center rounded">
              <img
                src={data.fileUrl}
                alt=""
                className="img-fluid"
              />
            </div>
          )
        }
      </div>
      <div className="d-flex interations mt-4">
        <div className="d-flex justify-content-center w-50 comments" onClick={() => navigate(`/user/${user_id}/post/${_id}#comments`)}>
          <span>{`Comments ${comments?.length || 0}`}</span>
        </div>
        <div className="d-flex justify-content-center align-items-center w-50 likes">
          <Icon
            path={mdiThumbUpOutline}
            size="24"
            className="me-1"
          />
          <span>{data?.likes?.length || 0}</span>
        </div>
      </div>
    </div>
  )
}

export default Post;