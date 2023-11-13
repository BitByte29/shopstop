import Metadata from "../layout/Metadata";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addReview, getProductDetails } from "../../App/features/productSlice";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Carousel } from "react-responsive-carousel";

import { FaExclamationTriangle, FaShoppingCart } from "react-icons/fa";
import ReactStars from "react-rating-stars-component";

import "./Slider.css";
import Breadcrumb from "../subs/Breadcrums";
import Reviews from "./Reviews";
import { addToCart, clearCart } from "../../App/features/cartSlice";
import Loader from "../subs/Loader";
import { toast } from "react-toastify";

const ProductPage = () => {
  const dispatch = useDispatch();
  const loading = useSelector((s) => s.products.loading);
  // const userId = useSelector((s) => s.users.user._id);
  const { id } = useParams();
  const product = useSelector((s) => s.products.product);
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);

  const [reviewBox, setReviewBox] = useState(false);
  const [review, setReview] = useState("");
  const [ratingValue, setRatingValue] = useState(0);
  useEffect(() => {
    dispatch(getProductDetails(id));
  }, [dispatch, id]);

  const handleQuantityChange = (e) => {
    setQuantity(e.target.value);
  };
  const handleBuy = () => {
    if (product.stock >= 1) {
      // dispatch(clearCartOneTime());
      dispatch(clearCart());
      dispatch(addToCart({ id, quantity: 1 }));
      navigate("/confirmorder");
    } else {
      toast.warn("Item out of stock");
    }
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
    // console.log(reviewData);
    dispatch(addReview(reviewData));
    setReviewBox(false);
  };

  const options = {
    autoPlay: true,
    interval: 2000,
    infiniteLoop: true,
    showArrows: false,
    showIndicators: false,
    dynamicHeight: false,
    // axis: "vertical",
    // showThumbs: false,
  };
  const ratingOptions = {
    edit: false,
    activeColor: "gold",
    // value: product.rating,
    size: 25,
    isHalf: true,
  };
  const customRenderThumb = (children) =>
    children.map((item) => {
      return (
        <div className="w-20 h-20 " key={item.key}>
          <img
            src={item.key}
            alt="something"
            className="object-contain w-full h-full"
          />
        </div>
      );
    });

  //Stock, num of reviews, desription, reviews
  return (
    <>
      <div className="px-0 lg:px-20 min-h-[100vh]">
        {loading ? (
          <Loader />
        ) : product ? (
          <div className="relative flex flex-col gap-4 px-4 lg:flex-row ">
            <Metadata title={product.name} />
            <div className=" lg:w-2/6 ">
              <div className="sticky top-[100px] py-0 ">
                <div>
                  <Breadcrumb productName={product.name} />
                </div>

                <Carousel
                  {...options}
                  className="px-0 py-0 "
                  renderThumbs={customRenderThumb}
                >
                  {product.images &&
                    product.images.map((image, i) => (
                      // <div
                      //   key={i}
                      //   className="flex items-center justify-center lg:w-[400px] lg:h-[375px] bg-blue-600 w-full h-full px-16 py-4 relative"
                      // >
                      //   <img
                      //     src={image.url}
                      //     alt=""
                      //     className="w-full  h-auto  rounded-xl"
                      //   />
                      // </div>
                      <div
                        key={image.url}
                        className="lg:w-[400px] lg:h-[375px]  w-full h-[275px] flex-center bg-white pt-4 pb-2 rounded-lg"
                      >
                        <img
                          src={image.url}
                          alt=""
                          className="object-contain w-full h-full"
                        />
                      </div>
                    ))}
                </Carousel>

                <div className="items-center flex justify-between ">
                  <button
                    onClick={handleAddToCart}
                    className="md:w-[45%] w-1/2 md:py-4 py-2 uppercase border-2 border-cyan-600 bg-cyan-600 text-white flex md:gap-2 gap-1 items-center hover:-translate-y-2 transition-all justify-center"
                  >
                    <FaShoppingCart /> Add to Cart
                  </button>
                  <button
                    onClick={handleBuy}
                    className="w-[45%] py-2 md:py-4 hover:text-white box-border border-2 hover:bg-cyan-600 border-cyan-600 uppercase hover:-translate-y-2 transition-all "
                  >
                    Buy now
                  </button>
                </div>
              </div>
            </div>
            <div className="flex flex-col my-4 p-4 rounded-lg gap-4 bg-white lg:w-4/6">
              <div className="ld:text-5xl md:text-3xl text-xl">
                {product.name}
              </div>
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
              <div>
                <button
                  className="px-3 py-2 border-2 border-cyan-500 hover:-translate-y-2 transition-all hover:bg-cyan-500 hover:text-white"
                  onClick={() => setReviewBox(true)}
                >
                  Add a review +
                </button>

                {/* Rating box */}
                {reviewBox && (
                  <div className="overlay fixed top-0 left-0 flex-center w-screen h-screen bg-black/70 cursor-pointer z-30">
                    <form
                      action=""
                      onSubmit={handleReviewSubmit}
                      className="flex-center z-40 p-4 bg-white rounded-lg w-11/12 max-w-md shadow-md"
                    >
                      <div className="flex flex-col w-full">
                        <p className="text-xl font-semibold mb-2">
                          Rate the product
                        </p>
                        <div className="flex items-center mb-2">
                          <ReactStars
                            {...ratingOptions}
                            edit={true}
                            size={30}
                            value={ratingValue}
                            onChange={(newRating) => {
                              setRatingValue(newRating);
                            }}
                          />
                          <span className="text-lg ml-2">
                            {ratingValue} star
                          </span>
                        </div>
                      </div>

                      <div className="w-full">
                        <p className="text-xl font-semibold">Review</p>
                        <textarea
                          name="rating"
                          className="text-sm px-2 py-2 border rounded w-full"
                          id=""
                          cols="50"
                          rows="5"
                          placeholder="Enter your review"
                          required
                          onChange={(e) => setReview(e.target.value)}
                        ></textarea>
                      </div>

                      <div className="flex justify-between space-x-4 mt-4">
                        <button
                          className="w-1/2 bg-gray-300 hover:bg-gray-400 hover:-translate-y-2  px-2 md:px-3 transform duration-300 text-gray-700 py-2 rounded"
                          onClick={() => setReviewBox(false)}
                        >
                          Cancel
                        </button>
                        <button
                          className="w-1/2 bg-green-400 hover:bg-green-500 hover:-translate-y-2 
                        px-2 md:px-3 transform duration-300 text-white py-2 rounded"
                          type="submit"
                        >
                          Submit
                        </button>
                      </div>
                    </form>
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
    </>
  );
};

export default ProductPage;
