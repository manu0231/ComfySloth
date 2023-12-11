// ReviewForm.js
import React, { useState } from 'react'
import StarRating from './starRating'



const ReviewForm = ({ addReview }) => {
  const [title, setTitle] = useState(''); // Fix typo in variable name

  const [comment, setComment] = useState('')
  const [rating,setNumRating] = useState(0)

  const handleSubmit = (e) => {
    e.preventDefault()
    // addReview({ title, comment })
    console.log(title);
    console.log(comment);
    console.log(rating);
    setTitle('')
    setNumRating(0)
    setComment('')
  }

  return (
    <form onSubmit={handleSubmit} className='form section-center review-align'>
           <h4>Add Reviews</h4>
           <div className="form-row">
      <span className='form-label '>
        Title:
        <input
             className='form-input'
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </span>
      </div>
      <div className="form-row">
      <span>
        Comment:
        <textarea
        className='form-textarea'
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
      </span>
      <div className="form-row">
        <span className="form-label">
          Rating
        </span>
        <StarRating setNumRating={setNumRating}/>
      </div>
      </div>
      <button type="submit" className='btn'>Submit Review</button>
    </form>
  )
}

export default ReviewForm
