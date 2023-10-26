import React from "react";

const ReviewList = ({ productId }) => {
  const reviews = {};
  return reviews.length > 0 ? (
    <div className="flex flex-col gap-5">
      {reviews.map((review) => {
        return (
          //   <Reviews key={review._id} review={review} productId={productId} />
          <p>hi</p>
        );
      })}
    </div>
  ) : (
    <p>No reviews yet.</p>
  );
};

export default ReviewList;
