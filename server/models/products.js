const mongoose = require('mongoose')

const productSchema = new mongoose.Schema(
  {
    // name,price,featured,rating,company
    name: {
      type: String,
      required: [true, 'Please Provide name'],
      maxlength: 20,
    },
    price: {
      type: Number,
      required: [true, 'Please provide Price of Product'],
    },
    image: {
      type: String,
      default: '/uploads/example.jpeg',
    },
    colors: {
      type: [String],
      default: '#fff',
    },
    category: {
      type: String,
    },
    featured: {
      type: Boolean,
      default: false,
    },
    stock: {
      type: Number,
      default: 0,
    },
    description: {
      type: String,
      default: 'Not Available',
    },
    rating: {
      type: Number,
      default: 4.5,
    },
    company: {
      type: String,
      required: true,
      enum: {
        values: ['ikea', 'liddy', 'caressa', 'marcos'],
        message: `{VALUE} is not supported`,
      },
    },
    averageRating: {
      type: Number,
      default: 0,
    },
    numOfReviews: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
)

productSchema.virtual('reviews', {
  ref: 'Review',
  localField: '_id',
  foreignField: 'product',
  justOne: false,
})

productSchema.pre('remove', async function () {
  await this.model('Review').deleteMany({ product: this._id })
})

module.exports = mongoose.model('Products', productSchema)
