import React from "react";
import Product from "../Products/Product";

const FeaturedProducts = ({ products }) => {
  return (
    <div className="w-full md:px-[150px] bg-white pb-16">
      <h2 className="py-10 text-3xl text-center">
        <span className="px-3 py-4 font-semibold bg-yellow-300">
          Featured Products
        </span>
      </h2>
      <div className="flex flex-wrap items-center justify-center gap-6 ">
        {products &&
          products.map((val) => {
            return <Product product={val} key={val._id} />;
          })}
      </div>
    </div>
  );
};

export default FeaturedProducts;
