import { useState } from 'react'
import { useAuth0 } from '@auth0/auth0-react'
import styled from 'styled-components'

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import {
  Home,
  About,
  Products,
  SingleProduct,
  Error,
  SharedLayout,
  Cart,
  CheckoutPage,
  PrivateRoutes,
  Login,
  Register,
  ForgotPassword,
  ResetPasswordForm,
  VerifyPage,
  WishListPage
} from './pages'

function App() {
  const { isLoading, error } = useAuth0()
  if (isLoading) {
    return (
      <Wrapper>
        <h1>Loading...</h1>
      </Wrapper>
    )
  }
  if (error) {
    return (
      <Wrapper>
        <h1>{error.message}</h1>
      </Wrapper>
    )
  }
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SharedLayout />}>
          <Route index element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPasswordForm />} />
          <Route path="/verify-email" element={<VerifyPage />} />
          <Route path="/about" element={<About />} />
          <Route path="/products" element={<Products />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/wishlist" element={<WishListPage />} />
          <Route path="/products/:id" element={<SingleProduct />} />
          <Route
            path="/checkout"
            element={
              <PrivateRoutes>
                <CheckoutPage />
              </PrivateRoutes>
            }
          />

          <Route path="*" element={<Error />} />
        </Route>
      </Routes>
    </Router>
  )
}

const Wrapper = styled.section`
  min-height: 100vh;
  display: grid;
  place-items: center;
`

export default App
