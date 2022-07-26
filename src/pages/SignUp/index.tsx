import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useAuth  } from '../../hooks/auth';
import { Link } from 'react-router-dom';
import { mdiArrowRightThin } from '@mdi/js';

import Button from '../../components/Button';
import Input from '../../components/Input';

import ILogo from '../../assets/logo.png';

import './styles.css';

type Tdata = {
  displayName: String
  email: String
  password: String
}
const SignUp: React.FC = () => {
  const [displayName, setDisplayName] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const { handleSubmit } = useForm<Tdata>();
  
  const onSubmit = () => signUp(displayName, email, password);
  
  const { signUp, loading } = useAuth();
  return (
    <form action="submit" className="col-12 col-md-10 col-lg-8 col-xl-6" onSubmit={handleSubmit(onSubmit)}>
      <div className="signup__logo">
        <img 
          src={ILogo}
          alt=""
          className="img-fluid"
        />
      </div>
      <Input
        name="displayName"
        placeholder="Your name" 
        type="text"
        className="mt-4"
        set={setDisplayName}
      />
      <Input 
        name="Email"
        placeholder="Your Email" 
        type="email"
        className="mt-3"
        set={setEmail}
      />
      <Input
        name="Password"
        placeholder="Your Password"
        type="password"
        className="mt-3"
        set={setPassword}
      />
      <Button
        text="Sign Up"
        icon={mdiArrowRightThin}
        className="mt-3"
        loading={loading}
      />
      <div className="d-flex mt-3">
        <Link to="/" className="ms-auto">Sign In</Link>
      </div>
    </form>
  )
}

export default SignUp;