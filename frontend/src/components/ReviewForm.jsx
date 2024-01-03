import React, { useState } from 'react'
import StarRating from './starRating'
import { useParams } from 'react-router-dom'

import axios from 'axios'
// import { addReview } from '../redux/slice/reviewSlice'

const ReviewForm = () => {
  const { id } = useParams()

  const [formData, setFormData] = useState({
    title: '',
    comment: '',
    rating: 0,
    product: id,
  })

  const addReviews = async () => {
    try {
      const response = await axios.post(`/api/v1/review`, formData)
      // console.log(response.data)

      //setup local State for success
    } catch (error) {
      console.error('Error adding review:', error)
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    await addReviews()
    console.log({ ...formData })
    setFormData({
      title: '',
      comment: '',
      rating: 0,
      product: id,
    })
  }

  return (
    <form onSubmit={handleSubmit} className="form section review-align">
      <hr />
      <h4 className="reviews">Add Reviews</h4>
      <div className="form-row">
        <span className="form-label">
          Title:
          <input
            className="form-input"
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
          />
        </span>
      </div>
      <div className="form-row">
        <span>
          Comment:
          <textarea
            className="form-textarea"
            name="comment"
            value={formData.comment}
            onChange={handleChange}
          />
        </span>
      </div>
      <div className="form-row">
        <span className="form-label">Rating</span>
        <StarRating
          setNumRating={(value) =>
            setFormData((prevData) => ({ ...prevData, rating: value }))
          }
        />
      </div>
      <button type="submit" className="btn">
        Submit Review
      </button>
    </form>
  )
}

export default ReviewForm
