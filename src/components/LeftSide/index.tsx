import React, { useState, useEffect } from 'react';
import api from '../../services/axios';
import User from '../User';

type Tuser = {
  fileUrl?: string;
  userName?: String;
  _id?: String;
}
type Tusers = {
  users: Tuser[]
}
const LeftSide: React.FC = () => {
  const [users, setUsers] = useState<Tusers>();
  useEffect(() =>{
    const fetchData = async () =>{
      const response = await api.get("/users")
      setUsers(response.data);
    }
    fetchData()
  }, [])
  
  return (
    <div className="col-12">
      {
          users?.users?.map((e, i) => (
            i <= 7 && (
              <User
                userName={e.userName}
                _id={e._id}
                avatar={e.fileUrl}
                key={i}
              />
            )
          ))
        } 
    </div>
  )
};

export default LeftSide;