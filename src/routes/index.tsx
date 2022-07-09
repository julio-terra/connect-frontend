import { useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "../hooks/auth";

import AuthLayout from "../Layouts/AuthLayout";
import DefaultLayout from "../Layouts/DefaultLayout";
import Sigin from '../pages/SignIn';
import SignUp from "../pages/SignUp";
import UserName from '../pages/UserName'
import User from "../pages/User";
  
const CRoutes = () => {
  /* useEffect(() =>{
    signOut();
  }, []) */
  const { signed, user, signOut } = useAuth();
  if(!signed){
    return(
      <BrowserRouter>
        <AuthLayout>
          <Routes>
            <Route path='*' element={<Navigate to="/" />} />
            <Route path="/" element={<Sigin />} />
            <Route path="/signUp" element={<SignUp />} />
          </Routes>
        </AuthLayout>
      </BrowserRouter>
    )
  }else{
    if(!user.userName){
      return (
        <AuthLayout>
          <UserName />
        </AuthLayout>
      )
    }else{
      return(
        <BrowserRouter>
          <DefaultLayout>
            <Routes>
              <Route path='*' element={<h1></h1>} />
              <Route path="/user/:id" element={<User />} />
            </Routes>
          </DefaultLayout>
        </BrowserRouter>
      )
    }
  }
};
export default CRoutes;