import React, { useState } from "react";
import { FaThumbsDown, FaThumbsUp, FaUser } from "react-icons/fa";

import ReactStars from "react-rating-stars-component";
import { useDispatch } from "react-redux";
// import { toast } from "react-toastify";
import { voteReview } from "../../App/features/productSlice";
import { formatDateFromTimestamp } from "../../utils/functions";

const Reviews = ({ review, productId }) => {
  const [likes, setLikes] = useState(review.likes);
  const [dislikes, setDislikes] = useState(review.dislikes);
  const dispatch = useDispatch();
  const ratingOptions = {
    edit: false,
    activeColor: "tomato",
    size: 25,
    isHalf: true,
  };

  const handleVote = (vote) => {
    const anObject = {
      productId,
      reviewId: review._id,
      like: vote === "like",
    };
    if (vote === "like") {
      setLikes(likes + 1);
    } else {
      setDislikes(dislikes + 1);
    }
    dispatch(voteReview(anObject));
  };
  return (
    <div key={review.user} className="relative px-2 py-2 border-2">
      <div className="absolute bottom-0 right-0 flex items-center justify-between w-[100px] px-4 py-2 ">
        <span className="cursor-pointer hover:text-green-600">
          <FaThumbsUp onClick={() => handleVote("like")} />
          {likes}
        </span>
        <span className="cursor-pointer hover:text-red-600">
          <FaThumbsDown onClick={() => handleVote("dislike")} />
          {dislikes}
        </span>
      </div>
      <div className="absolute top-0 right-0 flex items-center justify-between px-4 py-2 ">
        {review.createdAt && (
          <span>Created At: {formatDateFromTimestamp(review.createdAt)}</span>
        )}
      </div>
      <div className="flex items-center gap-2">
        <div className="rounded-full bg-slate-700 w-[30px] h-[30px] flex items-center justify-center  text-white">
          <FaUser />
        </div>
        <p>{review.name}</p>
      </div>

      <div className="flex items-center gap-2">
        <ReactStars {...ratingOptions} value={review.rating} size={15} />
        <span>{review.rating} </span>
      </div>

      <p>{review.comment}</p>
    </div>
  );
};

export default Reviews;
