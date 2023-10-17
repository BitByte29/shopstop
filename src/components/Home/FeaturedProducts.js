import React from "react";
import Product from "../Products/Product";
import { demo, cone, ctwo } from "../../assets";

const FeaturedProducts = () => {
  const products = [
    {
      name: "Samsung SmartPhone",
      price: 105,
      img: cone,
      _id: "sdaf1sdf13121dfas",
      onSale: true,
      discount: 20,
    },
    {
      name: "Xiomi SmartPhone",
      price: 201,
      _id: "sdaf1sdf13121dfas",
      img: demo,
    },
    {
      name: "Realme SmartPhone",
      price: 201,
      _id: "sdaf1sdf13121dfas",
      img: demo,
    },
    {
      name: "Oppo SmartPhone",
      price: 201,
      _id: "sdaf1sdf13121dfas",
      img: ctwo,
    },
    {
      name: "HP SmartPhone",
      price: 201,
      _id: "sdaf1sdf13121dfas",
      img: demo,
    },
    {
      name: "Dell SmartPhone",
      price: 201,
      _id: "sdaf1sdf13121dfas",
      img: demo,
    },
    {
      name: "Lenovo SmartPhonefasdfasadfasdfasdfasdffd",
      price: 201,
      _id: "sdaf1sdf13121dfas",
      img: demo,
    },
    {
      name: "Apple SmartPhone",
      price: 200,
      _id: "sdaf1sdf13121dfas",
      img: demo,
      onSale: true,
      discount: 10,
    },
  ];
  return (
    <div className="w-full py-2 md:px-[150px] bg-white">
      <h2 className="py-10 text-3xl text-center">
        <span className="px-3 py-4 font-semibold bg-yellow-300">
          Featured Products
        </span>
      </h2>
      <div className="flex flex-wrap items-center justify-center gap-6 ">
        {products.map((val) => {
          return <Product product={val} key={val.name} />;
        })}
      </div>
    </div>
  );
};

export default FeaturedProducts;
