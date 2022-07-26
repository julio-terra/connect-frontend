import React, { useState } from 'react';
import { mdiArrowRightThin } from '@mdi/js';
import { useForm } from 'react-hook-form';
import { useAuth } from '../../hooks/auth';

import Input from '../../components/Input';
import Button from '../../components/Button';


const UserName: React.FC = () => {
  const { user, updateUserName } = useAuth();
  const [userName, setUserName] = useState<string>('');
  const { handleSubmit } = useForm();

  const onSubmit = () => updateUserName(user._id || '', userName);
  return (
    <form action="submit" className="col-12 col-md-10 col-lg-8 col-xl-6" onSubmit={handleSubmit(onSubmit)}>
      <h3>Hello {user.displayName}! <br /> almost there... please add your unique username.</h3>
      <Input
        name="userName"
        type="text"
        placeholder="Add your userName"
        className="mt-4"
        set={setUserName}
      />
      <Button
        text="Add"
        className="mt-3"
        icon={mdiArrowRightThin}
      />
    </form>
  )
}

export default UserName;