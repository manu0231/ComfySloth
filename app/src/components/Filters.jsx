import React, { useEffect } from 'react'
import styled from 'styled-components'
import { useFilterContext } from '../context/filter_context'
import { getUniqueValues, formatPrice } from '../utils/helpers'
import { FaCheck } from 'react-icons/fa'

const Filters = () => {
  const {
    updateFilter,
    allproducts,
    clearFilter,
    filters: {
      text,
      category,
      color,
      company,
      min_price,
      max_price,
      price,
      shipping,
    },
  } = useFilterContext()

  const categories = getUniqueValues(allproducts, 'category')
  const companies = getUniqueValues(allproducts, 'company')
  const colors = getUniqueValues(allproducts, 'colors')

  // console.log(colors)
  return (
    <Wrapper>
      <div className="content">
        <form onChange={updateFilter} onSubmit={(e) => e.preventDefault()}>
          {/* search input */}
          <div className="form-control">
            <input
              type="text"
              name="text"
              className="search-input"
              placeholder="Search"
              value={text}
              onChange={updateFilter}
            />
          </div>

          {/* category */}
          <div className="form-control">
            <h5>Category </h5>
            {categories.map((c, index) => {
              return (
                <button
                  type="button"
                  key={index}
                  name="category"
                  className={`${
                    category === c.toLowerCase() ? 'active' : null
                  }`}
                  onClick={updateFilter}
                >
                  {c}
                </button>
              )
            })}
          </div>
          {/* company */}
          <div className="form-control">
            <h5>Company </h5>
            <select id="" className="company" name="company">
              {companies.map((company, index) => {
                return (
                  <option key={index} value={company} onClick={updateFilter}>
                    {company}
                  </option>
                )
              })}
            </select>
          </div>
          {/* color */}
          <div className="form-control">
            <h5>Colors</h5>
            <div className="colors">
              {colors.map((c, index) => {
                if (c === 'all') {
                  return (
                    <button
                      key={index}
                      name="color"
                      onClick={updateFilter}
                      data-color="all"
                      className={`${
                        color === 'all' ? 'all-btn active' : 'all-btn'
                      }`}
                    >
                      all
                    </button>
                  )
                }
                return (
                  <button
                    style={{ background: c }}
                    key={index}
                    name="color"
                    className={`${
                      color === c ? 'color-btn active' : 'color-btn'
                    }`}
                    data-color={c}
                    onClick={updateFilter}
                  >
                    {color === c ? <FaCheck /> : null}
                  </button>
                )
              })}
            </div>
          </div>
          {/* price range */}
          <div className="form-control">
            <label htmlFor="price">
              <h5>price</h5>
            </label>
            <p className="price">{formatPrice(price)}</p>
            <input
              type="range"
              name="price"
              min={min_price}
              max={max_price}
              value={price}
              onChange={updateFilter}
            />
          </div>
          {/* free shipping */}
          <div className="form-control shipping">
            <label htmlFor="shipping">
              <h5>Free Shipping</h5>
            </label>
            <input
              type="checkbox"
              name="shipping"
              id="shipping"
              onChange={updateFilter}
              checked={shipping}
            />
          </div>
        </form>
        <button type="button" className="clear-btn" onClick={clearFilter}>
          Clear filters
        </button>
      </div>
    </Wrapper>
  )
}
  
const Wrapper = styled.section`
  .form-control {
    margin-bottom: 1.25rem;
    h5 {
      margin-bottom: 0.5rem;
    }
  }
  .search-input {
    padding: 0.5rem;
    background: var(--clr-grey-10);
    border-radius: var(--radius);
    border-color: transparent;
    letter-spacing: var(--spacing);
  }
  .search-input::placeholder {
    text-transform: capitalize;
  }

  button {
    display: block;
    margin: 0.25em 0;
    padding: 0.25rem 0;
    text-transform: capitalize;
    background: transparent;
    border: none;
    border-bottom: 1px solid transparent;
    letter-spacing: var(--spacing);
    color: var(--clr-grey-5);
    cursor: pointer;
  }
  .active {
    border-color: var(--clr-grey-5);
  }
  .company {
    background: var(--clr-grey-10);
    border-radius: var(--radius);
    border-color: transparent;
    padding: 0.25rem;
  }
  .colors {
    display: flex;
    align-items: center;
  }
  .color-btn {
    display: inline-block;
    width: 1rem;
    height: 1rem;
    border-radius: 50%;
    background: #222;
    margin-right: 0.5rem;
    border: none;
    cursor: pointer;
    opacity: 0.5;
    display: flex;
    align-items: center;
    justify-content: center;
    svg {
      font-size: 0.5rem;
      color: var(--clr-white);
    }
  }
  .all-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 0.5rem;
    opacity: 0.5;
  }
  .active {
    opacity: 1;
  }
  .all-btn .active {
    text-decoration: underline;
  }
  .price {
    margin-bottom: 0.25rem;
  }
  .shipping {
    display: grid;
    grid-template-columns: auto 1fr;
    align-items: center;
    text-transform: capitalize;
    column-gap: 0.5rem;
    font-size: 1rem;
    max-width: 200px;
  }
  .clear-btn {
    background: var(--clr-red-dark);
    color: var(--clr-white);
    padding: 0.25rem 0.5rem;
    border-radius: var(--radius);
  }
  @media (min-width: 768px) {
    .content {
      position: sticky;
      top: 1rem;
    }
  }
`

export default Filters
