import React from "react";
import Chart from "chart.js/auto";
import { Line, Doughnut } from "react-chartjs-2";

const Stats = () => {
  const lineState = {
    labels: ["Initial Amount", "Final Amount"],
    datasets: [
      {
        label: "Total Amount",
        backgroundColor: "blue",
        hoverBackgroundColor: "red",
        data: [0, 4000],
      },
    ],
  };

  const doughNutState = {
    labels: ["In-Stock", "Out-of-Stock"],
    datasets: [
      {
        label: "Stock",
        backgroundColor: ["green", "red"],
        data: [12, 2],
      },
    ],
  };
  return (
    <>
      <h1 className="text-center text-4xl font-semibold  text-slate-700 py-12">
        Statistics
      </h1>

      <p className="flex-center mb-6 p-4 bg-cyan-500">
        Total amount: &#8377; {(4234234).toLocaleString("hi-IN")}
      </p>
      <div className="text-2xl flex justify-around ">
        <div className="count bg-cyan-300">
          <p>Products</p>
          <span>30</span>
        </div>
        <div className="count bg-cyan-500">
          <p>Orders</p>
          <span>30</span>
        </div>
        <div className="count bg-cyan-600">
          <p>Users</p>
          <span>30</span>
        </div>
      </div>

      <div className="flex-center my-8">
        <div className="w-full md:w-[60%] flex-center">
          <Line data={lineState} />
        </div>
      </div>

      <div className="flex-center my-8">
        <div className="w-full md:w-[60%] flex-center">
          <Doughnut data={doughNutState} />
        </div>
      </div>
    </>
  );
};

export default Stats;
