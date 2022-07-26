import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "../hooks/auth";

import AuthLayout from "../Layouts/AuthLayout";
import DefaultLayout from "../Layouts/DefaultLayout";
import Sigin from '../pages/SignIn';
import SignUp from "../pages/SignUp";
import UserName from '../pages/UserName'
import Home from "../pages/Home";
import User from "../pages/User";
import Post from "../pages/Post";
  
const CRoutes = () => {
  const { signed, user } = useAuth();
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
              <Route path='*' element={<Navigate to="/" />} />
              <Route path="/" element={<Home />} />
              <Route path="/user/:id/profile" element={<User />} />
              <Route path="/user/:user_id/post/:id" element={<Post />} />
            </Routes>
          </DefaultLayout>
        </BrowserRouter>
      )
    }
  }
};
export default CRoutes;