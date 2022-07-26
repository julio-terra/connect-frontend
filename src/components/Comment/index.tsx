import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import date from 'date-and-time';
import Skeleton from 'react-loading-skeleton';
import api from '../../services/axios';

import './styles.css';

type props = {
    _id?: String;
    user_id?: String;
}
type Tuser = {
  displayName: String;
  fileUrl: string
}
type Tcomment = {
  displayText?: String;
  createdAt?: Date;
  fileUrl?: string;
}
const Comment: React.FC<props> = ({ _id, user_id }) => {
  const [comment, setComment] = useState<Tcomment>();
  const [user, setUser] = useState<Tuser>();
  const navigate = useNavigate();
  const [loading, setLoading] = useState<Boolean>()
  
  useEffect(() =>{
    const fetchcomment = async () =>{
      setLoading(true)
      const response = await api.get(`/comments/comment/${_id}`);
      console.log(response)
      setUser(await(await (api.get(`/users/user/${user_id}`))).data.user._doc)
      setComment(response.data.comment)
      setLoading(false)
    }
    fetchcomment()
  }, [])
  return (
    <div className="col-12 p-4 comment mb-3">
     <div className="d-flex user" onClick={() =>  navigate(`/user/${user_id}/profile`)}>
        <div className='img me-2'>
          {
            !user?.fileUrl && loading && (
              <Skeleton 
                width={'100%'}
                height={'100%'} 
                className="rounded-circle"
              />
            )
          }
          <img 
            src={user?.fileUrl}
            alt=""
            className="img-fluid rounded-circle"
          />
        </div>
        <div>
          <h1>{user?.displayName || <Skeleton />}</h1>
        </div>
        <div className="ms-auto">
          {comment?.createdAt && <small>{date.format(new Date(comment.createdAt), 'YY/MM/DD HH:mm') || <Skeleton />}</small>}
        </div>
      </div>
      <div className="content mt-3">
        {
          !comment?.displayText && loading &&(
            <div className="px-1 mt-2">
              <h1>{<Skeleton/>}</h1>
            </div>
          )
        }
        {
          comment?.displayText && !loading &&(
            <div className="px-1 mt-2">
              <h1>{comment.displayText}</h1>
            </div>
          )
        }
        {
          !comment?.fileUrl && loading && (
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
          comment?.fileUrl && !loading && (
            <div className="img d-flex justify-content-center rounded">
              <img
                src={comment.fileUrl}
                alt=""
                className="img-fluid"
              />
            </div>
          )
        }
      </div>
    </div>
  )
}

export default Comment;