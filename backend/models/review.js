const mongoose = require('mongoose')

const reviewSchema = new mongoose.Schema(
  {
    //rating title comment user product timestamps
    rating: {
      type: Number,
      required: [true, 'Please provide rating'],
      min: 1,
      max: 5,
    },
    title: {
      type: String,
      trim: true,
      required: [true, 'please provide title'],
      maxlength: 200,
    },
    comment: {
      type: String,
    
    
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: true,
    },
    product: {
      type: mongoose.Schema.ObjectId,
      ref: 'Products',
      required: true,
    },
  },
  {
    timestamps: true,
  }
)

reviewSchema.statics.calculateAvgRating = async function (productID) {
  const result = await this.aggregate([
    { $match: { product: productID } },
    {
      $group: {
        _id: null,
        averageRating: { $avg: '$rating' },
        numOfReviews: { $sum: 1 },
      },
    },
  ])
  try {
    await this.model('Products').findOneAndUpdate(
      { _id: productID },
      {
        averageRating: Math.ceil(result[0]?.averageRating || 0),
        numOfReviews: result[0]?.numOfReviews || 0,
      }
    )
  } catch (error) {
    console.log(error)
  }
}

reviewSchema.post('save', async function () {
  await this.constructor.calculateAvgRating(this.product)
})
reviewSchema.post('remove', async function () {
  await this.constructor.calculateAvgRating(this.product)
})

module.exports = mongoose.model('Review', reviewSchema)
