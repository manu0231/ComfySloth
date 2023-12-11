// Review.js
import React from 'react'
import {

  Stars,

} from '../components'
const Review = ({ review }) => {
  return (
    <div >
      <h4>{review.title}</h4>
      <p>{review.comment}</p>
      <Stars rating={review.rating} />
    </div>
  )
}

export default Review
