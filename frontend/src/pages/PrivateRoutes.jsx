import React from 'react'
import { Outlet, Navigate } from 'react-router-dom'
import { useAuth0 } from '@auth0/auth0-react'
// will remove later
import { useUserContext } from '../context/user_context'

const PrivateRoutes = ({ children }) => {
  const { myUser } = useUserContext()
  const { user } = useAuth0()

  return myUser ? children : <Navigate to="/" />
}
export default PrivateRoutes
