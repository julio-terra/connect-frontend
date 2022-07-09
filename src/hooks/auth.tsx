import React, { useContext, createContext, useState, } from 'react';
import { isExpired } from "react-jwt";
import { toast } from 'react-toastify';
import api from '../services/axios';


type TAuthContext = {
  user: TUser;
  loading: boolean;
  signIn(email: String, password: String): void;
  signUp(displayName: String, email: String, password: String): void;
  signed: boolean;
  signOut: () => void;
  updateUserName(user_id: String, userName: String): void
}

type TAuthProvider = {
  children: JSX.Element
}
type TUser = {
  displayName?: String;
  userName?: String;
  _id?: String
}
const AuthContext = createContext({} as TAuthContext)

const AuthProvider: React.FC<TAuthProvider> = ({children}) => {
  const [user, setUser] = useState<TUser>(() =>{
    const User = localStorage.getItem('@auth/user') || '{}';

    return JSON.parse(User);
  });
  const [signed, setSigned] = useState(() => {
    const token = localStorage.getItem('@auth/token');
    
    if(!token){
      return false
    }
    console.log(
      !isExpired(token)
    )
    return !isExpired(token)
  })
  const [loading, setLoading] = useState<boolean>(false);
  
  const signIn = async (email: String, password: String) =>{
    setLoading(true)
    const response = await api.post("/users/session", { email, password });
    if(response.data.error){
      setLoading(false);
      return toast.error(response.data.message);
    }
    localStorage.setItem('@auth/user',JSON.stringify(response.data.user));
    localStorage.setItem('@auth/token',JSON.stringify(response.data.accessToken));
    setUser(response.data.user)
    setSigned(response.data.accessToken)
    setLoading(false);
  }
  const signUp = async (displayName: String, email: String, password: String) =>{
    setLoading(true);
    const response = await api.post("/users/register", { displayName, email, password });
    if(response.data.error){
      setLoading(false);
      return toast.error(response.data.message);
    }
    setLoading(false)
    return signIn(email, password);
  }
  const signOut  = () =>{
    localStorage.removeItem('@auth/user');
    localStorage.removeItem('@auth/token');
    setUser({})
    setSigned(false)
  }
  const updateUserName = async (user_id: String, userName: String) =>{
    const validate = / /i.test(userName.toString())
    if(validate){
      return toast.error("whitespace is not allowed in the text");
    }
    const response = await api.put(`/users/updateBody/${user_id}`, { userName: `@${userName}` })
    if(response?.data.error){
      return toast.error(response.data.message);
    }
    localStorage.setItem('@auth/user', JSON.stringify(response.data.user));
    setUser(response.data.user);
    return toast.success(response.data.message);
  }
  return (
    <AuthContext.Provider value={{ user, loading, signIn, signUp, signed, signOut, updateUserName}}>
      {children}
    </AuthContext.Provider>
  )
}
const useAuth = () => {
  const context = useContext(AuthContext);

  return context;
}

export { AuthProvider, useAuth }