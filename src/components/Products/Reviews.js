import React, { useState } from "react";
import { FaThumbsDown, FaStar, FaThumbsUp, FaUser } from "react-icons/fa";

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
    activeColor: "gold",
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
    <div key={review.user} className="border-2 p-2">
      <div className="flex justify-between">
        <div className="flex gap-4">
          <div className="flex items-center gap-2">
            <span className="flex-center text-white rounded-full bg-gray-500 w-8 h-8">
              <FaUser />
            </span>
            <p className="font-semibold">{review.name}</p>
          </div>
          <div className="flex items-center gap-2">
            <ReactStars
              {...ratingOptions}
              value={review.rating}
              size={window.innerWidth < 512 ? 15 : 20}
            />
            <span className="bg-green-600 text-white flex items-center p-[2px] text-sm">
              {review.rating} <FaStar />
            </span>
          </div>
        </div>

        <div className="flex gap-4 items-center"></div>
      </div>
      <p className="text-justify py-2">{review.comment}</p>
      <div className="flex justify-between">
        {review.createdAt && (
          <span className="text-gray-400">
            {formatDateFromTimestamp(review.createdAt)}
          </span>
        )}
        <div className="flex min-w-[100px] items-center mt-1 justify-around text-gray-400 text-sm ">
          <span className="cursor-pointer flex-center flex-row gap-1 hover:text-green-600 ">
            <FaThumbsUp onClick={() => handleVote("like")} />
            {likes}
          </span>
          <span className="cursor-pointer hover:text-red-600 flex-center flex-row gap-1 ">
            <FaThumbsDown onClick={() => handleVote("dislike")} />
            {dislikes}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Reviews;
