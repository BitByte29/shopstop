import React from "react";
import { test } from "../../assets";
const Categories = () => {
  const cats = [
    "Mobile",
    "Laptop",
    "Computer",
    "Gaming",
    "Accessories",
    "Others",
    "Two",
    "One",
  ];
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
              key={item}
              className="h-[150px] w-[150px] transform transition-all rounded-full border-2 border-black items-center grid text-center text-transparent hover:text-black hover:-translate-y-4"
            >
              <img src={test} className="rounded-full" alt="asd" />
              {item}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default Categories;
