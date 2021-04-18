import React, {useState, useEffect} from 'react';

export const UserContext = React.createContext({});

export default (props) => {
  
  const [user, setUser] = useState({})

  const loginUser = ({ token, ...rest }) => {
    localStorage.setItem("token", token)
    localStorage.setItem("userName", rest.name)
    localStorage.setItem("websites", JSON.stringify(rest.websites))
    setUser({ token, isLoggedIn: true, ...rest })
  }

  const logoutUser = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("userName")
    localStorage.removeItem("websites")
    setUser({ isLoggedIn: false })
  }

  const updateUser = () => {
    if (!user.token) {
      const token = localStorage.getItem("token")
      const name = localStorage.getItem("userName")
      const websites = JSON.parse(localStorage.getItem("websites"))
      if (token) setUser({ token, name, websites, isLoggedIn: Boolean(token) })
    }
  }

  const updateUserWebsites = (websites) => {
    localStorage.setItem("websites", JSON.stringify(websites))
    setUser({ ...user, websites })
  }

  return (
    <UserContext.Provider value={{ ...user, logoutUser, loginUser, updateUser, updateUserWebsites }}>
      {props.children}
    </UserContext.Provider>
  )
}
