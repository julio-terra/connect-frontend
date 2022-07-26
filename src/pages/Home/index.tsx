import React, { useEffect, useState } from 'react';
import { useHeader } from '../../hooks/header';
import { useAuth } from '../../hooks/auth';
import api from '../../services/axios';
import AddPost from '../../components/AddPost';
import Post from '../../components/Post';

type Tpost = {
  _id?: String;
  user_id?: String;
}
const Home: React.FC = () => {
  const [posts, setPosts] = useState<Tpost[]>([])
  const { updateTitle } = useHeader()
  const { user } = useAuth();

  
  useEffect(() =>{
    const fetchData = async () =>{
      const response = await api.get(`/posts/list/${user._id}`);
      setPosts(response.data.posts);
    }
    fetchData()
  }, [])

  useEffect(() =>{
    updateTitle('Homepage')
  }, [])
  
  return (
    <div className="col-12">
      <AddPost />
      <div className='mt-4'>
        {
          posts?.map((e, i) => (
            <Post
              key={i}
              {...e}
            />
          ))
        }
      </div>
    </div>
  )
}

export default Home;