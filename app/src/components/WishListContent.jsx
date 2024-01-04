import React from 'react'
import styled from 'styled-components'
import { useCartContext } from '../context/cart_context'
import { Link } from 'react-router-dom'

import { WishListItem, WishListColumn } from '../components'
// import CartItem from './CartItem'

const WishListContent = () => {
  const { wishlist, clearWishlist } = useCartContext()
  return (
    <Wrapper className="section section-center">
      <WishListColumn />
      {wishlist.map((item) => {
        console.log(item)
        return <WishListItem key={item.id} {...item} />
      })}
      <hr />
      <div className="link-container">
        <Link to="/products" className="link-btn">
          Continue Shopping
        </Link>
        <button
          type="button"
          className="link-btn clear-btn"
          onClick={() => clearWishlist()}
        >
          Clear WishList
        </button>
      </div>
    </Wrapper>
  )
}
const Wrapper = styled.section`
  .link-container {
    display: flex;
    justify-content: space-between;
    margin-top: 2rem;
  }
  .link-btn {
    background: transparent;
    border-color: transparent;
    text-transform: capitalize;
    padding: 0.25rem 0.5rem;
    background: var(--clr-primary-5);
    color: var(--clr-white);
    border-radius: var(--radius);
    letter-spacing: var(--spacing);
    font-weight: 400;
    cursor: pointer;
  }
  .clear-btn {
    background: var(--clr-black);
  }
`
export default WishListContent
