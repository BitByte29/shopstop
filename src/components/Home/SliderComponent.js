import React from "react";
import Slider from "react-slick";
import { Link } from "react-router-dom";

const SliderComponent = () => {
  const settings = {
    infinite: true,
    autoplay: true,
    speed: 1500,
    slidesToShow: 1,
    slidesToScroll: 1,
    fade: true,
    pauseOnHover: false,
  };

  return (
    <Slider {...settings} className="w-full">
      <div className="relative ">
        <div className="absolute flex flex-col items-start justify-center top-[50%] left-[50%] md:left-[60%] lg:left-[70%]  translate-y-[-50%]  md:gap-2 ">
          <h2 className="text-xl font-bold md:text-3xl lg:text-6xl text-cyan-200">
            Nice Sound
          </h2>
          <h2 className="text-xl font-bold md:text-3xl lg:text-6xl ">
            Headphones
          </h2>
          <p className="border border-y-2 border-black w-[25%]"></p>
          <p className="font-bold">Hot Deal</p>
          <p className="hidden text-black md:block">
            Unique design and best material
          </p>

          <Link
            to="/products/"
            className="px-4 py-2 tracking-widest uppercase cursor-pointer md:p-8 md:py-4 bg-cyan-200 "
          >
            Buy Now
          </Link>
        </div>
        <img className="w-full" src="/assets/cone.png" alt="Headphones" />
      </div>

      <div className="relative">
        <div className="absolute flex flex-col items-start text-white justify-center  top-[50%] left-[50%] md:left-[60%] lg:left-[70%]  translate-y-[-50%]  md:gap-2 ">
          <h2 className="text-xl font-bold md:text-3xl lg:text-6xl text-red2">
            Latest Tablets
          </h2>
          <h2 className="text-xl font-bold md:text-3xl lg:text-6xl ">
            Best Prices
          </h2>
          <p className="border border-y-2 border-white w-[25%]"></p>
          <p className="font-bold">New Arrivals 2023</p>
          <p className="hidden  text-white md:block ">
            Modern design that stands out.
          </p>

          <Link
            to="/products/"
            className="px-4 py-2 tracking-widest uppercase cursor-pointer md:p-8 md:py-4 bg-red2 "
          >
            Buy Now
          </Link>
        </div>
        <img className="w-full" src="/assets/ctwo.png" alt="tablet" />
      </div>

      <div className="relative">
        <div className="absolute flex flex-col items-start justify-center top-[50%] left-[50%] md:left-[60%] lg:left-[70%]   translate-y-[-50%]  md:gap-2 ">
          <h2 className="text-xl font-bold text-indigo-700 md:text-3xl lg:text-6xl">
            Flagship
          </h2>
          <h2 className="text-xl font-bold md:text-3xl lg:text-6xl ">
            Smartphones!
          </h2>
          <p className="border border-y-2 border-black w-[25%]"></p>
          <p className="font-bold">Big Sale!</p>
          <p className="hidden text-black md:block">
            Save <span className="bg-indigo-500">upto 20% </span>on all
            smartphones.
          </p>

          <Link
            to="/products/"
            className="px-4 py-2 tracking-widest text-white uppercase bg-indigo-700 cursor-pointer md:p-8 md:py-4"
          >
            Buy Now
          </Link>
        </div>
        <img className="w-full" src="/assets/cthree.png" alt="mobile" />
      </div>
    </Slider>
  );
};

export default SliderComponent;
