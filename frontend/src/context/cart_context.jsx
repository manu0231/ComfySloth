import React, { useEffect, useContext, useReducer } from 'react'
import reducer from '../reducers/cart_reducer'
import {
  ADD_TO_CART,
  REMOVE_CART_ITEM,
  TOGGLE_CART_ITEM_AMOUNT,
  CLEAR_CART,
  COUNT_CART_TOTALS,
  ADD_TO_WISHLIST,
  REMOVE_WISHLIST_ITEM,
  TOGGLE_WISHLIST_ITEM_AMOUNT,
  CLEAR_WISHLIST,
  COUNT_WISHLIST_TOTALS,
} from '../actions'

const getLocalStorage = () => {
  return localStorage.getItem('cart')
    ? JSON.parse(localStorage.getItem('cart'))
    : []
}

const getWishListStorage = () => {
  return localStorage.getItem('wishlist')
    ? JSON.parse(localStorage.getItem('wishlist'))
    : []
}
const initialState = {
  cart: getLocalStorage(),
  total_items: 0,
  total_amount: 0,
  shipping_fee: 534,

  wishlist: getWishListStorage(),
  itemExisted: false,
}

const CartContext = React.createContext()

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  //add item
  const addCartItem = (id, amount, color, product) => {
    dispatch({
      type: ADD_TO_CART,
      payload: { id, amount, color, product },
    })
  }
  // remove Item
  const removeCartItem = (id) => {
    dispatch({ type: REMOVE_CART_ITEM, payload: id })
  }

  //toggle amount
  const toggleAmount = (id, value) => {
    dispatch({ type: TOGGLE_CART_ITEM_AMOUNT, payload: { id, value } })
  }

  //clear Cart
  const clearCart = () => {
    dispatch({ type: CLEAR_CART })
  }

  //wishlist start
  const addToWishlist = (id, amount, color, product) => {
    dispatch({
      type: ADD_TO_WISHLIST,
      payload: { id, amount, color, product },
    })
  }

  // Remove item from wishlist
  const removeWishlistItem = (id) => {
    dispatch({ type: REMOVE_WISHLIST_ITEM, payload: id })
  }

  // Toggle amount in wishlist
  const toggleWishlistAmount = (id, value) => {
    dispatch({ type: TOGGLE_WISHLIST_ITEM_AMOUNT, payload: { id, value } })
  }

  const itemExistedInWishList = (id) => {
    dispatch({ type: 'ITEM_EXISTED_IN_WISHLIST', payload: { id } })
  }

  // Clear wishlist
  const clearWishlist = () => {
    dispatch({ type: CLEAR_WISHLIST })
  }

  //wishlist end
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(state.cart))
    dispatch({ type: COUNT_CART_TOTALS })
  }, [state.cart])

  useEffect(() => {
    localStorage.setItem('wishlist', JSON.stringify(state.wishlist))
  }, [state.wishlist])

  return (
    <CartContext.Provider
      value={{
        ...state,
        addCartItem,
        removeCartItem,
        clearCart,
        toggleAmount,
        addToWishlist,
        removeWishlistItem,
        toggleWishlistAmount,
        clearWishlist,
        itemExistedInWishList,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}
// make sure use
export const useCartContext = () => {
  return useContext(CartContext)
}
