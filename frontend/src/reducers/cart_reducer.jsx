import {
  ADD_TO_CART,
  CLEAR_CART,
  COUNT_CART_TOTALS,
  REMOVE_CART_ITEM,
  TOGGLE_CART_ITEM_AMOUNT,
} from '../actions'

const cart_reducer = (state, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      const { id, color, amount, product } = action.payload
      const tempItem = state.cart.find((i) => i.id === id + color)
      //if exist then update quantity
      if (tempItem) {
        const tempCart = state.cart.map((cartItem) => {
          if (cartItem.id === id + color) {
            let newAmount = cartItem.amount + amount
            if (newAmount > cartItem.max) {
              newAmount = cartItem.max
            }
            return { ...cartItem, amount: newAmount }
          } else {
            return cartItem
          }
        })
        return { ...state, cart: tempCart }
      } else {
        const newItem = {
          id: id + color,
          name: product.name,
          color,
          amount,
          image: product.image,
          price: product.price,
          max: product.stock,
        }
        return { ...state, cart: [...state.cart, newItem] }
      }

    case REMOVE_CART_ITEM:
      const temp_id = action.payload
      const tempCart = state.cart.filter((item) => item.id !== temp_id)

      return { ...state, cart: tempCart }

    case CLEAR_CART:
      return { ...state, cart: [] }

    case COUNT_CART_TOTALS: {
      const { total_items, total_amount } = state.cart.reduce(
        (total, cartItem) => {
          const { amount, price } = cartItem
          total.total_items += amount
          total.total_amount += price * amount

          return total
        },
        {
          total_items: 0,
          total_amount: 0,
        }
      )
      return { ...state, total_amount, total_items }
    }

    case TOGGLE_CART_ITEM_AMOUNT: {
      const { id, value } = action.payload
      const tempCart = state.cart.map((cartItem) => {
        if (cartItem.id === id) {
          if (value === 'Inc') {
            let newAmount = cartItem.amount + 1
            if (newAmount > cartItem.max) {
              newAmount = cartItem.max
            }
            return { ...cartItem, amount: newAmount }
          }
          if (value === 'Dec') {
            let newAmount = cartItem.amount - 1
            if (newAmount < 1) {
              newAmount = 1
            }
            return { ...cartItem, amount: newAmount }
          }
        } else {
          return cartItem
        }
      })

      return { ...state, cart: tempCart }
    }
  }
  // return state
  throw new Error(`No Matching "${action.type}" - action type`)
}

export default cart_reducer
