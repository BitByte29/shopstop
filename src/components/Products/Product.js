import React from "react";
import { Link } from "react-router-dom";
import ReactStars from "react-rating-stars-component";

const Product = ({ product }) => {
  const checkLength = (name) => {
    let correctedName = name.length > 23 ? name.slice(0, 23) + "..." : name;
    return correctedName;
  };

  const salePrice = (percent, price) => {
    let discount = (percent * price) / 100;
    return price - discount;
  };

  const options = {
    edit: false,
    // color: "red",
    activeColor: "tomato",
    value: product.rating,
    size: 25,
    isHalf: true,
  };
  return (
    <Link
      className="relative flex flex-col items-center justify-center p-4 sm:w-[275px] w-[80%] border-transparent transition-all border-2 rounded-lg hover:border-slate-200 hover:-translate-y-2 hover:shadow-lg"
      to={`/products/${product._id}`}
    >
      {product.onSale && (
        <span className="absolute top-0 right-0 px-4 py-1 w-[100px] text-right clip-path-polygon bg-red-400  uppercase ">
          Sale
        </span>
      )}
      <img
        src={product.img}
        alt=""
        className="md:w-[200px] sm:w-full h-[250px] "
      />
      <div className="flex items-center justify-center gap-2" key={product._id}>
        <ReactStars {...options} />

        <span className="text-sm">{` (${product.numOfReviews} reviews)`} </span>
      </div>
      <p className="text-center ">{checkLength(product.name)}</p>
      <div
        className={`flex flex-col items-center text-dp ${
          product.onSale ? "" : "pb-4"
        }`}
      >
        <p className="text-xl">
          {product.onSale
            ? salePrice(product.discount, product.price)
            : product.price}
          $
        </p>
        {product.onSale && (
          <div className="flex gap-2 text-sm">
            <span className="text-red-500 line-through"> {product.price}$</span>
            <span className="text-green-600">{product.discount}% off.</span>
          </div>
        )}
      </div>
    </Link>
  );
};

export default Product;
