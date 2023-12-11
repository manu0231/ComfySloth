import React, { useState } from 'react';
import { BsStarFill, BsStarHalf, BsStar } from 'react-icons/bs';

const StarRating = ({setNumRating}) => {
  const [rating, setRating] = useState(1); // State to store the selected rating

  // Function to handle click on a star
  const handleStarClick = (selectedRating) => {
    setRating(selectedRating);
    setNumRating(selectedRating)
    // console.log(props);
    // props(rating)
  };

  return (
    <div>
      {[1, 2, 3, 4, 5].map((star) => {
        let starIcon;

        // Determine which icon to display based on rating
        if (star <= rating) {
          starIcon = <BsStarFill />;
        } else if (star - 0.5 === rating) {
          starIcon = <BsStarHalf />;
        } else {
          starIcon = <BsStar />;
        }

        return (
          <span
            key={star}
            onClick={() => handleStarClick(star)}
            className='stars'
            style={{ cursor: 'pointer', fontSize: '24px', color: '#ffd700' }}
          >
            {starIcon}
          </span>
        );
      })}
      {/* <p>Selected Rating: {rating}</p> */}
    </div>
  );
};

export default StarRating;
