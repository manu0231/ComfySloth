// Review.js
import React from 'react'
import {

  Stars,

} from '../components'
const Review = ({review}) => {
  const { id, comment, rating, title } = review
  return (
    <div >
      <h4>{title}</h4>
      <p>{comment}</p>
      <Stars rating={rating} />
    </div>
  )
}

export default Review
