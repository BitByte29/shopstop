import React from "react";
import { test } from "../../assets";
import {
  tv,
  mobile,
  laptop,
  accessory,
  headphones,
  gaming,
  others,
  computer,
} from "../../assets";
import { useDispatch } from "react-redux";
import { setCategory } from "../../App/features/variablesSlice";
import { useNavigate } from "react-router-dom";

const Categories = () => {
  const cats = [
    {
      name: "Mobile",
      url: mobile,
    },
    {
      name: "Laptop",
      url: laptop,
    },
    {
      name: "Computer",
      url: computer,
    },
    {
      name: "Television",
      url: tv,
    },
    {
      name: "Gaming",
      url: gaming,
    },
    {
      name: "Accessories",
      url: accessory,
    },
    {
      name: "Audio",
      url: headphones,
    },
    {
      name: "Others",
      url: others,
    },
  ];
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const cats = [
  //   "Mobile",
  //   "Laptop",
  //   "Computer",
  //   "Gaming",
  //   "Accessories",
  //   "Audio",
  //   "Tv",
  //   "Others",
  // ];

  const handleCategoryChange = (val) => {
    dispatch(setCategory(val));
    navigate("/products");
  };

  return (
    <div className="flex  min-h-[60vh] md:flex-row flex-col items-center ">
      <div className="relative flex justify-center w-full md:justify-end md:w-2/6">
        <div className=" hidden md:block absolute top-[-95px] left-0 w-[25vw] h-[320px] bg-lp"></div>
        <div className="p-4 py-4 mt-4 text-2xl text-center uppercase bg-yellow-300 md:mt-0 md:text-4xl md:-rotate-90">
          <p>Shop by</p>
          <p className="text-4xl md:text-6xl">Category</p>
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-center w-full gap-8 my-10 md:justify-start md:w-3/6">
        {cats.map((item) => {
          return (
            <button
              onClick={() => handleCategoryChange(item.name)}
              key={item.name}
              className="h-[150px] w-[150px] transform transition-all rounded-fullitems-center grid text-center text-transparent hover:text-black hover:-translate-y-4 relative group flex-center bg-white rounded-full"
            >
              <img
                src={item.url}
                className="max-h-[150px] max-w-[150px] w-auto h-auto  "
                alt={`${item.name}`}
              />
              <span className="absolute bottom-5 left-1/2 -translate-x-1/2 bg-white hidden group-hover:block px-2 py-1">
                {item.name}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default Categories;
