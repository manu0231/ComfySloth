import React from 'react'
import styled from 'styled-components'
import { formatPrice } from '../utils/helpers'
import { FaSearch, FaTrash } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { useUserContext } from '../context/user_context'
import { useProductsContext } from '../context/products_context'

const Product = ({ image, id, name, price }) => {
  const { myUser } = useUserContext() 
  const { handleDeleteButton } = useProductsContext()
  // const handleDeleteButton = async (id) => {
  //   await axios.delete(`/api/v1/products/${id}`)
  // }
  return (
    <Wrapper>
      <div className="container">
        <img src={image} alt="" />
        <Link to={`/products/${id}`} className="link">
          <FaSearch />
        </Link>
        {myUser && myUser.role === 'admin' && (
          <button
            onClick={() => handleDeleteButton(id)}
            className=" link delete-product"
          >
            <FaTrash />
          </button>
        )}
      </div>
      <footer>
        <h5>{name}</h5>
        <p>{formatPrice(price)}</p>
      </footer>
    </Wrapper>
  )
}

const Wrapper = styled.article`
  .container {
    position: relative;
    background: var(--clr-black);
    border-radius: var(--radius);
  }
  img {
    width: 100%;
    display: block;
    object-fit: cover;
    border-radius: var(--radius);
    transition: var(--transition);
  }
  .link {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: var(--clr-primary-5);
    display: flex;
    align-items: center;
    justify-content: center;
    width: 2.5rem;
    height: 2.5rem;
    border-radius: 50%;
    transition: var(--transition);
    opacity: 0;

    cursor: pointer;
    svg {
      font-size: 1.25rem;
      color: var(--clr-white);
    }
  }

  .delete-product {
    top: 12%;
    left: 92%;
    background: none;
    border: none;
    svg {
      font-size: 1.25rem;
      color: var(--clr-red-dark);
    }
  }
  .container:hover img {
    opacity: 0.5;
  }
  .container:hover .link {
    opacity: 1;
  }
  footer {
    margin-top: 1rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  footer h5,
  footer p {
    margin-bottom: 0;
    font-weight: 400;
  }

  footer p {
    color: var(--clr-primary-5);
    letter-spacing: var(--spacing);
  }
`
export default Product
