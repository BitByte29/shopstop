import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addReview, getProductDetails } from "../../App/features/productSlice";
import { Link, useParams } from "react-router-dom";
import { Carousel } from "react-responsive-carousel";
import { demo } from "../../assets/index";

import { FaExclamationTriangle, FaPlus, FaShoppingCart } from "react-icons/fa";
import ReactStars from "react-rating-stars-component";

import "./Slider.css";
import Breadcrumb from "../subs/Breadcrums";
import Reviews from "./Reviews";
import { addToCart } from "../../App/features/cartSlice";
import Loader from "../subs/Loader";
import { toast } from "react-toastify";

const ProductPage = () => {
  const dispatch = useDispatch();
  const loading = useSelector((s) => s.products.loading);
  // const userId = useSelector((s) => s.users.user._id);
  const { id } = useParams();
  const product = useSelector((s) => s.products.product);
  const [quantity, setQuantity] = useState(1);

  const [reviewBox, setReviewBox] = useState(false);
  // const userReview = product.reviews.find((review) => {
  //   return review.user.toString() === userId.toString();
  // });
  // const [review, setReview] = useState(userReview.comment);
  // const [ratingValue, setRatingValue] = useState(userReview.rating);
  const [review, setReview] = useState("");
  const [ratingValue, setRatingValue] = useState(0);
  useEffect(() => {
    dispatch(getProductDetails(id));
  }, [dispatch, id]);

  const handleQuantityChange = (e) => {
    setQuantity(e.target.value);
  };

  const handleAddToCart = () => {
    if (product.stock >= quantity) {
      toast.success("Item added to cart.");
      dispatch(addToCart({ id, quantity }));
    } else {
      toast.warn("Item out of stock");
      // return;
    }
  };
  const salePrice = (price, percent) => {
    let discount = (percent * price) / 100;
    return price - discount;
  };
  const handleReviewSubmit = (e) => {
    e.preventDefault();
    const reviewData = {
      rating: ratingValue,
      comment: review,
      productId: id,
    };
    // product.reviews.push(reviewData);
    console.log(reviewData);
    dispatch(addReview(reviewData));
    setReviewBox(false);
  };

  const options = {
    autoPlay: true,
    interval: 2000,
    infiniteLoop: true,
    showArrows: false,
  };
  const ratingOptions = {
    edit: false,
    activeColor: "tomato",
    // value: product.rating,
    size: 25,
    isHalf: true,
  };

  //Stock, num of reviews, desription, reviews
  return (
    <div className="px-0 lg:px-20 min-h-[100vh]">
      {loading ? (
        <Loader />
      ) : product ? (
        <div className="relative flex flex-col gap-4 px-4 lg:flex-row ">
          <div className="bg-white lg:w-2/6 ">
            <div className="sticky top-[100px] py-0 ">
              <div>
                <Breadcrumb productName={product.name} />
              </div>
              <Carousel {...options} className="px-0 py-0 ">
                {product.images &&
                  product.images.map((image, i) => (
                    <div
                      key={i}
                      className="flex items-center justify-center lg:w-[400px] lg:h-[375px] w-full h-full px-16 py-4"
                    >
                      <img
                        src={image.url}
                        alt=""
                        className="max-w-[100%] max-h-[100%] rounded-xl"
                      />
                    </div>
                  ))}
              </Carousel>
              <div className="flex items-center justify-between ">
                <button
                  onClick={handleAddToCart}
                  className="w-[45%] py-4 uppercase bg-cyan-600 flex gap-2 items-center hover:-translate-y-2 transition-all justify-center"
                >
                  <FaShoppingCart /> Add to Cart
                </button>
                <button className="w-[45%] py-4 bg-green-600 uppercase hover:-translate-y-2 transition-all ">
                  Buy now
                </button>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-4 bg-white lg:w-4/6">
            <div className="text-5xl">{product.name}</div>
            <div className="flex items-center gap-2" key={product._id}>
              <ReactStars
                {...ratingOptions}
                value={product.rating}
                productId={product._id}
              />

              <span>{product.rating} </span>

              <span>({product.numOfReviews} reviews)</span>
            </div>
            {product.onSale ? (
              <div className="flex items-end gap-3">
                <span className="text-3xl font-semibold">
                  &#8377;
                  {salePrice(product.price, product.discount).toLocaleString(
                    "hi-IN"
                  )}
                </span>
                <span className="text-lg line-through text-slate-600">
                  &#8377;{product.price.toLocaleString("hi-IN")}
                </span>
                <span className="text-xl">
                  (<span className="text-red-600">-{product.discount}%</span>)
                </span>
              </div>
            ) : (
              <span className="text-3xl font-semibold">
                &#8377;{product.price.toLocaleString("hi-IN")}
              </span>
            )}
            <p className="text-xl font-semibold">
              Currently:
              {product.stock > 0 ? (
                <span className="text-green-500">&nbsp;In stock</span>
              ) : (
                <span className="text-red-500">&nbsp;Out of stock</span>
              )}
            </p>
            <div className="">
              <p className="text-xl font-semibold">Description</p>
              <p>{product.description}</p>
            </div>
            <div className="text-xl font-semibold">
              Quantity:{" "}
              <select
                name="quantity"
                id="quantity"
                value={quantity}
                onChange={handleQuantityChange}
              >
                {Array.from(
                  {
                    length: product.stock
                      ? product.stock > 10
                        ? 10
                        : product.stock
                      : 1,
                  },
                  (_, i) => (
                    <option key={i + 1} value={i + 1}>
                      {i + 1}
                    </option>
                  )
                )}
              </select>
            </div>
            <div className="text-xl font-semibold ">
              <button
                className="flex items-center justify-center gap-2 px-4 py-2 text-lg text-white transition-all bg-cyan-600 hover:-translate-y-1 hover:shadow-lg"
                onClick={() => setReviewBox(true)}
              >
                Add a review <FaPlus />
              </button>

              {/* Rating box */}
              {reviewBox && (
                <div>
                  <div className="overlay fixed top-0 left-0 flex-center w-screen h-screen  bg-black/70 cursor-pointer z-30">
                    <form
                      action=""
                      onSubmit={handleReviewSubmit}
                      className="flex-center z-40 p-4 bg-white rounded-lg min-h-[300px]"
                    >
                      <div className="flex w-full flex-col ">
                        <p>Rate the product</p>
                        <div className="flex gap-4 py-2">
                          <ReactStars
                            {...ratingOptions}
                            edit={true}
                            size={30}
                            value={ratingValue}
                            onChange={(newRating) => {
                              setRatingValue(newRating);
                            }}
                          />
                          <span>{ratingValue} star.</span>
                        </div>
                      </div>

                      <div className="w-full">
                        <p>Review</p>
                        <textarea
                          name="rating"
                          className="text-sm px-2 py-2 focus:outline-gray-500"
                          id=""
                          cols="50"
                          rows="5"
                          placeholder="Enter your review"
                          required
                          onChange={(e) => setReview(e.target.value)}
                        ></textarea>
                      </div>

                      <div className="flex gap-2">
                        <button
                          className="w-1/2 border-2 hover:bg-red-500 hover:-translate-y-[4px]"
                          onClick={() => setReviewBox(false)}
                        >
                          Cancel
                        </button>
                        <button
                          className="bg-green-400 hover:bg-green-500 hover:-translate-y-[4px]"
                          type="submit"
                        >
                          Submit
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              )}
            </div>
            <div className="text-2xl font-semibold">Reviews</div>
            {/* <ReviewList productId={id} /> */}
            {product.reviews.length > 0 ? (
              <div className="flex flex-col gap-5">
                {product.reviews.map((review) => {
                  return (
                    <Reviews
                      key={review._id}
                      review={review}
                      productId={product._id}
                    />
                  );
                })}
              </div>
            ) : (
              <p>No reviews yet.</p>
            )}
            <div className="h-[100vh]">hu</div>
            <div className="h-[100vh]">hu</div>
            <div className="h-[100vh]">hu</div>
          </div>
        </div>
      ) : (
        <div className="flex justify-center items-center flex-col h-[90vh] gap-4 ">
          <div className="flex items-center justify-center gap-2 text-red-600">
            {" "}
            <FaExclamationTriangle className="inline-block " />
            <p>Product Not found</p>
          </div>
          <Link
            to="/products"
            className="px-8 py-4 text-white transition-all rounded-lg bg-cyan-700 hover:-translate-y-1 hover:shadow-lg"
          >
            Go Back
          </Link>
        </div>
      )}
    </div>
  );
};

export default ProductPage;
