import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaSearch, FaTrash, FaStar } from "react-icons/fa";
import { deleteReview, getProductReviews } from "../../App/features/adminSlice";
import Loader from "../subs/Loader";

const Reviews = () => {
  const dispatch = useDispatch();
  const [productId, setProductId] = useState("");
  const { reviews, loading, productReview } = useSelector((s) => s.admin);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(getProductReviews({ productId }));
  };

  return (
    <>
      <h1 className="text-center text-4xl font-semibold  text-slate-700 py-12">
        Reviews
      </h1>
      <form
        action=""
        className="shadow-none flex-center"
        onSubmit={handleSubmit}
      >
        <div className="flex bg-white rounded-full pl-5 overflow-hidden w-[300px]">
          <input
            type="text"
            placeholder="Enter Product Id"
            className="focus:outline-none px-2 py-3 w-[250px]"
            value={productId}
            onChange={(e) => setProductId(e.target.value)}
          />
          <button type="submit" className="focus:outline-none">
            <FaSearch />
          </button>
        </div>
      </form>

      {loading ? (
        <Loader />
      ) : (
        <>
          {reviews.length > 0 ? (
            <>
              <div>
                <h2 className="my-12 text-2xl text-slate-600">
                  Reviews for{" "}
                  <span className="font-semibold text-3xl text-black">
                    {productReview}
                  </span>
                </h2>
                <div className="bg-white rounded-lg shadow-lg  mb-5 overflow-x-auto">
                  <table className="w-full table-fixed bg-slate-100">
                    <thead>
                      <tr className="bg-slate-600 text-white">
                        <th className="py-3 px-2 sm:py-4 sm:px-3 w-1/5">
                          User
                        </th>
                        <th className="py-3 px-2 sm:py-4 sm:px-3 w-1/5">
                          Rating
                        </th>
                        <th className="py-3 px-2 sm:py-4 sm:px-3 w-2/5">
                          Comment
                        </th>
                        <th className="py-3 px-2 sm:py-4 sm:px-3 w-1/5">
                          Action
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {reviews.map((review) => (
                        <tr key={review._id}>
                          <td className=" py-3 px-2 sm:py-4 sm:px-3 text-center">
                            {review.name}
                          </td>
                          <td className=" py-3 px-2 sm:py-4 sm:px-3">
                            <p className="flex-center flex-row gap-2 font-semibold">
                              {review.rating}
                              <FaStar className="text-yellow-400" />
                            </p>
                          </td>
                          <td className=" py-3 px-2 sm:py-4 sm:px-3 text-start">
                            {review.comment}
                          </td>
                          <td className=" py-3 px-2 sm:py-4 sm:px-3 text-center">
                            <span className="text-red-500 flex-center">
                              <FaTrash
                                onClick={() =>
                                  dispatch(
                                    deleteReview({
                                      productId,
                                      reviewId: review._id,
                                    })
                                  )
                                }
                              />
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </>
          ) : (
            <div className="my-12 text-2xl text-slate-600">
              No reviews to show.
            </div>
          )}
        </>
      )}
    </>
  );
};

export default Reviews;
