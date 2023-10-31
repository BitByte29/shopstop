import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function DealOfTheDay() {
  const [t, sett] = useState({
    h: "",
    m: "",
    s: "",
  });

  useEffect(() => {
    sett({
      h: "12",
      m: "00",
      s: "00",
    });
    const interval = setInterval(() => {
      calculateCountdown();
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  function calculateCountdown() {
    const now = new Date();
    const startTime = new Date(now);
    startTime.setHours(0, 0, 0, 0);

    const targetDate = new Date(startTime);
    targetDate.setDate(targetDate.getDate() + 1);

    const timeRemaining = targetDate - now;

    if (timeRemaining <= 0) {
      return "Deal Expired";
    }

    const hours = Math.floor((timeRemaining / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((timeRemaining / (1000 * 60)) % 60);
    const seconds = Math.floor((timeRemaining / 1000) % 60);

    sett({
      h: hours.toString().padStart(2, "0"),
      m: minutes.toString().padStart(2, "0"),
      s: seconds.toString().padStart(2, "0"),
    });

    return `set`;
  }

  return (
    <>
      <h2 className="py-10 text-3xl text-center">
        <span className="px-3 py-5 font-semibold bg-yellow-300">
          Deal of the Day
        </span>
      </h2>
      <div className=" flex flex-col items-center lg:px-[5vw] px-4 py-12 bg-cyan-200 lg:flex-row gap-2 sm:h-[70vh] h-[100vh]">
        <div className="lg:w-1/2 w-[80%] flex-center  md:h-full ">
          <div className="relative w-[100%] bg-transparent border-2 rounded-2xl lg:h-[100%] md:h-[50%]  border-slate-500  ">
            <img
              src="/assets/sale2.webp"
              alt="product"
              className="md:absolute md:-top-[100px]
                 md:left-1/2 md:-translate-x-1/2"
            />
            <img
              src="/assets/offer.webp"
              className="absolute -top-[30%] sm:-top-[100px] sm:-left-[100px] -left-[20%] h-[100px] w-[100px] md:h-[200px] sm:w-[200px]"
              alt=""
            />
          </div>
        </div>
        <div className="h-full lg:w-1/2 w-full md:w-2/5">
          <div className="flex-center border-2 bg-slate-100 rounded-3xl w-full h-full">
            <div className="sm:block flex-center">
              <p className="text-5xl font-semibold pb-6 text-yellow-600">
                HP 360
              </p>

              <div className="text-3xl">
                <span className="text-yellow-600">
                  &#8377;{(21700).toLocaleString("hi-IN")}
                </span>
              </div>

              <div className="flex gap-2 text-lg sm:text-xl">
                <span>
                  <span>M.R.P: </span>
                  &#8377;
                  <span className="text-red-500 line-through">
                    {(31000).toLocaleString("hi-IN")}
                  </span>
                </span>
                <span className="text-green-600">30% off</span>
              </div>

              <div className="countdown p-4">
                <div className="flex md:gap-4 gap-2 items-center ">
                  <p className="relative md:w-[70px] md:h-[70px] w-[40px] h-[40px] text-2xl rounded-full md:text-4xl flex-center bg-yellow-300 text-black font-semibold border-2 border-black ">
                    {t.h}
                  </p>
                  <span className="text-black font-semibold text-sm md:text-lg">
                    <span className="hidden lg:block text-sm">Hours</span>
                    <span className="lg:hidden block">:</span>
                  </span>
                  <p className="md:w-[70px] md:h-[70px] w-[40px] h-[40px] text-2xl rounded-full md:text-4xl flex-center bg-yellow-300 text-black font-semibold border-2 border-black ">
                    {t.m}
                  </p>
                  <span className="text-black font-semibold text-sm md:text-lg">
                    <span className="hidden lg:block text-sm">Minutes</span>
                    <span className="lg:hidden block">:</span>
                  </span>
                  <p className="md:w-[70px] md:h-[70px] w-[40px] h-[40px] text-2xl rounded-full md:text-4xl flex-center bg-yellow-300 text-black font-semibold animate-bounce border-2 border-black ">
                    {t.s}
                  </p>
                  <span className="text-black font-semibold text-sm md:text-lg">
                    <span className="hidden lg:block text-sm">Seconds</span>
                  </span>
                </div>
              </div>
            </div>
            <Link
              to="/products/6540967541bc61323fd1fa4f"
              className="mt-4 px-5 py-3 uppercase tracking-wider bg-cyan-300 font-semibold hover:bg-yellow-300 transition-all hover:-translate-y-2 rounded-lg cursor-pointer"
            >
              Buy Now
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default DealOfTheDay;
