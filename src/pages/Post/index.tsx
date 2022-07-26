import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useHeader } from '../../hooks/header';
import api from '../../services/axios';

import CPost from '../../components/Post';
import AddComment from '../../components/AddComment';
import Comment from '../../components/Comment';

type Tcomment = {
  _id?: String;
  user_id?: String;
}

const Post: React.FC = () => {
  const { updateTitle } = useHeader();
  useEffect(() =>{
    updateTitle('Post')
  }, [])
  const params = useParams();
  const [comments, setComments] = useState<Tcomment[]>();
  
  useEffect(() =>{
    const fetchData = async () =>{
      const response = await api.get(`/comments/list/${params.id}`);
      setComments(response.data.comments);
    }
    fetchData()
  }, [])
  return (
    <>
      <CPost 
        user_id={params.user_id}
        _id={params.id}
      />
      <AddComment post_id={params.id}/>
      <h4 className='mt-2'>
        Comments
      </h4>
      <div>
        {
          comments?.map((e, i) => (
            <Comment 
              key={e?._id?.toString()}
              user_id={e.user_id}
              _id={e._id}
            />
          ))
        }
      </div>
    </>
  )
}

export default Post;