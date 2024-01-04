require('dotenv').config()

const stripe = require('stripe')(process.env.VITE_STRIPE_SECRET_KEY)
export async function handler(event, context) {
  if (event.body) {
    const { cart, shipping_fee, total_amount } = JSON.parse(event.body)
    // console.log(cart, shipping_fee, total_amount)
    const calculateOrderAmount = () => {
      return shipping_fee + total_amount
    }

    try {
      const paymentIntent = await stripe.paymentIntents.create({
        amount: calculateOrderAmount(),
        currency: 'INR',
      })
      return {
        statusCode: 200,
        body: JSON.stringify({ clientSecret: paymentIntent.client_secret }),
      }
    } catch (error) {
      return {
        statusCode: 500,
        body: JSON.stringify({ error: error.message }),
      }
    }
  }
  return {
    statusCode: 200,
    body: 'create-payment-intent',
  }
}
