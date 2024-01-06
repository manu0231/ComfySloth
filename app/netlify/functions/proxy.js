// proxy.js

import axios from 'axios'

exports.handler = async function (event, context) {
  try {
    // Forward the request to the target API
    const response = await axios({
      method: event.httpMethod,
      url: `https://storeserver-production-bc7e.up.railway.app${event.path}`,
      headers: event.headers,
      data: event.body,
    })

    // Return the response from the target API
    return {
      statusCode: response.status,
      body: JSON.stringify(response.data),
      headers: response.headers,
    }
  } catch (error) {
    // Handle errors gracefully
    return {
      statusCode: error.response.status || 500,
      body: JSON.stringify({
        error: error.message,
      }),
    }
  }
}
