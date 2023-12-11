import React, { useContext, useEffect, useState } from 'react'

import { useAuth0 } from '@auth0/auth0-react'
import axios from 'axios'
// import { showCurrentUser as url } from '../utils/constants'

const UserContext = React.createContext()

export const UserProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true)
  const [myUser, setMyUser] = useState(null)
  // const { loginWithRedirect, logout, user } = useAuth0()

  const saveUser = (user) => {
    setMyUser(user)
  }

  const removeUser = () => {
    setMyUser(null)
  }

  const logout = async () => {
    try {
      await axios.get('/api/v1/auth/logout')
      removeUser()
    } catch (error) {
      console.log(error)
    }
  }
  const fetchUser = async () => {
    try {
      const { data } = await axios.get('/api/v1/user/showme')
      saveUser(data.user)
    } catch (error) {
      // console.log(error)
      removeUser()
    }
    setIsLoading(false)
  }
  useEffect(() => {
    fetchUser()
  }, [])

  return (
    // <UserContext.Provider value={{ loginWithRedirect, logout, myUser }}>
    <UserContext.Provider value={{ isLoading, saveUser, myUser, logout }}>
      {children}
    </UserContext.Provider>
  )
}
// make sure use
export const useUserContext = () => {
  return useContext(UserContext)
}
