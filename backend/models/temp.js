[
    {
      '$match': {
        'product': new ObjectId('638377d6f479014ec62e7dd3')
      }
    }, {
      '$group': {
        '_id': '', 
        'averageRating': {
          '$avg': '$rating'
        }, 
        'numOfReviews': {
          '$sum': 1
        }
      }
    }
  ]