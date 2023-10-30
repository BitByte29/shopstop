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
    <div key={review.user} className="flex justify-between p-2 border-2">
      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-4">
          <div className="rounded-full bg-slate-700 w-[30px] h-[30px] flex items-center justify-center  text-white">
            <FaUser />
          </div>
          <p>{review.name}</p>
          <div className="flex items-center gap-2">
            <ReactStars {...ratingOptions} value={review.rating} size={15} />
            <span>{review.rating} </span>
          </div>
        </div>
        <p className="text-justify">{review.comment}</p>
      </div>

      <div className="flex justify-center flex-col w-[155px] min-w-[155px]">
        <div className="flex items-center justify-around w-full px-4 py-2 text-slate-700">
          <span className="cursor-pointer hover:text-green-600 ">
            <FaThumbsUp onClick={() => handleVote("like")} />
            {likes}
          </span>
          <span className="cursor-pointer hover:text-red-600">
            <FaThumbsDown onClick={() => handleVote("dislike")} />
            {dislikes}
          </span>
        </div>
        <div className="flex items-center justify-between px-4 py-2 ">
          {review.createdAt && (
            <span className="text-gray-400">
              {formatDateFromTimestamp(review.createdAt)}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default Reviews;
