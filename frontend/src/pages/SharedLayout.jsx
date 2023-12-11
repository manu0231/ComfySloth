import React from 'react'

import { Outlet } from 'react-router-dom'
import { Navbar, Sidebar, Footer } from '../components'

const SharedLayout = () => {
  return (
    <>
      <Navbar />
      <Sidebar />
      <Outlet />
      <Footer />
    </>
  )
}
export default SharedLayout
