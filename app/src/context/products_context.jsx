import axios from 'axios'
import React, { useContext, useEffect, useReducer } from 'react'
import reducer from '../reducers/products_reducer'
import { products_url as url } from '../utils/constants'
import {
  SIDEBAR_OPEN,
  SIDEBAR_CLOSE,
  GET_PRODUCTS_BEGIN,
  GET_PRODUCTS_SUCCESS,
  GET_PRODUCTS_ERROR,
  GET_SINGLE_PRODUCT_BEGIN,
  GET_SINGLE_PRODUCT_SUCCESS,
  GET_SINGLE_PRODUCT_ERROR,
} from '../actions'

const initialState = {
  isSidebarOpen: false,
  products_loading: false,
  products_error: false,
  products: [],
  featured_products: [],
  single_product_loading: false,
  single_product_error: false,
  single_product: {},
}

const ProductsContext = React.createContext()

const ProductsProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  const OpenSidebar = () => {
    dispatch({ type: SIDEBAR_OPEN })
  }
  const CloseSidebar = () => {
    dispatch({ type: SIDEBAR_CLOSE })
  }

  const fetchProducts = async () => {
    dispatch({ type: GET_PRODUCTS_BEGIN })
    try {
      const response = await axios(`/api/v1/products`)
      // console.log(response.data)
      const products = response.data.products
      dispatch({ type: GET_PRODUCTS_SUCCESS, payload: products })
    } catch (error) {
      dispatch({ type: GET_PRODUCTS_ERROR })
    }
  }

  const fetchSingleProduct = async (id) => {
    dispatch({ type: GET_SINGLE_PRODUCT_BEGIN })
    try {
      const response = await axios(`/api/v1/products/${id}`)
      const products = response.data.products
      dispatch({ type: GET_SINGLE_PRODUCT_SUCCESS, payload: products })
    } catch (error) {
      dispatch({ type: GET_SINGLE_PRODUCT_ERROR })
    }
  }

  const handleDeleteButton = async (id) => {
    await axios.delete(`/api/v1/products/${id}`)
    fetchProducts()
  }

  useEffect(() => {
    fetchProducts(`${url}`)
  }, [])

  // fetchSingleProduct(url,"63a5bf40c57687c2dc844763")
  return (
    <ProductsContext.Provider
      value={{
        ...state,
        OpenSidebar,
        CloseSidebar,
        fetchSingleProduct,
        handleDeleteButton,
      }}
    >
      {children}
    </ProductsContext.Provider>
  )
}
// make sure use
const useProductsContext = () => {
  return useContext(ProductsContext)
}

export { useProductsContext, ProductsProvider }
