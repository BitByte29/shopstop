import React, { useEffect } from "react";
import SliderComponent from "./SliderComponent";
import Categories from "./Categories";
import FeaturedProducts from "./FeaturedProducts";
import Metadata from "../layout/Metadata";

// import Loader from "../subs/Loader";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts } from "../../App/features/productSlice";
import DealOfTheDay from "./DealOfTheDay";

const Home = () => {
  const products = useSelector((s) => s.products.data.products);
  const categories = useSelector((s) => s.vars.categories);
  const dispatch = useDispatch();

  useEffect(() => {
    const filters = {
      keyword: "",
      rating: 0,
      currentPage: 1,
      requestedFrom: "homepage",
    };
    dispatch(getAllProducts(filters));
  }, []);

  return (
    <>
      <Metadata title="ShopStop - Home" />
      <div className="relative w-full bg-cyan-200 ">
        <SliderComponent />
        <Categories />
        <FeaturedProducts products={products} />
        <DealOfTheDay />
        {/* <Loader /> */}
      </div>
    </>
  );
};

export default Home;
