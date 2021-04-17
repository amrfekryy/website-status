import React, {useState, useEffect} from 'react';

export const UserContext = React.createContext({});

export default (props) => {
  
  const [user, setUser] = useState({})

  const loginUser = ({ token, userId, userName }) => {
    // console.log({ token, userId, userName })
    localStorage.setItem("token", token)
    localStorage.setItem("userId", userId)
    localStorage.setItem("userName", userName)
    setUser({ token, userId, userName, isLoggedIn: true })
  }

  const logoutUser = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("userId")
    localStorage.removeItem("userName")
    setUser({ isLoggedIn: false })
  }

  // useEffect(() => {
  //   const token = localStorage.getItem("token")
  //   const userId = localStorage.getItem("userId")
  //   const userName = localStorage.getItem("userName")
  //   // setUser({ token, userId, userName, isLoggedIn: token ? true : false });
  // })

  return (
    <UserContext.Provider value={{ ...user, logoutUser, loginUser }}>
      {props.children}
    </UserContext.Provider>
  )
}
