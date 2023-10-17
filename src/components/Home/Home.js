import React, { useEffect } from "react";
import SliderComponent from "./SliderComponent";
import Categories from "./Categories";
import FeaturedProducts from "./FeaturedProducts";
import Metadata from "../layout/Metadata";
// import Loader from "../subs/Loader";
import { useDispatch } from "react-redux";
import { getAllProducts } from "../../App/features/productSlice";

const Home = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);

  return (
    <>
      <Metadata title="Welcome to ShopStop" />
      <div className="relative w-full bg-cyan-200 ">
        <SliderComponent />
        <Categories />
        <FeaturedProducts />
        {/* <Loader /> */}
      </div>
    </>
  );
};

export default Home;
