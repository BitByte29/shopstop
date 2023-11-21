import React from "react";
import Product from "../Products/Product";

const FeaturedProducts = ({ products }) => {
  return (
    <div className="w-full md:px-[150px] px-4 bg-lp pb-16">
      <h2 className="py-10 text-3xl flex items-center justify-center h-auto">
        {/* <span className="md:px-3 md:py-4 px-2 md:font-semibold bg-yellow-300 h-full">
          Featured Products
        </span> */}
        <span className="flex-center max-w-full md:px-3 font-semibold md:py-4 px-2 sm:flex-row sm:gap-2 bg-yellow-300 h-full ">
          <span className="pt-2 sm:pt-0">Featured</span>
          <span className="pb-2 sm:pb-0">Products</span>
          {/* Featured Products */}
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
