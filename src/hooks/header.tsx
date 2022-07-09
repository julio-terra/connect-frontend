import React, { useContext, createContext, useState, } from 'react';

type THeaderContext = {
  title: String;
  updateTitle(title: String): void
}

type THeaderProvider = {
  children: JSX.Element
}
const HeaderContext = createContext({} as THeaderContext)

const HeaderProvider: React.FC<THeaderProvider> = ({children}) => {
  const [title, setTitle] = useState<String>('')
  
  const updateTitle = (title: String) =>{
    setTitle(title)
  }
  return (
    <HeaderContext.Provider value={{ title, updateTitle }}>
      {children}
    </HeaderContext.Provider>
  )
}
const useHeader = () => {
  const context = useContext(HeaderContext);

  return context;
}

export { HeaderProvider, useHeader }