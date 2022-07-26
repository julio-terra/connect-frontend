import React, { useState } from 'react';
import { useForm, SubmitHandler } from "react-hook-form";
import { toast } from 'react-toastify';
import { mdiClose }  from '@mdi/js';
import { useAuth } from '../../hooks/auth';
import Icon from '@mdi/react';
import api from '../../services/axios';
import Button from '../Button';

import './styles.css';

type TnewPost = {
  displayText?: string;
  file: FileList;
}
          
const AddPost: React.FC = () => {
  const [loading, setLoading] = useState<Boolean>(false);
  const [file, setFile] = useState<string>();
  const { user } = useAuth();
  const { handleSubmit, register } = useForm<TnewPost>();    

  const onSubmit:SubmitHandler<TnewPost> = async data =>{
    setLoading(true)
    var formData = new FormData();
    if(user._id){
      formData.append('user_id', user._id.toString())
    }
    if(data?.file[0]){
      formData.append('file', data.file[0]);
    }
    if(data.displayText){
      formData.append('displayText', data.displayText)
    }
    const response = await api.post("/posts/new", formData)        
    if(response.data.error){
      setLoading(false)
      return toast.error(response.data.message);
    }
    toast.success('done!')
    setLoading(false)
  }
  return (
    <form className="new__post p-4" onSubmit={handleSubmit((onSubmit))}>
        <h3>What is on your mind?</h3>
        <div className="col-12">
          <input 
            type="text"
            className="form-control"
            required
            {...register("displayText")}
          />
        </div>
        <div className="mt-2 d-flex justify-content-center rounded img">
          <div onClick={() => setFile('')}>
            <Icon 
              path={mdiClose}
              className="mdi__close"
            />
          </div>
          <img
            src={file}
            alt=""
            className='img-fluid'
          />
        </div>
        <div className="col-12 mt-2">
          <input 
            type="file"
            className="input-img mt-2"
            id="file"
            accept=".jpg, .jpeg, .png"
            {...register("file")}
            onChange={e => e?.target?.files && setFile(URL.createObjectURL(e.target.files[0]))}
          />
        </div>
        <div className="col-12">
          <Button
            className="mt-2" 
            text="Post"
            loading={loading}
          />
        </div>
      </form>
  )
}

export default AddPost;