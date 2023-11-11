import React from "react";
import { Link } from "react-router-dom";
import ReactStars from "react-rating-stars-component";
import { FaCartPlus } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { addToCart } from "../../App/features/cartSlice";
import { toast } from "react-toastify";

const Product = ({ product }) => {
  const dispatch = useDispatch();
  const checkLength = (name) => {
    let correctedName = name.length > 20 ? name.slice(0, 20) + "..." : name;
    return correctedName;
  };
  const salePrice = (percent, price) => {
    let discount = (percent * price) / 100;
    return price - discount;
  };
  const handleAddToCart = () => {
    if (product.stock === 0) {
      toast.warn("Item out of stock");
    } else {
      toast.success("Item added to cart.");
      dispatch(addToCart({ id: product._id, quantity: 1 }));
      // return;
    }
  };
  const options = {
    edit: false,
    // color: "red",
    activeColor: "gold",
    value: product.rating,
    size: 25,
    isHalf: true,
  };
  return (
    <div className="relative group  bg-white transition-all  rounded-lg">
      {/* hover:border-slate-200 hover:-translate-y-2 hover:shadow-lg */}
      <div
        className="z-50 absolute -top-4 -left-4 p-4 rounded-full bg-cyan-300  cursor-crosshair hover:scale-125 transition-all active:bg-yellow-300 backdrop-blur-70 hidden group-hover:block text-2xl "
        onClick={handleAddToCart}
      >
        <FaCartPlus />
      </div>
      <Link
        className=" flex flex-col items-center justify-center md:p-4 w-full h-full border-2 rounded-lg  group-hover:shadow-lg"
        to={`/products/${product._id}`}
      >
        {product.onSale && (
          <span className="absolute top-0 right-0 px-4 py-1 w-[100px] text-right clip-path-polygon bg-red-400  uppercase ">
            Sale
          </span>
        )}

        <div className="max-w-full sm:w-[200px] p-4 sm:h-[250px] flex-center md:py-2 group-hover:scale-110 transition-all  ">
          <img
            src={product.images[0].url}
            alt=""
            className="max-w-full max-h-full rounded-lg"
          />
        </div>
        <div
          className="flex items-center justify-center gap-2"
          key={product._id}
        >
          <ReactStars {...options} />

          <span className="text-sm">
            {` (${product.numOfReviews} reviews)`}{" "}
          </span>
        </div>
        <p className="text-center ">{checkLength(product.name)}</p>
        <div
          className={`flex flex-col items-center text-dp ${
            product.onSale ? "" : "pb-4"
          }`}
        >
          <p className="text-xl">
            &#8377;
            {product.onSale
              ? salePrice(product.discount, product.price).toLocaleString(
                  "hi-IN"
                )
              : product.price.toLocaleString("hi-IN")}
          </p>
          {product.onSale && (
            <div className="flex gap-2 text-sm">
              <span className="text-red-500 line-through">
                {" "}
                &#8377;
                {product.price.toLocaleString("hi-IN")}
              </span>
              <span className="text-green-600">{product.discount}% off.</span>
            </div>
          )}
        </div>
      </Link>
    </div>
  );
};

export default Product;
