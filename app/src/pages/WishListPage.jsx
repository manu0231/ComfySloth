import React from 'react'
import styled from 'styled-components'
import { useCartContext } from '../context/cart_context'
import { Link } from 'react-router-dom'
import { WishListContent, PageHero } from '../components'

const WishListPage = () => {
  const { wishlist } = useCartContext()
  if (wishlist.length < 1) {
    return (
      <Wrapper className="page-100">
        <div className="empty">
          <h2>Your Wishlist is Empty</h2>
          <Link to="/products" className="btn">
            Back to Products
          </Link>
        </div>
      </Wrapper>
    )
  }
  return (
    <main>
      <PageHero title="wishlist" />
      <Wrapper className="page">
        <WishListContent />
      </Wrapper>
    </main>
  )
}

const Wrapper = styled.main`
  .empty {
    text-align: center;
    h2 {
      margin-bottom: 1rem;
      text-transform: none;
    }
  }
`

export default WishListPage
