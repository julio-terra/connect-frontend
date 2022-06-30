import React from 'react';
import Button from '../../components/Button';
import Input from '../../components/Input';
import './styles.css';

const SignIn: React.FC = () => {
  return (
    <div className="container d-flex justify-content-center align-items-center page">
      <img 
        src="" 
        alt=""
      />
      <form action="submit" className="col-6">
        <Input 
          placeholder="Your Email" 
          type="email"
        /> 
        <Input 
          placeholder="Your Password"
          type="password"
        /> 
        <Button text="Sign In" icon="material-icons" />
      </form>
    </div>
  )
}

export default SignIn;