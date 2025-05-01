import React, { createContext ,useState } from 'react'

export const UserContext = createContext()

const UserProvider = ({children}) => {
    const [Theme, setTheme] = useState(true); // false = light, true = dark

  return (
    <UserContext.Provider value={{Theme, setTheme}}>
        {children}
    </UserContext.Provider>
  )
}

export default UserProvider;