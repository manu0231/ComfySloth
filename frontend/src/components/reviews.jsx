// Reviews.js
import React, { useState, useEffect } from 'react'
import Review from './singleReview'
import Loading from './Loading'
import { useProductsContext } from '../context/products_context'

const Reviews = () => {
  const { single_product: product } = useProductsContext()
  const { reviews } = product
  return (
    <div className="section-center">
      <h2>Reviews</h2>

      {reviews ? (
        reviews.length > 0 ? (
          reviews.map((item) => {
            const { _id: id, comment, rating, title } = item // Destructure inside the map

            return <Review key={id} review={{ id, comment, rating, title }} />
          })
        ) : (
          <p>No reviews available</p>
        )
      ) : (
        <Loading />
      )}
    </div>
  )
}

export default Reviews
