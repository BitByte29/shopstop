import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  FaSearch,
  FaUser,
  FaShoppingCart,
  FaHamburger,
  FaWindowClose,
} from "react-icons/fa";
import Searchbox from "../subs/Searchbox";
import { useDispatch, useSelector } from "react-redux";
import { openSearchBox } from "../../App/features/variablesSlice";

//Logo , Contact, -About, Home, Products, Search, Login, Cart
//Home might have top 5 popular products //Week deals/
const Navbar = () => {
  const [mobileNav, setMobileNav] = useState(false);
  const searchBoxOn = useSelector((s) => s.vars.searchBoxOn);
  const dispatch = useDispatch();

  return (
    <>
      <nav className="fixed top-0 left-0 z-30 flex items-center justify-between w-full h-[10vh] px-8 py-4 text-2xl bg-transparent backdrop-blur-md md:text-lg">
        <Link to="/home" className="text-3xl font-bold cursor-pointer group">
          <span className="bg-lp rounded-s-lg rounded-e-2xl group-hover:bg-transparent">
            Shop
          </span>
          <span className="rounded-none rounded-s-2xl rounded-e-lg group-hover:bg-lp">
            Stop
          </span>
        </Link>

        <button onClick={() => setMobileNav(true)} className="md:hidden">
          <FaHamburger />
        </button>
        <ul className="justify-around hidden gap-8 md:flex">
          <li className="font-semibold hover:text-red-600 ">
            <Link to="/home">Home</Link>
          </li>
          <li className="font-semibold hover:text-red-600">
            <Link to="/products">Products</Link>
          </li>
          <li className="font-semibold hover:text-red-600">
            <Link to="/demo">Demo</Link>
          </li>
        </ul>
        <ul className="items-center justify-around hidden gap-4 text-2xl md:flex">
          <li>
            {searchBoxOn ? (
              <div className="w-[25px]"></div>
            ) : (
              <FaSearch onClick={() => dispatch(openSearchBox())} />
            )}
          </li>

          <li className="hover:text-red-600">
            <Link to="/products">
              <FaUser />
            </Link>
          </li>
          <li className="hover:text-red-600">
            <Link to="/products">
              <FaShoppingCart />
            </Link>
          </li>
        </ul>

        {mobileNav && (
          <div className="absolute top-0 left-0 z-20 flex w-full h-[100vh] bg-lp">
            <button
              onClick={() => setMobileNav(false)}
              className="fixed text-5xl right-[50px] top-4"
            >
              <FaWindowClose className="text-4xl" />
            </button>
            <ul className="flex flex-col items-center justify-center w-full mt-10 font-semibold gap-y-10 ">
              <li className="font-semibold hover:text-red-600 ">
                <Link to="/home" onClick={() => setMobileNav(false)}>
                  Home
                </Link>
              </li>
              <li className="font-semibold hover:text-red-600">
                <Link to="/products" onClick={() => setMobileNav(false)}>
                  Products
                </Link>
              </li>
              <li className="font-semibold hover:text-red-600">
                <Link to="/" onClick={() => setMobileNav(false)}>
                  About
                </Link>
              </li>

              <li>
                {searchBoxOn ? (
                  <></>
                ) : (
                  <FaSearch
                    onClick={() => dispatch(openSearchBox())}
                    className="text-3xl"
                  />
                )}
              </li>

              <li className="hover:text-red-600">
                <Link to="/">
                  <FaUser className="text-3xl" />
                </Link>
              </li>
              <li className="hover:text-red-600">
                <Link to="/">
                  <FaShoppingCart className="text-3xl" />
                </Link>
              </li>
            </ul>
          </div>
        )}
      </nav>
      <div className="h-[10vh] "></div>
      {searchBoxOn && <Searchbox />}
    </>
  );
};

export default Navbar;