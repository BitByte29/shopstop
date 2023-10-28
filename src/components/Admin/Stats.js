import React, { useEffect, useState } from "react";
import Chart from "chart.js/auto";
import { Line, Doughnut } from "react-chartjs-2";
import { getStats } from "../../App/features/adminSlice";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../subs/Loader";

const Stats = ({ setActiveSection }) => {
  const { data, loading } = useSelector((s) => s.admin);
  const { usersSize, productsSize, ordersSize, inStock, outOfStock, sales } =
    data;

  const dispatch = useDispatch();

  let totalSales = 0;
  sales &&
    sales.forEach((sale) => {
      totalSales += sale.amount;
    });

  useEffect(() => {
    dispatch(getStats());
  }, [dispatch]);

  const lineState = {
    labels: ["Initial Amount", "Final Amount"],
    datasets: [
      {
        label: "Total Amount",
        backgroundColor: "blue",
        hoverBackgroundColor: "red",
        data: [0, totalSales],
      },
    ],
  };

  const doughNutState = {
    labels: ["In-Stock", "Out-of-Stock"],
    datasets: [
      {
        label: "Stock",
        backgroundColor: ["green", "red"],
        data: [inStock, outOfStock],
      },
    ],
  };
  return loading ? (
    <Loader />
  ) : (
    data.length !== 0 && (
      <>
        <h1 className="text-center text-4xl font-semibold  text-slate-700 py-12">
          Statistics
        </h1>

        <p className="flex-center mb-6 p-4 bg-cyan-400 rounded-lg">
          Total amount: &#8377; {totalSales.toLocaleString("hi-IN")}
        </p>
        <div className="text-2xl flex justify-center gap-x-12">
          <div
            className="count bg-red-400 shadow-xl hover:scale-125 transition-all cursor-pointer"
            onClick={() => setActiveSection("Products")}
          >
            <p>Products</p>
            <span>{productsSize}</span>
          </div>
          <div
            className="count bg-yellow-300 shadow-xl hover:scale-125 transition-all cursor-pointer"
            onClick={() => setActiveSection("Orders")}
          >
            <p>Orders</p>
            <span>{ordersSize}</span>
          </div>
          <div
            className="count bg-cyan-400 shadow-xl hover:scale-125 transition-all cursor-pointer"
            onClick={() => setActiveSection("Users")}
          >
            <p>Users</p>
            <span>{usersSize}</span>
          </div>
        </div>

        <div className="flex-center my-8">
          <div className="w-full md:w-[65%] flex-center">
            <Line data={lineState} />
          </div>
        </div>

        <div className="flex-center my-8">
          <div className="w-full md:w-[30%] flex-center">
            <Doughnut data={doughNutState} />
          </div>
        </div>
      </>
    )
  );
};

export default Stats;
