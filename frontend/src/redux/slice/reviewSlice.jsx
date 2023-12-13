import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { useSelector } from 'react-redux'

export const fetchReviews = createAsyncThunk('fetchReviews', async () => {
  // const response = await fetch('../../reviews.json') // Update the path accordingly
  console.log('fetch reviews');
  const response = await fetch('/api/v1/review') // Update the path accordingly
  // const response = await fetch('https://jsonplaceholder.typicode.com/posts'); // Update the path accordingly
  return response.json()
})

const initialState = {
  isLoading: false,
  reviews: [],
  error: null,
}

const reviewSlice = createSlice({
  name: 'review',
  initialState: initialState,
  reducers: {
    addReview: (state, action) => {
      const newReview = action.payload
      state.reviews.push(newReview)
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchReviews.pending, (state, action) => {
      state.isLoading = true
    })
    builder.addCase(fetchReviews.fulfilled, (state, action) => {
      state.isLoading = false
      state.reviews = action.payload
    })
    builder.addCase(fetchReviews.rejected, (state, action) => {
      console.log('Error', action.payload)
      state.error = action.payload
    })
  },
})

export const { addReview } = reviewSlice.actions
export default reviewSlice.reducer
