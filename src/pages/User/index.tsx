import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useHeader } from '../../hooks/header';

import api from '../../services/axios';

type Tuser = {
  displayName?: String;
  userName?: String;
  fileUrl?: string;
}
const User: React.FC = () => {
  const [user, setUser] = useState<Tuser>()
  const [loading, setLoading] = useState<Boolean>(false)
  const params = useParams();

  const { updateTitle } = useHeader();
  useEffect(() =>{
    const fetchData = async () => {
      setLoading(true);
      const response = await api.get(`/users/user/${params.id}`);
      setUser(response.data.user);
      console.log(response.data.user)
      updateTitle(response.data.user.displayName);
      setLoading(false);
    }
    fetchData()
  }, [params])
  
  return (
    <div className="d-flex">
      <div className="col-3">
        <img
          src={user?.fileUrl} 
          alt="" 
          className="img-fluid rounded-circle"
        />
      </div>
      <span>
        {user?.displayName}
      </span>
      <strong>
        {user?.userName}
      </strong>
    </div>
  )
}

export default User;