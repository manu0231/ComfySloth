// Reviews.js
import React, { useState, useEffect } from 'react'
import Review from './singleReview'

const Reviews = () => {
  const [reviews, setReviews] = useState([])

  useEffect(() => {
    // Fetch reviews from the local JSON file
    fetchReviews()
  }, [])

  const fetchReviews = async () => {
    try {
      const response = await fetch('../../reviews.json') // Update the path accordingly
      const data = await response.json()
      setReviews(data)
    } catch (error) {
      console.error('Error fetching reviews:', error)
    }
  }

  return (
    <div className="section-center">
      <h2>Reviews</h2>
      {reviews.map((review, index) => (
        <Review key={index} review={review} />
      ))}
    </div>
  )
}

export default Reviews
