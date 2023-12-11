import {
  LOAD_PRODUCTS,
  SET_LISTVIEW,
  SET_GRIDVIEW,
  UPDATE_SORT,
  SORT_PRODUCTS,
  UPDATE_FILTERS,
  FILTER_PRODUCTS,
  CLEAR_FILTERS,
} from '../actions'

const filter_reducer = (state, action) => {
  switch (action.type) {
    case LOAD_PRODUCTS:
      let maxPrice = action.payload.map((p) => p.price)
      maxPrice = Math.max(...maxPrice)

      let minPrice = action.payload.map((p) => p.price)
      minPrice = Math.min(...minPrice)

      return {
        ...state,
        allproducts: [...action.payload],
        filterdProducts: [...action.payload],
        filters: {
          ...state.filters,
          min_price: minPrice,
          max_price: maxPrice,
          price: maxPrice,
        },
      }
    case SET_LISTVIEW:
      return { ...state, grid_view: false }
    case SET_GRIDVIEW:
      return { ...state, grid_view: true }
    case UPDATE_SORT:
      return { ...state, sort: action.payload }
    case SORT_PRODUCTS: {
      const { sort, filterdProducts } = state
      let tempProduct = [...filterdProducts]
      if (sort === 'name-a') {
        // tempProduct = filterdProducts.sort()
        //or
        tempProduct = tempProduct.sort((a, b) => {
          return a.name.localeCompare(b.name)
        })
      }
      if (sort === 'name-z') {
        // tempProduct = filterdProducts.reverse()
        //or
        tempProduct = tempProduct.sort((a, b) => {
          return b.name.localeCompare(a.name)
        })
      }
      if (sort === 'price-lowest') {
        tempProduct = tempProduct.sort((a, b) => a.price - b.price)
      }
      if (sort === 'price-highest') {
        tempProduct = tempProduct.sort((a, b) => b.price - a.price)
      }
      return { ...state, filterdProducts: tempProduct }
    }
    case UPDATE_FILTERS:
      const { name, value } = action.payload
      return { ...state, filters: { ...state.filters, [name]: value } }

    case FILTER_PRODUCTS:
      const { allproducts: products } = state
      const { text, category, company, shipping, price, color } = state.filters
      let tempProduct = [...products]
      if (text) {
        tempProduct = tempProduct.filter((product) => {
          return product.name.toLowerCase().match(text)
        })
      }
      if (category) {
        tempProduct = tempProduct.filter((item) => {
          if (category == 'all') {
            return item
          }
          return item.category === category
        })
      }
      if (company !== 'all') {
        tempProduct = tempProduct.filter((item) => {
          return item.company === company
        })
      }
      if (color !== 'all') {
        tempProduct = tempProduct.filter((item) => {
          return item.colors.find((c) => c === color)
        })
      }

      tempProduct = tempProduct.filter((item) => {
        return item.price <= price
      })

      if (shipping) {
        tempProduct = tempProduct.filter((item) => {
          return item.price > 20000
        })
      }

      return { ...state, filterdProducts: tempProduct }

    case CLEAR_FILTERS:
      return {
        ...state,
        filters: {
          ...state.filters,
          text: '',
          company: 'all',
          category: 'all',
          color: 'all',
          price: state.filters.max_price,
          shipping: false,
        },
      }
  }
  // return state
  throw new Error(`No Matching "${action.type}" - action type`)
}

export default filter_reducer
