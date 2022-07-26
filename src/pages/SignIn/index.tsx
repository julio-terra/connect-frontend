import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { mdiArrowRightThin } from '@mdi/js';
import { useAuth } from '../../hooks/auth';

import Button from '../../components/Button';
import Input from '../../components/Input';

import ILogo from '../../assets/logo.png';

import './styles.css';

type Tdata = {
  email: String;
  password: String;
}
const SignIn: React.FC = () => {
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const { handleSubmit } = useForm<Tdata>();

  const onSubmit = () => signIn(email, password)

  const { signIn, loading } = useAuth();
  return (
    <form action="submit" className="col-12 col-md-10 col-lg-8 col-xl-6" onSubmit={handleSubmit(onSubmit)}>
      <div className="signin__logo">
        <img 
          src={ILogo}
          alt=""
          className="img-fluid"
        />
      </div>
      <Input
        name="Email"
        placeholder="Your Email" 
        type="email"
        className="mt-4"
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
        text="Sign In"
        icon={mdiArrowRightThin}
        className="mt-3"
        loading={loading}
      />
      <div className="d-flex mt-3">
        <Link to="/signUp" className="ms-auto">Sign Up</Link>
      </div>
    </form>
  )
}

export default SignIn;