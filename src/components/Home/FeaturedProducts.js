import React from "react";
import Product from "../Products/Product";
import { demo, cone, ctwo } from "../../assets";

const FeaturedProducts = ({ products }) => {
  return (
    <div className="w-full py-2 md:px-[150px] bg-white">
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
