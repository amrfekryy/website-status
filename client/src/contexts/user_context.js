import React, {useState, useEffect} from 'react';

export const UserContext = React.createContext({});

export default (props) => {
  
  const [user, setUser] = useState({})

  const loginUser = ({ token, userName }) => {
    localStorage.setItem("token", token)
    localStorage.setItem("userName", userName)
    setUser({ token, userName, isLoggedIn: true })
  }

  const logoutUser = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("userName")
    setUser({ isLoggedIn: false })
  }

  const updateUser = () => {
    if (!user.token) {
      const token = localStorage.getItem("token")
      const userName = localStorage.getItem("userName")
      setUser({ token, userName, isLoggedIn: Boolean(token) })
    }
  }

  return (
    <UserContext.Provider value={{ ...user, logoutUser, loginUser, updateUser }}>
      {props.children}
    </UserContext.Provider>
  )
}
